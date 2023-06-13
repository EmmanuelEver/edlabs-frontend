import useFetch from "@/hooks/useFetch"
import OutputsView from "./OutputsView"

const OutputsContainer = () => {
    const {data} = useFetch("/outputs/students")

    console.log(data)
    return (
    <OutputsView
        data={data}
    />
  )
}

export default OutputsContainer