import { ISection } from "@/types/types"
import { FC } from "react"
import { BookOpenIcon } from '@heroicons/react/24/solid'

interface IProps {
    section: ISection;
}

const SectionRowView: FC <IProps> = ({section}) => {
  return (
    <tr className="border-b border-light-300">
        <td colSpan={4} className="pb-4 pt-4">
            <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-accentColor-200">
                    <BookOpenIcon className="w-3 h-3" />
                </div>
                <div className="text-base text-header ml-4">
                    {/* TODO: link to section */}
                    {section.sectionName}
                </div>
            </div>
        </td>
        <td colSpan={2} className="pb-4 pt-4">
            <div className="text-base text-subHeader">
                {section.sectionCode}
            </div>
        </td>
        <td colSpan={2} className="pb-4 pt-4">
            <div className="flex flex-col items-start">
                <p className="font-light tracking-widest   text-header text-base">{section.submittedActivities}/{section.totalActivities}</p>
                <p className="text-subHeader opacity-60 text-sm">Activities</p>
            </div>
        </td>
        <td colSpan={4} className="pb-4 pt-4">
            <div className="flex flex-col items-start">
                <p className="font-light tracking-widest   text-header text-base">{section.sectionInstructor}</p>
                <p className="text-subHeader opacity-60 text-sm">Instructor</p>
            </div>
        </td>
    </tr>
  )
}

export default SectionRowView