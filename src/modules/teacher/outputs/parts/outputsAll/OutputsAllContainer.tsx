import useFetch from '@/hooks/useFetch'
import React, { useMemo } from 'react'
import OutputsAllView from './OutputsAllView'

const OutputsAllContainer = () => {
    const {data, isLoading} = useFetch("/outputs/students")

    const dataWithCoverImage = useMemo(() => {
        if(data) {
          return data?.map((item, idx) => ({...item, coverImage: idx+1 < 7 ? `/images/sections/section-cover-${idx+1}.png` : `/images/sections/section-cover-${Math.floor(Math.random() * (7 - 1) + 1)}.png`}))
        }
        return []
      }, [data])
    return (
        <OutputsAllView
            data={dataWithCoverImage}
            isLoading={isLoading}
        />
    )
}

export default OutputsAllContainer