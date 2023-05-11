import SectionColumn from "@/components/sectionColumn/SectionColumn"
import { FC } from "react"
import { PlusIcon } from '@heroicons/react/24/solid'
import { IActivitesBySection } from "@/types/types"

interface IProps {
    activities: IActivitesBySection[]
}

const StudentActivitiesView: FC<IProps> = ({activities}) => {
    
  return (
    <div className="w-full h-full overflow-hidden">
        <div className="px-6 w-full">
            <div className="flex items-center justify-between pt-6 w-full">
                <button className="flex ml-auto leading-none text-light-100 items-center font-medium justify-center rounded py-4 transition-colors px-4 bg-accentColor-100 hover:bg-blue-200">
                    <PlusIcon className="w-4 h-4"/>
                    <span className="ml-1">Create section</span>
                </button>
            </div>
        </div>
        <div className="px-6 pt-8 pb-4 h-full w-auto overflow-auto flex flex-nowrap">
            
        </div>
    </div>
  )
}

export default StudentActivitiesView