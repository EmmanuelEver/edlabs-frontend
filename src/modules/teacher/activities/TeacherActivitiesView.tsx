import { FC } from "react"
import { IActivitesBySection } from "@/types/types"
import SectionColumnContainer from "./parts/sectionColumn/SectionColumnContainer"
import AddActivityContainer from "./parts/addActivity/AddActivityContainer";
import ActivityContainer from "./parts/editActivity/EditActivityContainer";
import LoadingComponent from "@/components/loader/LoadingComponent";

interface IProps {
    sectionActivities: IActivitesBySection[]
    handleAddActivity: (id: string) => void;
    handleCloseNewActivityModal: () => void;
    activityModal: string;
    selectedActivity: any;
    isLoading: boolean;
}

const StudentActivitiesView: FC<IProps> = ({sectionActivities, selectedActivity, isLoading, handleAddActivity, handleCloseNewActivityModal, activityModal}) => {
    
  return (
    <div className="relative w-full h-full overflow-hidden"> 
    {
        isLoading && <LoadingComponent />
    }
        <div className="w-full px-6">
            {/* <div className="flex items-center justify-between w-full pt-6">
                <button className="flex items-center justify-center px-4 py-4 ml-auto font-medium leading-none transition-colors rounded text-light-100 bg-accentColor-100 hover:bg-blue-200">
                    <PlusIcon className="w-4 h-4"/>
                    <span className="ml-1">Create section</span>
                </button>
            </div> */}
        </div>
        <div className="flex w-auto h-full px-6 pt-8 pb-4 overflow-auto flex-nowrap">
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