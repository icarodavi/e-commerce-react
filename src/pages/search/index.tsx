
import { ProductGrid } from '../../layouts/MainLayout/components/ProductGrid';
import { MainLayout } from '../../layouts/MainLayout';
import { useParams } from 'react-router-dom';
import { useFindProducts, useProductsByCategory } from '../../hooks/useProducts';


export function SearchProducts() {
    const { query } = useParams();
    const { data, status } = useFindProducts(String(query));

    return (<>
        <MainLayout>
            {/* Product grid */}
            <div className="mt-2 mb-8">
                <ProductGrid
                    data={data}
                    status={status}
                />
            </div>

        </MainLayout>
    </>);
}