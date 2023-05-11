import { ITeacherSection } from "@/types/types"
import { FC } from "react"
import { BookOpenIcon } from '@heroicons/react/24/solid'
import AvatarList from "@/components/avatar/AvatarList";

interface IProps {
    section: ITeacherSection;
    handleSelectSection: (id:string) => void
}

const SectionRowView: FC <IProps> = ({section, handleSelectSection}) => {
  return (
    <tr className="border-b border-light-300">
        <td colSpan={3} className="pb-4 pt-4">
            <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-accentColor-200">
                    <BookOpenIcon className="w-3 h-3" />
                </div>
                <div role="button" onClick={() => handleSelectSection(section.sectionCode)} className="text-base text-header ml-4 hover:underline cursor-pointer">
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
                <p className="font-light tracking-widest   text-header text-base">{section.totalActivities}</p>
                <p className="text-subHeader opacity-60 text-sm">Activities</p>
            </div>
        </td>
        <td colSpan={2} className="pb-4 pt-4">
            <div className="flex flex-col items-start">
                <p className="font-light tracking-widest   text-header text-base">{section.totalStudents}</p>
                <p className="text-subHeader opacity-60 text-sm">Students</p>
            </div>
        </td>
        <td colSpan={3} className="pb-4 pt-4">
            <div className="">
                <AvatarList userList={section.studentsInfo} maxUsers={5} />
            </div>
        </td>
    </tr>
  )
}

export default SectionRowView