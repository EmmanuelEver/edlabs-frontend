import useFetch from "@/hooks/useFetch"
import { ISection } from "@/types/types"
import { FC } from "react"
import StudentSectionsView from "./StudentSectionsView"

interface IProps {

}


const StudentSectionsContainer: FC<IProps> = () => {
  const {data} = useFetch("/sections");
  const activeSections = data?.filter((data: ISection) => data.isOnline).length
  return (
    <StudentSectionsView sections={data} activeSections={activeSections} />
  )
}

export default StudentSectionsContainer