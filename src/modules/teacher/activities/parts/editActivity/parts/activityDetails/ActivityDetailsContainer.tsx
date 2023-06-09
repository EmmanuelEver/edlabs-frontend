import { apiPrivate } from "@/services/axios"
import { IActivityFull } from "@/types/types"
import { ChangeEvent, FC, useState } from "react"
import ActivityDetailsView from "./ActivityDetailsView"
import {useSWRConfig} from "swr"

interface IProps {
    data: IActivityFull
}

const ActivityDetailsContainer: FC<IProps> = ({data}) => {
    const [changingOnlineStatus, setChangingOnlineStatus] = useState(false)
    const {mutate} = useSWRConfig()

    async function handleChangeStatus(e: ChangeEvent<HTMLInputElement>) {
        setChangingOnlineStatus(true)
        try {
            const resp = await apiPrivate.put(`/activities/${data.id}`, JSON.stringify({isOnline: e.target.checked}))
            setChangingOnlineStatus(false)
            await mutate(`/activities/${data.id}`)
            await mutate("/activities")
            console.log(resp)
          } catch (error) {
            console.log(error)
            setChangingOnlineStatus(false)
            alert("Error occured while saving")
          }
    }
    return (
        <ActivityDetailsView data={data} handleChangeStatus={handleChangeStatus} changingOnlineStatus={changingOnlineStatus} />
    )
}

export default ActivityDetailsContainer