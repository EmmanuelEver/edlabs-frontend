import useToast from "@/hooks/useToast"
import { apiPrivate } from "@/services/axios"
import { ITeacherSection } from "@/types/types"
import { ChangeEvent, FC, useState } from "react"
import { useSWRConfig } from "swr"
import SectionDetailsView from "./SectionDetailsView"

interface IProps {
  data: ITeacherSection | undefined
}

const SectionDetailsContainer: FC<IProps> = ({data}) => {
    const [showStudentList, setShowStudentList] = useState(false)
    const [activitiesList, setShowActivitiesList] = useState(false)
    const [changingOnlineStatus, setChangingOnlineStatus] = useState(false)
    const {mutate} = useSWRConfig()
    const {toast} = useToast()
    async function handleOnlineChange(e: ChangeEvent<HTMLInputElement>) {
      setChangingOnlineStatus(true)
      try {
        const resp = await apiPrivate.put(`/sections/${data?.id}`, JSON.stringify({isOnline: e.target.checked}))
        await mutate(`/sections/${data?.id}`)
        await mutate(`/sections`)
        console.log(resp)
        toast("SUCCESS", "Section updated!")
        setChangingOnlineStatus(false)
      } catch (error) {
        console.log(error)
        toast("DANGER", "Error occured while saving")
        setChangingOnlineStatus(false)
      }
    }
  return (
    <SectionDetailsView 
        showStudentList={showStudentList}
        setShowStudentList={setShowStudentList}
        activitiesList={activitiesList}
        data={data}
        setShowActivitiesList={setShowActivitiesList}
        handleOnlineChange={handleOnlineChange}
        changingOnlineStatus={changingOnlineStatus}
    />
  )
}

export default SectionDetailsContainer