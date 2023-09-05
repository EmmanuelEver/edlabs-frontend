import useFetch from '@/hooks/useFetch'
import { IActivitySummary } from '@/types/types'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import OutputsByActivityView from './OutputsByActivityView'

const OutputsByActivityContainer = () => {
    const router = useRouter()
    const { data: outputs, isLoading, revalidate, isValidating } = useFetch(router?.query.activityId ? `/outputs/activities/${router?.query.activityId}` : null)
    const [data, setData] = useState<IActivitySummary | null>(null)

    useEffect(() => {
        if (outputs) {
            setData(outputs)
        }
    }, [outputs])
    const averageEqScore = useMemo(() => {
        if (data) {
            const sum = data?.sessions.reduce((a, b) => {
                if (Number.isFinite(b.eqScore)) return b.eqScore
                return 0
            }, 0)
            return (sum / data.sessions.length)
        }
        return 0
    }, [data])

    const sessions = useMemo(() => {
        if (data) {
            const sessions = data.sessions?.sort((a: IActivitySummary, b: IActivitySummary) => b.eqScore - a.eqScore)
            return sessions
        }
        return null
    }, [data])
    
    const averageCompilations = useMemo(() => {
        if (data) {
            const sessions = data.sessions.reduce((a,b) => a+=b?.compilations?.length, 0)
            return sessions / data.sessions.length
        }
        return 0
    }, [data])
    
    const errorTypes = useMemo(() => {
        if(data) {
            const errorTypesCount = {}
            data.sessions?.forEach((session) => {
                session?.compilations.forEach((compilation) => {
                    if(compilation.error && !!compilation.errorType) {
                        if(compilation.errorType in errorTypesCount) {
                            errorTypesCount[compilation.errorType] = errorTypesCount[compilation.errorType] + 1
                        } else {
                            errorTypesCount[compilation.errorType] = 1
                        }
                    }
                })
            })
            const formattedErrors = Object.entries(errorTypesCount).map((item:any) => ({error: item[0], count: item[1]}))
            return formattedErrors.sort((a, b) => b.count - a.count)
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
            averageCompilations={averageCompilations}
            sessions={sessions}
            errorTypes={errorTypes}
        />
    )
}

export default OutputsByActivityContainer