import { buffer } from 'micro'
// import { doc, setDoc, serverTimestamp, getFirestore } from 'firebase/firestore'
import * as admin from 'firebase-admin'

// secure a connection to firebase from the backend
const serviceAccount = require('../../../permissions.json')
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app()

// establish a connection to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_SIGNING_SECRET

// const db = getFirestore(app)

const fulfillOrder = async (session) => {
  return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)
    .set({
      id: session.id,
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS Order ${session.id} had been added to the DB`)
    })
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req)
    const payload = requestBuffer.toString()
    const sig = req.headers['stripe-signature']
    let event
    // verifying if event came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
    } catch (err) {
      console.log('Error', err.message)
      return res.status(400).send(`Webhook error: ${err.message}`)
    }

    // handle checkout session completed event
    if (event.type === 'checkout.session.completed') {
      console.log('Session completed success')
      const session = event.data.object

      // fulfilling the order
      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => {
          // console.log(err.message)
          return res.status(400).send(`Webhook Error: ${err.message}`)
        })
    }
  }
}

// export default final

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}
