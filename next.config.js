// /** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['links.papareact.com', 'fakestoreapi.com'],
  },
  env: {
    google_id: process.env.GOOGLE_ID,
    google_secret: process.env.GOOGLE_SECRET,
    stipe_public_key: process.env.STRIPE_PUBLIC_KEY,
    stipe_secret_key: process.env.STRIPE_SECRET_KEY,
  },
}
