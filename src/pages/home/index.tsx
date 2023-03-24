
import { ProductGrid } from '../../layouts/MainLayout/components/ProductGrid';
import { FeaturedBanner } from '../../layouts/MainLayout/components/FeaturedBanner';
import { useProducts } from '../../hooks/useProducts';
import { MainLayout } from '../../layouts/MainLayout';

export function Home() {
    const { data, status } = useProducts();
    return (<>
        <MainLayout>
            {/* Filters */}
            <div className="pb-2">
                
            </div >

            {/* Product grid */}
            <ProductGrid
                data={data}
                status={status}
            />

            <div className="mb-8">
                <FeaturedBanner />
            </div>
        </MainLayout>
    </>);
}