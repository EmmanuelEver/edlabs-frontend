import SectionColumn from "@/components/sectionColumn/SectionColumn"
import { IActivitySummary } from "@/types/types";
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
  section: IActivitesBySection;
}

const SectionColumnView: FC<IProps> = ({section}) => {
  return (
    <SectionColumn>
      <div className="flex items-start justify-between px-6">
        <h3 className="text-sm font-medium uppercase text-subHeader  tracking-wider text-opacity-70">{section.section} <span className="ml-0.5">({section.activites.length})</span></h3>
        <div className="w-6 h-6 ml-1">
          <InformationCircleIcon role="button" title="Section Information" className="text-body cursor-pointer" />
        </div>
      </div>
      <div className="mt-6 flex-1 overflow-y-auto">
          <div className="w-full px-1.5 h-full overflow-y-auto flex flex-col gap-6">
              {
                  section?.activites?.map(activity => (
                      <Link href={`/activities/${activity.internal_id}`} key={activity.internal_id}>
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