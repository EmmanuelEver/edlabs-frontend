import useFetch from '@/hooks/useFetch'
import { IActivitySummary } from '@/types/types'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import OutputsByActivityView from './OutputsByActivityView'

const OutputsByActivityContainer = () => {
    const router = useRouter()
    const {data: outputs, isLoading, revalidate, isValidating} = useFetch(router?.query.activityId ? `/outputs/activities/${router?.query.activityId}` : null)
    const [data, setData] = useState<IActivitySummary | null>(null)

    useEffect(() => {
        if(outputs) {
            setData(outputs)
        }
    }, [outputs])
    const averageEqScore = useMemo(() => {
        if(data) {
            const sum = data?.sessions.reduce((a, b) => (a += b.eqScore), 0)
        return (sum / data.sessions.length).toFixed(3)
        }
        return "0"
    }, [data])

    const sessions = useMemo(() => {
        if(data) {
            const sessions = data.sessions?.sort((a: IActivitySummary,b: IActivitySummary) => b.eqScore - a.eqScore)
            return sessions
        }
        return null
    }, [data])
    return (
        <OutputsByActivityView 
            data={data}
            isLoading={isLoading}
            revalidate={revalidate}
            isValidating={isValidating}
            averageEqScore={averageEqScore}
            sessions={sessions}
        />
    )
}

export default OutputsByActivityContainer