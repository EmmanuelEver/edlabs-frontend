import SectionColumn from "@/components/sectionColumn/SectionColumn"
import { IActivitySummary, ISection } from "@/types/types";
import Link from "next/link";
import { FC } from "react";
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import ActivityCardView from "./ActivityCardView";

interface IActivitesBySection {
  section: string;
  readonly internal_id: string;
  activites: IActivitySummary[]
}

interface IProps {
  section: ISection;
}

const SectionColumnView: FC<IProps> = ({section}) => {
  return (
    <SectionColumn>
      <div className="flex items-center justify-between px-6">
        <h3 className="text-sm font-medium tracking-wider uppercase truncate text-subHeader text-opacity-70">{section.title}</h3>
        <span className="ml-0.5">({section.activities.length})</span>
        {/* <div className="w-6 h-6 ml-1">
          <InformationCircleIcon role="button" title="Section Information" className="cursor-pointer text-body" />
        </div> */}
      </div>
      <div className="flex-1 mt-6 overflow-y-auto">
          <div className="w-72 px-1.5 pb-20 h-full overflow-y-auto flex flex-col gap-6">
              {
                  section?.activities?.map(activity => (
                      <Link href={`/activities/${activity.id}`} key={activity.id}>
                        <ActivityCardView  activity={activity} />
                      </Link>
                  ))
              }
          </div>
      </div>
    </SectionColumn>
  )
}

export default SectionColumnView