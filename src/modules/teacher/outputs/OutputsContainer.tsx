import useFetch from "@/hooks/useFetch"
import { useRouter } from "next/router"
import OutputsView from "./OutputsView"

const OutputsContainer = () => {
    const router = useRouter()

    return (
    <OutputsView
        showOutputByActivity={router.query.activityId || ""}
    />
  )
}

export default OutputsContainer