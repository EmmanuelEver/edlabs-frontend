
import { FC } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"
dayjs.extend(localizedFormat)
import ActivityCard from "@/components/cards/ActivityCard"
import { IActivitySummary } from "@/types/types";

interface IProps {
    activity: IActivitySummary;
}

const ActivityCardView: FC<IProps> = ({activity}) => {
  return (
    <ActivityCard>
        <h3 title={activity.title} className="text-header text-base font-bold">{activity.title}</h3>
        <p className="mt-4 text-sm text-body"> <span className="font-bold text-subHeader ml-1">{dayjs(activity.closeDate).format("LLLL")}</span></p>
    </ActivityCard>
  )
}

export default ActivityCardView