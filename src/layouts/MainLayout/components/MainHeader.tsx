import { Menu, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, ChevronDownIcon, MagnifyingGlassIcon, QuestionMarkCircleIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { ShopContext } from "../../../context/ShopContext";


export function MainHeader({
    navigation,
    setMobileMenuOpen
}: {
    navigation: any,
    setMobileMenuOpen: any
}) {
    const [showSearchInput, setShowSearchInput] = useState(false);
    const navigate = useNavigate();
    const { cart, searchQuery, setSearchQuery } = useContextSelector(ShopContext, (context) => context);
    return (<>
        <header className="relative">
            <nav aria-label="Top">
                {/* Top navigation */}
                <div className="bg-gray-900">
                    <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        {/* Currency selector */}
                        <form>

                        </form>

                        <div className="flex items-center space-x-6">
                            <a href="#" className="text-sm font-medium text-white hover:text-gray-100">
                                Sign in
                            </a>
                            <a href="#" className="text-sm font-medium text-white hover:text-gray-100">
                                Create an account
                            </a>
                        </div>
                    </div>
                </div>

                {/* Secondary navigation */}
                <div className="bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            {/* Logo (lg+) */}
                            <div className="hidden lg:flex lg:flex-1 lg:items-center">
                                <a href="#">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                        alt=""
                                    />
                                </a>
                            </div>

                            <div className="hidden h-full lg:flex">
                                {/* Flyout menus */}
                                <Popover.Group className="inset-x-0 bottom-0 px-4">
                                    <div className="flex h-full justify-center space-x-8">
                                        <div className="py-2">
                                            <Menu as="div" className="relative inline-block text-left">
                                                <Menu.Button as="div" className="inline-flex h-full justify-center items-center rounded-md px-4 py-2 text-sm font-medium text-gray-800 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                    <button
                                                        onClick={() => {
                                                            navigate('/', { replace: true, })
                                                            // toast.success('Sucesso!');
                                                        }}
                                                        className="bg-white">Home</button>
                                                </Menu.Button>
                                            </Menu>
                                            <Menu as="div" className="relative inline-block text-left">
                                                <Menu.Button
                                                    className="inline-flex h-full justify-center items-center rounded-md px-4 py-2 text-sm font-medium text-gray-800 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                    Categories
                                                    <ChevronDownIcon
                                                        className="ml-2 -mr-1 h-5 w-5 text-gray-400 hover:text-gray-200"
                                                        aria-hidden="true"
                                                    />
                                                </Menu.Button>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                                        <div className="px-1 py-1 z-50">

                                                            {(navigation && navigation.length > 0) && navigation.map((page: any) => (
                                                                <Menu.Item key={page.key} as={Fragment}>
                                                                    <a
                                                                        key={page.key}
                                                                        href={`/category/${page.key}`}
                                                                        className="group flex w-full items-center rounded-md px-2 py-2 text-sm z-50 bg-white hover:text-purple-900"
                                                                    >
                                                                        {page.title}
                                                                    </a>
                                                                </Menu.Item>
                                                            ))}
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                            <Menu as="div" className="relative inline-block text-left">
                                                <Menu.Button as="div" className="inline-flex h-full justify-center items-center rounded-md px-4 py-2 text-sm font-medium text-gray-800 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                    <button className="bg-white">My Account</button></Menu.Button>
                                                <Menu.Button as="div" className="inline-flex h-full justify-center items-center rounded-md px-4 py-2 text-sm font-medium text-gray-800 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                    <button onClick={() => { console.log('Orders'); }} className="bg-white">Orders</button></Menu.Button>
                                            </Menu>
                                        </div>
                                    </div>
                                </Popover.Group>
                            </div>

                            {/* Mobile menu and search (lg-) */}
                            <div className="flex flex-1 items-center lg:hidden">
                                <button
                                    type="button"
                                    className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                                    onClick={() => setMobileMenuOpen(true)}
                                >
                                    <span className="sr-only">Open menu</span>
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Search */}
                                <a
                                    href="#"
                                    onClick={() => { setShowSearchInput(!showSearchInput) }}
                                    className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Search</span>
                                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                </a>
                                <Transition
                                    show={showSearchInput}
                                    enter="transition-opacity ease-linear duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity ease-linear duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    as={Fragment}
                                >
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        navigate(`/search/${searchQuery}`, {
                                            replace: true,
                                            relative: "path",
                                        });
                                        navigate(0);
                                    }}>
                                        <input
                                            className="border text-sm border-gray-200 rounded-md px-2"
                                            placeholder="Search"
                                            value={String(searchQuery)}
                                            onChange={(e) => { setSearchQuery(e.target.value) }}
                                        />
                                    </form>
                                </Transition>
                            </div>

                            {/* Logo (lg-) */}
                            <a href="#" className="lg:hidden">
                                <span className="sr-only">Your Company</span>
                                <img
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt=""
                                    className="h-8 w-auto"
                                />
                            </a>

                            <div className="flex flex-1 items-center justify-end gap-1">
                                <Transition
                                    show={showSearchInput}
                                    enter="transition-opacity ease-linear duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity ease-linear duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    as={Fragment}
                                >
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        navigate(`/search/${searchQuery}`, {
                                            replace: true,
                                            relative: "path",
                                        });
                                        navigate(0);
                                    }}>
                                        <input
                                            className="border text-sm border-gray-200 rounded-md px-2 hidden lg:block"
                                            placeholder="Search"
                                            value={String(searchQuery)}
                                            onChange={(e) => { setSearchQuery(e.target.value) }}
                                        />
                                    </form>
                                </Transition>
                                <a href="#" onClick={() => { setShowSearchInput(!showSearchInput) }}
                                    className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
                                    <div className="flex flex-row justify-center items-center gap-2">
                                        Search
                                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                    </div>
                                </a>


                                <div className="flex items-center lg:ml-8">


                                    {/* Cart */}
                                    <div className="ml-4 flow-root lg:ml-8">
                                        <a href="/cart" className="group -m-2 flex items-center p-2">
                                            <ShoppingBagIcon
                                                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cart && cart.length}</span>
                                            <span className="sr-only">items in cart, view bag</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    </>)
}