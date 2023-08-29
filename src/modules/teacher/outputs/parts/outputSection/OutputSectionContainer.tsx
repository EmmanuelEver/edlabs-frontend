import useFetch from "@/hooks/useFetch"
import { useRouter } from "next/router"
import { useEffect, useMemo } from "react"
import OutputSectionView from "./OutputSectionView"

const OutputSectionContainer = () => {
    const {data, isLoading} = useFetch("/outputs/students")
    const router = useRouter()

    const section = useMemo(() => {
        if(data) {
            return data.find((item) => item.id === router?.query?.sectionId)
        }
        return null
    }, [router.query, data])
    return (
        <OutputSectionView section={section} />
    )
}

export default OutputSectionContainer