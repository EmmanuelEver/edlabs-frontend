import SectionColumn from "@/components/sectionColumn/SectionColumn"
import { FC } from "react"
import { IActivitesBySection } from "./StudentsActivitiesContainer"

interface IProps {
    activities: IActivitesBySection[]
}

const StudentActivitiesView: FC<IProps> = ({activities}) => {
    
  return (
    <div className="w-full h-full overflow-hidden">
        <div className="px-6 pt-8 pb-4 h-full w-auto overflow-auto flex flex-nowrap">
            {
                activities.map(section => (
                    <SectionColumn key={section.internal_id} section={section} />
                ))
            }
        </div>
    </div>
  )
}

export default StudentActivitiesView