import ActivityCard from "@/components/cards/ActivityCard"
import { IActivitySummary } from "@/types/types";
import { FC } from "react";

interface IProps {
    activity: IActivitySummary;
}

const ActivityCardView: FC<IProps> = ({activity}) => {
  return (
    <ActivityCard>
        <h3 title={activity.activity_name} className="text-header text-base font-bold">{activity.activity_name}</h3>
        <p className="mt-4 text-sm text-body"> <span className="font-bold text-subHeader ml-1">{activity.due_date}</span></p>
    </ActivityCard>
  )
}

export default ActivityCardView