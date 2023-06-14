import useFetch from '@/hooks/useFetch'
import React from 'react'
import OutputsAllView from './OutputsAllView'

const OutputsAllContainer = () => {
    const {data, isLoading} = useFetch("/outputs/students")

    return (
        <OutputsAllView
            data={data}
            isLoading={isLoading}
        />
    )
}

export default OutputsAllContainer