import { IActivitySummary } from "@/types/types";
import { FC, PropsWithChildren } from "react"
import ActivityCard from "../cards/ActivityCard";

interface IActivitesBySection {
    section: string;
    readonly internal_id: string;
    activites: IActivitySummary[]
}


const SectionColumn: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="mr-6 w-72 flex-shrink-0 flex flex-col">
            {children}
        </div>
    )
}

export default SectionColumn