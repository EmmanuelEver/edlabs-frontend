import useFetch from '@/hooks/useFetch'
import { useRouter } from 'next/router'
import React from 'react'
import OutputsByActivityView from './OutputsByActivityView'

const OutputsByActivityContainer = () => {
    const router = useRouter()
    const {data, isLoading} = useFetch(router?.query.activityId ? `/outputs/activities/${router?.query.activityId}` : null)
    return (
        <OutputsByActivityView 
            data={data}
            isLoading={isLoading}
        />
    )
}

export default OutputsByActivityContainer