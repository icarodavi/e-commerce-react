import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export function useProducts() {
    return useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const { data } = await api.get('products?limit=6');
            return data;
        }
    })
}