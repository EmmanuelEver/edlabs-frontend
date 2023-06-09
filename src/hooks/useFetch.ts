import { fetcher } from '@/services/fetchers'
import useSWR from 'swr'

const useFetch = (endpoint: string | null, options?: any) => {
    const { data, error, isLoading, isValidating, mutate} = useSWR(endpoint, fetcher, {...options})
    return {data, error, isLoading, isValidating, revalidate: mutate}
}

export default useFetch