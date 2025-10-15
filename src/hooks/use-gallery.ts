import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getGallery = async () => {
        const response = await axios.get(import.meta.env.VITE_CONTENT_KEY);
    return response.data;
}

const useGallery = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['gallery'],
        queryFn: () => getGallery(),
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
    });
    return { data, isLoading, error };
}

export default useGallery;