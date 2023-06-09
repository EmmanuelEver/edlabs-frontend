import { FC } from "react"
import { IActivitesBySection } from "@/types/types"
import SectionColumnContainer from "./parts/sectionColumn/SectionColumnContainer"
import AddActivityContainer from "./parts/addActivity/AddActivityContainer";
import ActivityContainer from "./parts/editActivity/EditActivityContainer";

interface IProps {
    sectionActivities: IActivitesBySection[]
    handleAddActivity: (id: string) => void;
    handleCloseNewActivityModal: () => void;
    activityModal: string;
    selectedActivity: any;
}

const StudentActivitiesView: FC<IProps> = ({sectionActivities, selectedActivity, handleAddActivity, handleCloseNewActivityModal, activityModal}) => {
    
  return (
    <div className="w-full h-full overflow-hidden">
        <div className="px-6 w-full">
            {/* <div className="flex items-center justify-between pt-6 w-full">
                <button className="flex ml-auto leading-none text-light-100 items-center font-medium justify-center rounded py-4 transition-colors px-4 bg-accentColor-100 hover:bg-blue-200">
                    <PlusIcon className="w-4 h-4"/>
                    <span className="ml-1">Create section</span>
                </button>
            </div> */}
        </div>
        <div className="px-6 pt-8 pb-4 h-full w-auto overflow-auto flex flex-nowrap">
            {
                sectionActivities?.map(activitiesBySection => (
                    <SectionColumnContainer handleAddActivity={handleAddActivity} sectionActivities={activitiesBySection} key={activitiesBySection.id} />
                ))
            }
        </div>
        {
            !!selectedActivity && <ActivityContainer selectedActivity={selectedActivity} />
        }
        {
            !!activityModal && <AddActivityContainer sectionId={activityModal} handleCloseModal={handleCloseNewActivityModal} />
        }
    </div>
  )
}

export default StudentActivitiesView