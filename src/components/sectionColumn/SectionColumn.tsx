import { IActivitySummary } from "@/types/types";
import { FC } from "react"
import ActivityCard from "../cards/ActivityCard";

interface IActivitesBySection {
    section: string;
    readonly internal_id: string;
    activites: IActivitySummary[]
}

interface IProps {
    section: IActivitesBySection;
}

const SectionColumn: FC<IProps> = ({ section }) => {
    return (
        <div className="mr-6 w-76 flex-shrink-0 flex flex-col">
            <h3 className="text-sm font-bold uppercase text-subHeader  tracking-wider text-opacity-70 ml-6">{section.section}</h3>
            <div className="mt-6 flex-1 overflow-y-auto">
                <div className="w-full px-1.5 h-full overflow-y-auto flex flex-col gap-6">
                    {
                        section?.activites?.map(activity => (
                            <ActivityCard key={activity.internal_id} activity={activity} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SectionColumn