import Image from 'next/image'
import { useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { Carousel } from 'react-responsive-carousel'
import Currency from 'react-currency-formatter'
import Link from 'next/link'
import Fade from 'react-reveal/Fade'
import { EyeIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { addToBasket } from '../../../slices/basketSlice'
import { PRIME_IMAGE_URL } from '../../../constants/commonConstants'

const MAX_RATING = 5
const MIN_RATING = 1

function U2uCard({
  id,
  title,
  price,
  description,
  category,
  image,
  address,
  images,
}) {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  )
  console.log(id)

  const dispatch = useDispatch()

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      images,
    }
    //sends product as an action to the REDUX store
    dispatch(addToBasket({ ...product }))
  }

  const notify = () => {
    const product = {
      id,
      title,
    }
    toast.success(
      <div>
        <p className="font-semibold">Product Added Successfully !!</p>
        <p className="text-xs text-gray-400 line-clamp-1"> {product.title}</p>
      </div>,
      {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      }
    )
  }

  return (
    <Fade bottom>
      <div className="relative z-40 mx-5 my-3 flex h-[96%] flex-col rounded-2xl border-none bg-white p-10 shadow-sm transition-all duration-150 ease-out hover:scale-105 hover:ease-in">
        {/* Category */}
        <p className="absolute top-2 right-3 flex space-x-2 text-base capitalize italic text-gray-400">
          {/* {category.map((item) => {
            return <div className="">{item}</div>
          })} */}
          {category}
        </p>
        <div className="relative my-2 rounded-lg text-center transition-all duration-150 ease-out hover:scale-105 hover:opacity-100 hover:ease-in">
          <div className="z-20 h-full w-full bg-gradient-to-t from-gray-100 to-transparent">
            <Carousel
              showArrows={true}
              showStatus={false}
              autoPlay
              infiniteLoop
              stopOnHover={false}
              emulateTouch={false}
              autoFocus={false}
              showIndicators={false}
              showThumbs={false}
              interval={4000}
            >
              {images.map((item, index) => (
                <div className="">
                  <img
                    key={index}
                    src={item}
                    loading="lazy"
                    alt={`title ${index}`}
                    className="aspect-square"
                  />
                </div>
              ))}
            </Carousel>
          </div>

          {/* <div
            // onClick={() => setShowQuick(true)}
            className="absolute top-0 left-0 z-10 flex h-full  w-full cursor-pointer items-center justify-center rounded-lg bg-gray-500 opacity-0 transition-all duration-150 ease-out hover:scale-105 hover:bg-opacity-50 hover:opacity-100 hover:ease-in"
          >
            <div className="button flex w-fit rounded-lg py-2 px-3 ">
              <span className="mr-1 pt-0.5 text-sm font-medium">
                Quick View
              </span>
              <EyeIcon className="h-6" />
            </div>
        </div> */}
        </div>
        {/* Title */}
        <Link href={`/product/${id}`}>
          <h4 title={title} className="my-3 font-semibold">
            {title}
          </h4>
        </Link>

        {/* description */}
        <div>
          <div className="text-left">
            <p className="my-2 text-xs text-gray-500  line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        {/* address */}
        <div>
          <div className="text-left">
            <p className="my-2 text-xs text-gray-500  line-clamp-2">
              <strong className="text-black">Address :</strong> {address}
            </p>
          </div>
        </div>

        <div className="mb-5 font-medium">
          <Currency quantity={price} currency="INR" />
        </div>

        {/* Prime  */}
        {true && (
          <div className="mt-5 flex items-center space-x-2">
            <img src={PRIME_IMAGE_URL} alt="#" className="w-12" />
            <p className="text-sm text-gray-400">FREE Next-day</p>
          </div>
        )}

        <button
          className="button mt-auto "
          onClick={() => {
            addItemToBasket()
            notify()
          }}
        >
          Add To Basket
        </button>
      </div>
    </Fade>
  )
}

export default U2uCard
