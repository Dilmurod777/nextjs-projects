import useSWR from 'swr'

export const fetcher = (url: string) => fetch(url).then(r => r.json())

export function useUser () {
    const { data, error, isLoading } = useSWR(`/api/user`, fetcher)

    return {
        user: data,
        isLoading,
        isError: error
    }
}
