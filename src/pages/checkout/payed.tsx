import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { AiOutlineCheckCircle, AiOutlineHome } from "react-icons/ai";
import { UIButton } from "../../components/UIButton";
import { ShopContext } from "../../context/ShopContext";
import { MainLayout } from "../../layouts/MainLayout";
import { priceFormatter } from "../../utils/format";
import { sumItem } from "../../utils/number";

export function Payed() {
    const { cart, contextClearCart } = useContextSelector(
        ShopContext,
        (context) => context,
    );
    const [payedCart] = useState([...(cart || [])]);
    const navigate = useNavigate();

    const handlePayed = async () => {
        contextClearCart();
    };

    useEffect(() => {
        handlePayed();
    }, []);
    return (
        <MainLayout>
            <div className="bg-white">
                {/* Background color split screen for large screens */}

                <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8">
                    <h1 className="sr-only">Checkout</h1>

                    <section
                        aria-labelledby="summary-heading"
                        className="bg-indigo-900 pt-6 text-indigo-300 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pt-0 px-4 pb-6 shadow-md shadow-indigo-500 border-gray-200"
                    >
                        <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0 mt-2">
                            <h2
                                id="summary-heading"
                                className="sr-only"
                            >
                                Order summary
                            </h2>

                            <dl>
                                <dt className="text-sm font-medium">
                                    Amount due
                                </dt>
                                <dd className="mt-1 text-3xl font-bold tracking-tight text-white">
                                    {payedCart.length > 0
                                        ? priceFormatter.format(
                                            Number(sumItem(payedCart)),
                                        )
                                        : "$0.00"}
                                </dd>
                            </dl>

                            <ul className="divide-y divide-white divide-opacity-10 text-sm font-medium">
                                {payedCart
                                    && payedCart.map((product) => (
                                        <li
                                            key={product.id}
                                            className="flex items-start space-x-4 py-6"
                                        >
                                            <img
                                                src={product.imageSrc}
                                                alt={product.name}
                                                className="h-20 w-20 flex-none rounded-md object-cover object-center"
                                            />
                                            <div className="flex-auto space-y-1">
                                                <h3 className="text-white">
                                                    {product.name}
                                                </h3>
                                                <p>
                                                    Quantity:
                                                    {' '}
                                                    {product.quantity}
                                                </p>
                                                <p>
                                                    Unit price:
                                                    {" "}
                                                    {priceFormatter.format(
                                                        product.price,
                                                    )}
                                                </p>
                                            </div>
                                            <p className="flex-none text-base font-medium text-white">
                                                {priceFormatter.format(
                                                    Number(
                                                        product.price
                                                            * product.quantity,
                                                    ),
                                                )}
                                            </p>
                                        </li>
                                    ))}
                            </ul>

                            <dl className="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
                                <div className="flex items-center justify-between">
                                    <dt>Subtotal</dt>
                                    <dd>
                                        {payedCart.length > 0
                                            ? priceFormatter.format(
                                                Number(sumItem(payedCart)),
                                            )
                                            : "$0.00"}
                                    </dd>
                                </div>

                                <div className="flex items-center justify-between">
                                    <dt>Shipping</dt>
                                    <dd>$5.00</dd>
                                </div>

                                <div className="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white">
                                    <dt className="text-base">Total</dt>
                                    <dd className="text-base">
                                        {payedCart.length > 0
                                            ? priceFormatter.format(
                                                Number(
                                                    sumItem(payedCart) + 5,
                                                ),
                                            )
                                            : "$0.00"}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </section>

                    <div className="flex flex-col justify-center items-center">
                        <div className=" text-indigo-800">
                            <AiOutlineCheckCircle className="h-40 w-40" />
                        </div>
                        <p>
                            Success! Your payment has been processed and your
                            order will arrive soon.
                        </p>
                        <UIButton
                            className="mt-4"
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            <div className="flex flex-row gap-2 justify-center items-center">
                                <AiOutlineHome className="h-5 w-5" />
                                Go Home
                            </div>
                        </UIButton>
                    </div>
                </main>
            </div>
        </MainLayout>
    );
}
