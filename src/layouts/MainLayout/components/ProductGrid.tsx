import { priceFormatter } from "../../../utils/format";

export function ProductGrid({ data, status }: { data: any; status: any }) {
    return (
        <section
            aria-labelledby="products-heading"
            className="mt- z-10"
        >
            <h2
                id="products-heading"
                className="sr-only"
            >
                Products
            </h2>

            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {Boolean(status === "success")
                    && data.products.map((product: any) => (
                        <a
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="group"
                        >
                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                                <h3>{product.title}</h3>
                                <p>{priceFormatter.format(product.price)}</p>
                            </div>
                            <p className="mt-1 text-sm italic text-gray-500">
                                {product.description}
                            </p>
                        </a>
                    ))}
            </div>
        </section>
    );
}
