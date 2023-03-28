export function MoreProductsGrid({ products2 }: { products2: any }) {
    return (
        <section
            aria-labelledby="more-products-heading"
            className="mt-16 pb-24"
        >
            <h2
                id="more-products-heading"
                className="sr-only"
            >
                More products
            </h2>

            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {products2.map((product: any) => (
                    <a
                        key={product.id}
                        href={product.href}
                        className="group"
                    >
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3">
                            <img
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                            />
                        </div>
                        <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                            <h3>{product.name}</h3>
                            <p>{product.price}</p>
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
