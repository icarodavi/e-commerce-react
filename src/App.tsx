import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Popover, Tab, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
    ShoppingBagIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useProducts } from './hooks/useProducts';
import { priceFormatter } from './utils/format';
import { MobileMenu } from './layouts/MainLayout/components/MobileMenu';
import { classNames } from './utils/string';
import { Header } from './layouts/MainLayout/components/Header';
import { MainPageFilters } from './layouts/MainLayout/components/MainPageFilters';
import { ProductGrid } from './layouts/MainLayout/components/ProductGrid';
import { FeaturedBanner } from './layouts/MainLayout/components/FeaturedBanner';
import { MoreProductsGrid } from './layouts/MainLayout/components/MoreProductsGrid';
import { MainFooter } from './layouts/MainLayout/components/MainFooter';
import { useAllCategories } from './hooks/useAllCategories';

const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']
const navigation = {
    categories: [
        {
            name: 'Women',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
                {
                    name: 'Accessories',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
                    imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.',
                },
                {
                    name: 'Carry',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg',
                    imageAlt: 'Model opening tan leather long wallet with credit card pockets and cash pouch.',
                },
            ],
        },
        {
            name: 'Men',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
                    imageAlt: 'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
                },
                {
                    name: 'Basic Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
                    imageAlt: 'Model wearing light heather gray t-shirt.',
                },
                {
                    name: 'Accessories',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg',
                    imageAlt:
                        'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
                },
                {
                    name: 'Carry',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg',
                    imageAlt: 'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
                },
            ],
        },
    ],
    pages: [
        { name: 'Company', href: '#' },
        { name: 'Stores', href: '#' },
    ],
}
const sortOptions = [
    { name: 'Most Popular', href: '#' },
    { name: 'Best Rating', href: '#' },
    { name: 'Newest', href: '#' },
    { name: 'Price: Low to High', href: '#' },
    { name: 'Price: High to Low', href: '#' },
]
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
const products1 = [
    {
        id: 1,
        name: 'Focus Paper Refill',
        href: '#',
        price: '$13',
        description: '3 sizes available',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
        id: 2,
        name: 'Focus Card Holder',
        href: '#',
        price: '$64',
        description: 'Walnut',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg',
        imageAlt: 'Paper card sitting upright in walnut card holder on desk.',
    },
    {
        id: 3,
        name: 'Focus Carry Pouch',
        href: '#',
        price: '$32',
        description: 'Heather Gray',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
        imageAlt: 'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
    },
    // More products...
]
const products2 = [
    {
        id: 7,
        name: 'Electric Kettle',
        href: '#',
        price: '$149',
        description: 'Black',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-07.jpg',
        imageAlt: 'Close up of long kettle spout pouring boiling water into pour-over coffee mug with frothy coffee.',
    },
    {
        id: 8,
        name: 'Leather Workspace Pad',
        href: '#',
        price: '$165',
        description: 'Black',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-08.jpg',
        imageAlt:
            'Extra large black leather workspace pad on desk with computer, wooden shelf, desk organizer, and computer peripherals.',
    },
    {
        id: 9,
        name: 'Leather Long Wallet',
        href: '#',
        price: '$118',
        description: 'Natural',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-09.jpg',
        imageAlt:
            'Leather long wallet held open with hand-stitched card dividers, full-length bill pocket, and simple tab closure.',
    },
    // More products...
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

export default function App() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const queryClient = useProducts();
    const { status, data } = queryClient;
    const queryCategories = useAllCategories();
    const {status: categoriesStatus, data: categoriesData } = queryCategories;
    console.log(categoriesStatus, categoriesData);


    return (
        <div className="bg-gray-50">
            <div>
                {/* Mobile menu */}
                <MobileMenu
                    navigation={navigation}
                    currencies={currencies}
                    mobileMenuOpen={mobileMenuOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
                />

                <Header 
                    navigation={navigation}
                    currencies={currencies}
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
                        <div className="py-24 text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>
                            <p className="mx-auto mt-4 max-w-3xl text-base text-gray-500">
                                Thoughtfully designed objects for the workspace, home, and travel.
                            </p>
                        </div>

                        {/* Filters */}
                       <MainPageFilters 
                        filters={filters}
                        setMobileFiltersOpen={setMobileFiltersOpen}
                        sortOptions={sortOptions}
                       />

                        {/* Product grid */}
                        <ProductGrid
                        data={data}
                        status={status}
                        />

                        <FeaturedBanner />

                        <MoreProductsGrid 
                            products2={products2}
                        />
                    </div>
                </main>

                <MainFooter 
                    footerNavigation={footerNavigation}
                />
            </div>
        </div>
    )
}
