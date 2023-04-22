import { useQuery, useMutation } from "@tanstack/react-query";
import { deletePost, getMyPosts } from "../services/post";

export const useMyPost = () => {
    const { data, isLoading, isError, error, refetch } = useQuery(['myposts'], async () => {
        const response = await getMyPosts();
        return response.data;
    });
    const { mutate } = useMutation(deletePost, {
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