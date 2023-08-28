import useFetch from "@/hooks/useFetch"
import { ISection } from "@/types/types"
import { FC, useMemo, useState } from "react"
import StudentSectionsView from "./StudentSectionsView"

interface IProps {

}


const StudentSectionsContainer: FC<IProps> = () => {
  const {data} = useFetch("/sections");
  const activeSections = data?.filter((data: ISection) => data.isOnline).length
  const [activeSection, setActiveSection] = useState("")

  const dataWithCoverImage = useMemo(() => {
    if(data) {
      return data?.map((item, idx) => ({...item, coverImage: idx+1 < 7 ? `/images/sections/section-cover-${idx+1}.png` : `/images/sections/section-cover-${Math.floor(Math.random() * (7 - 1) + 1)}.png`}))
    }
    return []
  }, [data])

  const selectedSection = useMemo(() => {
    if(data && activeSection) {
      const matchedSection = dataWithCoverImage?.filter((section) => section.id === activeSection)
      if(matchedSection[0]) return matchedSection[0]
      return null
    }
    return null
  }, [activeSection])



  return (
    <StudentSectionsView sections={dataWithCoverImage} activeSections={activeSections} selectSection={setActiveSection} selectedSection={selectedSection} />
  )
}

export default StudentSectionsContainer