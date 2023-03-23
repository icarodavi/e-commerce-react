import { useState } from 'react'
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon as XMarkIconMini } from '@heroicons/react/20/solid'
import { MainLayout } from '../../layouts/MainLayout'
import { UIButton } from '../../components/UIButton'
import { HiOutlineTrash } from "react-icons/hi";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";
import { useContextSelector } from 'use-context-selector';
import { ShopContext } from '../../context/ShopContext';
import { priceFormatter } from '../../utils/format';
import { itemCart } from '../../reducers/shop/reducer';

const sumItem = (data: itemCart[]) => {
    const sum =  data.reduce((previousValues, currentValue) => {
        return previousValues + (Number(currentValue.price) * Number(currentValue.quantity))
    }, 0);
    return sum;
}

export function Cart() {
  const { 
    contextClearCart, 
    cart,
    contextDecreaseItemToCart,
    contextIncreaseItemToCart,
    contextRemoveItemToCart
} = useContextSelector(ShopContext, context => context);

  return (
    <MainLayout>

      <main className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
        
        <UIButton 
        className='flex flex-row justify-center items-center gap-1'
        onClick={contextClearCart}
        ><HiOutlineTrash />Clear Cart</UIButton>
        </div>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {cart && cart.map((product, productIdx) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={product.imageSrc}
                      alt={product.name}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                              {product.name}
                            </a>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">{`${product.quantity} x ${priceFormatter.format(product.price)}`}</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">Total: {` ${priceFormatter.format(Number(product.price * product.quantity))}`}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                          Quantity, {product.name}
                        </label>
                        <div className='flex flex-row justify-center items-center gap-1'>
                        <button
                        onClick={(e) => { e.preventDefault(); contextDecreaseItemToCart(product.id)}}
                        className="p-2 border-0 hover:text-indigo-600"
                        ><IoIosRemoveCircleOutline className="h-6 w-6" /></button>
                        <input
                          id={`quantity-${productIdx}`}
                          type="text"
                          disabled
                          value={product.quantity}
                          name={`quantity-${productIdx}`}
                          className="w-11 rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        />
                        <button 
                        onClick={(e) => { e.preventDefault(); contextIncreaseItemToCart(product.id)}}
                        className="p-2 border-0 hover:text-indigo-600"
                        ><IoIosAddCircleOutline className='h-6 w-6'/></button>
                        </div>     
                        <div className="absolute top-2 right-0">
                          <button 
                          type="button" 
                          onClick={(e) => { e.preventDefault(); contextRemoveItemToCart(product.id)}}
                          className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Remove</span>
                            <IoIosCloseCircleOutline className="h-6 w-6" aria-hidden="true" />
                          </button>
                        
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product.inStock ? (
                        <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      ) : (
                        <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                      )}

                      <span>{product.inStock ? 'In stock' : `Ships in 03 days`}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">{cart.length > 0 ? priceFormatter.format(Number(sumItem(cart))) : '$0.00'}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                  <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Learn more about how shipping is calculated</span>
                    <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">{cart.length > 0 ? '$5.00': '$0.00'}</dd>
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">{cart.length > 0 ? priceFormatter.format(Number(sumItem(cart) + 5)) : '$0.00'}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout
              </button>
            </div>
          </section>
        </form>

        
      </main>


      </MainLayout>

  )
}
