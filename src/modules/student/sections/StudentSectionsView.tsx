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
    <div className="px-10 py-6">
        <div className="flex items-center justify-between">
            {/* <div className="flex">
                <p className="text-sm font-semibold">
                    <span className="text-accentColor-100">ACTIVE:  </span>
                    <span className="ml-2 text-subHeader">{activeSections} SECTIONS</span>
                </p>
            </div> */}
            <JoinSectionContainer />
        </div>
        <div className="mt-6">
            <table className="w-full table-fixed">
                <thead>
                    <tr>
                      <th colSpan={4} className='pb-2 pl-16 text-xs font-light text-left text-subHeader'>TITLE</th>
                      <th colSpan={2} className='pb-2 text-xs font-light text-left text-subHeader'>SHORTCODE</th>
                      <th colSpan={2} className='pb-2 text-xs font-light text-left text-subHeader'>ACTIVITIES</th>
                      <th colSpan={4} className='pb-2 text-xs font-light text-left text-subHeader'>INSTRUCTOR</th>
                    </tr>
                </thead>
                <tbody>
                {
                    sections?.map((section, idx) => (
                        <SectionRowView key={section.id} section={section} oddRow={idx%2 === 0}/>
                    ))
                }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default StudentSectionsView