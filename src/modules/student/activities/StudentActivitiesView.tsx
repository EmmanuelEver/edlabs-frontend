import SectionColumn from "@/components/sectionColumn/SectionColumn"
import { FC } from "react"
import { PlusIcon } from '@heroicons/react/24/solid'
import { IActivitesBySection } from "@/types/types"
import SectionColumnView from "./parts/SectionColumnView"
import JoinSectionContainer from "@/components/joinSection/JoinSectionContainer"

interface IProps {
    activities: IActivitesBySection[];
    showAddModal: boolean;
    handleSetShowModal: (val: boolean) => void
}

const StudentActivitiesView: FC<IProps> = ({activities, showAddModal, handleSetShowModal}) => {
    
  return (
    <div className="w-full h-full overflow-hidden">
        <div className="px-6 w-full">
            <div className="flex items-center justify-between pt-6 w-full">
                <JoinSectionContainer />
            </div>
        </div>
        <div className="px-6 pt-8 pb-4 h-full w-auto overflow-auto flex flex-nowrap">
            {
                activities.map(section => (
                    <SectionColumnView key={section.internal_id} section={section} />
                ))
            }
        </div>
    </div>
  )
}

export default StudentActivitiesView