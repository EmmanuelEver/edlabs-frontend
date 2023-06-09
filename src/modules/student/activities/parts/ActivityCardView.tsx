import ActivityCard from "@/components/cards/ActivityCard"
import { FC } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"
dayjs.extend(localizedFormat)
import { ClockIcon } from '@heroicons/react/24/outline';

import { IActivitySummary } from "@/types/types";


interface IProps {
    activity: IActivitySummary;
}

const ActivityCardView: FC<IProps> = ({activity}) => {
  return (
    <ActivityCard>
        <h3 title={activity.title} className="text-header text-base font-bold">{activity.title}</h3>
        <p title={activity.shortDescription} className="mt-2 text-sm text-body w-full text-overflow-clamp">{activity.shortDescription}</p>
        <div className="flex items-center mt-4">
          <ClockIcon className="w-5 h-5" />
          <p className="text-sm text-body"> <span className="font-bold text-subHeader ml-1">{dayjs(activity.closeDate).format("LLLL")}</span></p>
        </div>
    </ActivityCard>
  )
}

export default ActivityCardView