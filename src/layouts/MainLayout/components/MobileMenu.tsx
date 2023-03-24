import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, } from "react";

export function MobileMenu({
    navigation,
    mobileMenuOpen,
    setMobileMenuOpen
}: {
    navigation: any,
    mobileMenuOpen: any,
    setMobileMenuOpen: any
}) {


    return (<>
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileMenuOpen}>
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
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                            <div className="flex px-4 pt-5 pb-2">
                                <button
                                    type="button"
                                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            <div className="space-y-6 py-6 px-4">
                                    <div className="flow-root">
                                        <h3 className="font-semibold antialiased text-gray-500">Categories</h3>
                                    </div>
                            </div>
                            <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                                <a href="/" className="-m-2 block p-2 font-semibold text-gray-900">Home</a>
                                {(navigation && navigation.length > 0) && navigation.map((page: any) => (
                                    <div key={page.key} className="flow-root">
                                        <a href={`/category/${page.key}`} className="-m-2 block p-2 font-medium text-gray-900">
                                            {page.title}
                                        </a>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                                <div className="flow-root">
                                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                        Create an account
                                    </a>
                                </div>
                                <div className="flow-root">
                                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                        Sign in
                                    </a>
                                </div>
                            </div>

                            <div className="space-y-6  py-6 px-4">
                                {/* Currency selector */}
                                <form>
                                </form>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    </>);
}