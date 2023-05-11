import JoinSectionContainer from "@/components/joinSection/JoinSectionContainer";
import { ISection } from "@/types/types"
import { FC } from "react"
import SectionRowView from "./parts/SectionRowView";

interface IProps {
    sections: ISection[];
    activeSections: number;
}

const StudentSectionsView: FC<IProps> = ({sections, activeSections}) => {
  return (
    <div className="py-6 px-10">
        <div className="flex items-center justify-between">
            <div className="flex">
                <p className="text-sm font-semibold">
                    <span className="text-accentColor-100">ACTIVE:  </span>
                    <span className="text-subHeader ml-2">{activeSections} SECTIONS</span>
                </p>
            </div>
            <JoinSectionContainer />
        </div>
        <div className="mt-6">
            <table className="w-full table-fixed">
                <tbody>
                {
                    sections.map(section => (
                        <SectionRowView key={section.internal_id} section={section} />
                    ))
                }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default StudentSectionsView