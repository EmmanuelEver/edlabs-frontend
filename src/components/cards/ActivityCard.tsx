import { IActivitySummary } from "@/types/types"
import { FC } from "react";

interface IProps {
    activity: IActivitySummary;
}


const ActivityCard: FC<IProps> = ({activity}) => {
  return (
    <article className="rounded-lg shadow-md p-5 bg-light-100 w-full hover:shadow-lg cursor-pointer transition-shadow">
        <h3 title={activity.activity_name} className="text-header text-base font-bold">{activity.activity_name}</h3>
        <p className="mt-4 text-sm text-body"> <span className="font-bold text-subHeader ml-1">{activity.due_date}</span></p>
    </article>
  )
}

export default ActivityCard