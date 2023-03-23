import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, ReactNode, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { LayoutContext } from "../../context/LayoutContext";
import { classNames } from "../../utils/string";
import { MainFooter } from "./components/MainFooter";
import { MainHeader } from "./components/MainHeader";
import { MobileMenu } from "./components/MobileMenu";

// const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']

const filters = [
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'tees', label: 'Tees', checked: false, },
            { value: 'crewnecks', label: 'Crewnecks', checked: false, },
            { value: 'hats', label: 'Hats', checked: false, },
            { value: 'bundles', label: 'Bundles', checked: false, },
            { value: 'carry', label: 'Carry', checked: false, },
            { value: 'objects', label: 'Objects', checked: false, },
        ],
    },
    {
        id: 'brand',
        name: 'Brand',
        options: [
            { value: 'clothing-company', label: 'Clothing Company', checked: false, },
            { value: 'fashion-inc', label: 'Fashion Inc.', checked: false, },
            { value: 'shoes-n-more', label: "Shoes 'n More", checked: false, },
            { value: 'supplies-n-stuff', label: "Supplies 'n Stuff", checked: false, },
        ],
    },
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White', checked: false, },
            { value: 'black', label: 'Black', checked: false, },
            { value: 'grey', label: 'Grey', checked: false, },
            { value: 'blue', label: 'Blue', checked: false, },
            { value: 'olive', label: 'Olive', checked: false, },
            { value: 'tan', label: 'Tan', checked: false, },
        ],
    },
    {
        id: 'sizes',
        name: 'Sizes',
        options: [
            { value: 'xs', label: 'XS', checked: false, },
            { value: 's', label: 'S', checked: false, },
            { value: 'm', label: 'M', checked: false, },
            { value: 'l', label: 'L', checked: false, },
            { value: 'xl', label: 'XL', checked: false, },
            { value: '2xl', label: '2XL', checked: false, },
        ],
    },
]

const footerNavigation = {
    products: [
        { name: 'Bags', href: '#' },
        { name: 'Tees', href: '#' },
        { name: 'Objects', href: '#' },
        { name: 'Home Goods', href: '#' },
        { name: 'Accessories', href: '#' },
    ],
    company: [
        { name: 'Who we are', href: '#' },
        { name: 'Sustainability', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Terms & Conditions', href: '#' },
        { name: 'Privacy', href: '#' },
    ],
    customerService: [
        { name: 'Contact', href: '#' },
        { name: 'Shipping', href: '#' },
        { name: 'Returns', href: '#' },
        { name: 'Warranty', href: '#' },
        { name: 'Secure Payments', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Find a store', href: '#' },
    ],
}

export function MainLayout({children}:{children: ReactNode}) {
    
    const { 
        categoriesData, 
        mobileMenuOpen,
        setMobileMenuOpen,
        mobileFiltersOpen,
        setMobileFiltersOpen,
    } = useContextSelector(LayoutContext, (context => {
        return context;
    }))

    return (<>
     <div className="bg-gray-50">
            <div>
                {/* Mobile menu */}
                <MobileMenu
                    navigation={categoriesData}
                    // currencies={currencies}
                    mobileMenuOpen={mobileMenuOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
                />

                <MainHeader 
                    navigation={categoriesData}
                    // currencies={currencies}
                    setMobileMenuOpen={setMobileMenuOpen}
                />
            </div>

            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 sm:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4">
                                        {filters.map((section) => (
                                            <Disclosure as="div" key={section.name} className="border-t border-gray-200 px-4 py-6">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                                                                    <ChevronDownIcon
                                                                        className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                                                        aria-hidden="true"
                                                                    />
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 text-sm text-gray-500"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main>
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        {children}
                        </div>
                </main>

                <MainFooter 
                    footerNavigation={footerNavigation}
                />
            </div>
        </div>
    
    </>);
}