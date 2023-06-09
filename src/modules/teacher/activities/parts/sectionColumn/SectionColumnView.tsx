import SectionColumn from "@/components/sectionColumn/SectionColumn";
import { IActivitySummary } from "@/types/types"
import { FC } from "react"
import Link from "next/link";
import { InformationCircleIcon, PlusIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"
dayjs.extend(localizedFormat)
import ActivityCard from "@/components/cards/ActivityCard";


interface IProps {
  activities: IActivitySummary[];
  sectionName: string;
  sectionId: string;
  handleAddActivity: (sectionId: string) => void
}

const SectionActivitiesView: FC<IProps> = ({activities, sectionName, sectionId, handleAddActivity}) => {
  return (
    <SectionColumn>
      <div className="flex items-start justify-between px-6">
        <h3 className="text-sm font-medium uppercase text-subHeader  tracking-wider text-opacity-70">{sectionName} <span className="ml-0.5">({activities.length})</span></h3>
        <div className="w-6 h-6 ml-1">
          <InformationCircleIcon role="button" title="Section Information" className="text-body cursor-pointer" />
        </div>
      </div>
      <div className="mt-6 flex-1 overflow-y-auto flex flex-col w-72">
          <div className="w-full px-2 flex-shrink-0">
            <button onClick={() => handleAddActivity(sectionId)} className="h-24 w-full hover:brightness-95 bg-light-200 flex items-center justify-center border border-dashed rounded border-blue-200">
              <PlusIcon className="w-6 h-6 text-blue-200 -ml-2"/>
              <span className="text-blue-200 font-bold ml-2">Add activity</span>
            </button>
          </div>
          <div className="w-full px-1.5 mt-4 flex-1 overflow-y-auto flex flex-col gap-4 ">
              {
                  activities?.map(activity => (
                      <Link href={`/activities?selected=${activity.id}`} key={activity.id}>
                        <ActivityCard>
                          <h3 title={activity.title} className="text-header text-base font-bold whitespace-normal">{activity.title}</h3>
                          <p title={activity.shortDescription} className="mt-2 text-sm text-body w-full text-overflow-clamp">{activity.shortDescription}</p>
                          <div className="mt-4 text-sm text-body flex items-center"> 
                            <CalendarDaysIcon className="w-5 h-5" />
                            <p className="font-normal text-subHeader ml-1">{ dayjs(activity.createdAt).format("LLLL")}</p>
                          </div>
                        </ActivityCard>
                      </Link>
                  ))
              }
              
          </div>
      </div>
    </SectionColumn>
  )
}

export default SectionActivitiesView