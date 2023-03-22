import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { SlugToTitle } from "../utils/string";

export function useAllCategories() {
    return useQuery({
        queryKey: ["allCategories"],
        queryFn: async () => {
            const { data } = await api.get('products/categories');
            const dataObj = data.map((item: any) => {
                return {
                    title: SlugToTitle(item),
                    key: item,
                }
            })
            return dataObj;
        }
    })
}