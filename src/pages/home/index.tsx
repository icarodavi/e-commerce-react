import { MainPageFilters } from '../../layouts/MainLayout/components/MainPageFilters';
import { ProductGrid } from '../../layouts/MainLayout/components/ProductGrid';
import { FeaturedBanner } from '../../layouts/MainLayout/components/FeaturedBanner';
import { MoreProductsGrid } from '../../layouts/MainLayout/components/MoreProductsGrid';
import { useProducts } from '../../hooks/useProducts';
import { useAllCategories } from '../../hooks/useAllCategories';
import { MainLayout } from '../../layouts/MainLayout';
import { useContextSelector } from 'use-context-selector';
import { LayoutContext } from '../../context/ShopContext';


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

const sortOptions = [
    { name: 'Most Popular', href: '#' },
    { name: 'Best Rating', href: '#' },
    { name: 'Newest', href: '#' },
    { name: 'Price: Low to High', href: '#' },
    { name: 'Price: High to Low', href: '#' },
]

const modifiedFilters = (dataFilters: any, newCategories: any) => {
    const newFilters = dataFilters.map((item: any) => {
        if (item.id === 'category') {
            const toSpreadCategories = newCategories.map((category: any) => {
                return {
                    value: category.key,
                    label: category.title,
                    checked: false,
                }
            });
            return {
                id: 'category',
                name: 'Category',
                options: [...toSpreadCategories]
            }
        }
        return item;
    })
    return newFilters;
}


export function Home() {
    const { data, status } = useProducts();
    const {
        categoriesData,
        setMobileFiltersOpen,
        categoriesStatus
    } = useContextSelector(LayoutContext, (context => {
        return context;
    }))
    return (<>
        <MainLayout>
            {/* Filters */}
            <div className="pb-2">
                {(Boolean(categoriesStatus === 'success') && categoriesData) && (<MainPageFilters
                    filters={modifiedFilters(filters, categoriesData)}
                    setMobileFiltersOpen={setMobileFiltersOpen}
                    sortOptions={sortOptions}
                />)
                }
            </div >

            {/* Product grid */}
            <ProductGrid
                data={data}
                status={status}
            />

            <FeaturedBanner />

            <MoreProductsGrid
                products2={products2}
            />
        </MainLayout>
    </>);
}