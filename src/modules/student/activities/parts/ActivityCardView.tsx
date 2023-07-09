import ActivityCard from "@/components/cards/ActivityCard"
import { FC, useMemo } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"
import duration from "dayjs/plugin/duration"
dayjs.extend(localizedFormat)
dayjs.extend(duration)
import { ClockIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

import { IActivitySummary } from "@/types/types";
import ProglangLogo from "@/components/logos/ProglangLogo";
import Tooltip from "@/components/tooltip/Tooltip";


interface IProps {
    activity: IActivitySummary;
}

const ActivityCardView: FC<IProps> = ({activity}) => {
  const daysLeft = useMemo(() => {
    if(activity?.closeDate) {
      return dayjs(activity?.closeDate).diff(dayjs(), 'day').toString()
    }
    return ""
  }, [activity])
  return (
    <ActivityCard>
        <div className="absolute top-0.5 right-0.5 z-50 ">
          {
            activity?.sessions?.length === 0 && <PlusCircleIcon className="w-6 h-6 text-dark-header" />
          }
        </div>
        <h3 title={activity.title} className="text-base font-bold text-header">{activity.title}</h3>
        <p title={activity.shortDescription} className="w-full mt-2 text-sm text-body text-overflow-clamp">{activity.shortDescription}</p>
        <div className="flex items-center gap-1 mt-4">
          {
            !!activity?.lang &&
            <div title={`${activity?.lang} programming language`}>
              <ProglangLogo size="24" lang={activity?.lang}/>
            </div>
          }
          <Tooltip size="w-48" content={`${daysLeft} days left before this activity will be locked`}>
            <ClockIcon className="w-5 h-5" />
          </Tooltip>
        </div>
    </ActivityCard>
  )
}

export default ActivityCardView