import { IActivitesBySection } from "@/types/types"
import { FC, useState } from "react";
import SectionActivitiesView from "./SectionColumnView";

interface IProps {
    sectionActivities: IActivitesBySection;
    handleAddActivity: (sectionId: string) => void
}


const SectionActivitiesContainer: FC<IProps> = ({sectionActivities, handleAddActivity}) => {
  return (
    <SectionActivitiesView  handleAddActivity={handleAddActivity} sectionId={sectionActivities.id} sectionName={sectionActivities.title} activities={sectionActivities.activities} />
  )
}

export default SectionActivitiesContainer