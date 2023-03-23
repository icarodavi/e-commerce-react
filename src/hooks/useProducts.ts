import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export function useProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const { data } = await api.get('products?limit=6');
            return data;
        }
    })
}

export function useProductsByCategory(slug: string) {
    return useQuery({
        queryKey: ["productsByCategory"],
        queryFn: async () => {
            const { data } = await api.get(`products/category/${slug}?limit=6`);
            return data;
        }
    })
}

export function useProductsById(id: string) {
    return useQuery({
        queryKey: ["useProductsById"],
        queryFn: async () => {
            const { data } = await api.get(`products/${id}`);
            return data;
        }
    })
}

