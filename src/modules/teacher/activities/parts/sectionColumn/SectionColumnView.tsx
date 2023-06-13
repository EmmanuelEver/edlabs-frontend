import SectionColumn from "@/components/sectionColumn/SectionColumn";
import { IActivitySummary } from "@/types/types"
import { FC } from "react"
import Link from "next/link";
import { DocumentDuplicateIcon, PlusIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"
dayjs.extend(localizedFormat)
import ActivityCard from "@/components/cards/ActivityCard";


interface IProps {
  activities: any[];
  sectionName: string;
  sectionId: string;
  handleAddActivity: (sectionId: string) => void
}

const SectionActivitiesView: FC<IProps> = ({activities, sectionName, sectionId, handleAddActivity}) => {
  return (
    <SectionColumn>
      <div className="flex items-start justify-between px-6">
        <h3 title={sectionName} className="text-sm font-medium tracking-wider uppercase truncate text-subHeader text-opacity-70">{sectionName}</h3>
        <div className="ml-0.5 text-sm">({activities.length})</div>
        {/* <div className="w-6 h-6 ml-1">
          <InformationCircleIcon role="button" title="Section Information" className="cursor-pointer text-body" />
        </div> */}
      </div>
      <div className="flex flex-col flex-1 mt-6 overflow-y-auto w-72">
          <div className="flex-shrink-0 w-full px-2">
            <button onClick={() => handleAddActivity(sectionId)} className="flex items-center justify-center w-full h-24 border border-blue-200 border-dashed rounded hover:brightness-95 bg-light-200">
              <PlusIcon className="w-6 h-6 -ml-2 text-blue-200"/>
              <span className="ml-2 font-bold text-blue-200">Add activity</span>
            </button>
          </div>
          <div className="w-full px-1.5 mt-4 flex-1 overflow-y-auto flex flex-col gap-4 ">
              {
                  activities?.map(activity => (
                      <Link href={`/activities?selected=${activity.id}`} key={activity.id}>
                        <ActivityCard>
                          <h3 title={activity.title} className="text-base font-bold whitespace-normal text-header">{activity.title}</h3>
                          <p title={activity.shortDescription} className="w-full mt-2 text-sm text-body text-overflow-clamp">{activity.shortDescription}</p>
                          {/* <div className="flex items-center mt-4 text-sm text-body"> 
                            <CalendarDaysIcon className="w-5 h-5" />
                            <p className="ml-1 font-medium text-header">{ dayjs(activity.createdAt).format("LLLL")}</p>
                          </div> */}
                          {
                            activity?.sessions.length > 0 &&
                            <div className="flex items-center mt-4 text-sm text-body"> 
                              <DocumentDuplicateIcon className="w-5 h-5" />
                              <Link href={`/outputs/activity?activity=${activity.id}`} className="ml-1 font-medium hover:underline text-header">View student outputs</Link>
                            </div>
                          }
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