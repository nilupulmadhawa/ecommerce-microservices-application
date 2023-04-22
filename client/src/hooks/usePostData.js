import { useQuery, useMutation } from "@tanstack/react-query";
import { addPost, getAllPosts } from "../services/post";

export const usePostData = () => {
    const { data, isLoading, isError, error, refetch } = useQuery(['posts'], async () => {
        const response = await getAllPosts();
        return response.data;
    });
    const { mutate } = useMutation(addPost, {
        onSuccess: () => refetch()
    });

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
        mutate
    }
}

export const useSortPostData = () => {
    const { data, isLoading, isError, error, refetch } = useQuery(['s_posts'], async () => {
        const response = await getAllPosts('sort[created_at]=1');
        return response.data;
    });
    const { mutate } = useMutation(addPost, {
        onSuccess: () => refetch()
    });

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
        mutate
    }
}