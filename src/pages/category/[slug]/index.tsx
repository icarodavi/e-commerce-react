
import { ProductGrid } from '../../../layouts/MainLayout/components/ProductGrid';
import { MainLayout } from '../../../layouts/MainLayout';
import { useParams } from 'react-router-dom';
import { useProductsByCategory } from '../../../hooks/useProducts';


export function ProductsByCategory() {
    const { slug } = useParams();

    const { data, status } = useProductsByCategory(String(slug));

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