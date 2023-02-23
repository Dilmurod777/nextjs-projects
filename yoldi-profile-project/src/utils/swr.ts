import useSWR from 'swr'
import {UserResponseData} from "@/utils/api";

export const fetcher = (url: string) => fetch(url).then(r => r.json())

export function useUser() {
    const {data, error, isLoading} = useSWR(`/api/user`, fetcher)

    console.log('useUser', data, error, isLoading)
    if (!data) {
        return {
            user: null,
            isLoading,
            isError: error
        }
    }

    if (data.status === 'ok') {
        return {
            user: data.data,
            isLoading,
            isError: error
        }
    } else {
        return {
            user: null,
            isLoading,
            isError: data.data
        }
    }
}
