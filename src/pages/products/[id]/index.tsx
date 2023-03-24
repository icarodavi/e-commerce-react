import {  Tab } from '@headlessui/react'
import {  HeartIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { MainLayout } from '../../../layouts/MainLayout'
import { useParams } from 'react-router-dom'
import { useProductsById } from '../../../hooks/useProducts'
import { priceFormatter } from '../../../utils/format'
import { classNames } from '../../../utils/string'
import { itemCart } from '../../../reducers/shop/reducer'
import { useContextSelector } from 'use-context-selector'
import { ShopContext } from '../../../context/ShopContext'
import { toast } from 'react-toastify'

const imageProducts = (images: any[]) => {
    return images.map((image: any,index: number) => {
        return {
            src: image,
            id: index,
        }
    })
}

const itemToCart = (data: any) => {
    const newItemToCart: itemCart = {
        id: data.id,
        quantity: 1,
        name: data.title,
        imageSrc: data.thumbnail,
        inStock: true,
        href: `/product/${data.id}`,
        price: data.price
    }
    return newItemToCart;
}

export function ProductById() {
  const { id } = useParams();
  const { data  } = useProductsById(String(id));
  const { contextAddItemToCart } = useContextSelector(ShopContext, context => context);
  return (

    <MainLayout>
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8 mb-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {data && imageProducts(data.images).map((image) => (
                    <Tab
                      key={image.id}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only"> {image.src} </span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img src={image.src} alt="" className="h-full w-full object-cover object-center" />
                          </span>
                          <span
                            className={classNames(
                              selected ? 'ring-indigo-500' : 'ring-transparent',
                              'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                {data && imageProducts(data.images).map((image) => (
                  <Tab.Panel key={image.id}>
                    <img
                      src={image.src}
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{data && data.title}</h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">{data && priceFormatter.format(data.price)}</p>
              </div>

              {/* Reviews */}
              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {data && [0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          data.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{data && data.rating} out of 5 stars</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={data && { __html: data.description }}
                />
              </div>

              <form className="mt-6">

                <div className="mt-10 flex">
                  <button
                    type="submit"
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                    onClick={(event: any) => {
                        event.preventDefault();
                        contextAddItemToCart(itemToCart(data));
                        toast.success(`${data.title} was added to the cart`);

                    }}
                  >
                    Add to cart
                  </button>

                  <button
                    type="button"
                    className="ml-4 flex items-center justify-center rounded-md py-3 px-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
              </form>

           
            </div>
          </div> 

          
        </div>
      </main>

      
    </MainLayout>
  )
}
