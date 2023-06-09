import { ITeacherSection } from "@/types/types"
import { FC } from "react"
import { BookOpenIcon, TrashIcon } from '@heroicons/react/24/solid'
import AvatarList from "@/components/avatar/AvatarList";
import clsx from "clsx";

interface IProps {
    section: ITeacherSection;
    handleSelectSection: (id:string) => void
    oddRow: boolean;
}

const SectionRowView: FC <IProps> = ({section, handleSelectSection, oddRow}) => {
  return (
    <tr className={clsx("border-b border-light-300", oddRow ? "bg-light-300 bg-opacity-50" : "bg-transparent")}>
        <td colSpan={3} className="pb-4 pt-4 pl-4">
            <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-accentColor-200">
                    <BookOpenIcon className="w-3 h-3" />
                </div>
                <div role="button" onClick={() => handleSelectSection(section.id)} className="text-sm font-medium text-header ml-4 hover:underline cursor-pointer">
                    {/* TODO: link to section */}
                    {section.title}
                </div>
            </div>
        </td>
        <td colSpan={2} className="pb-4 pt-4">
            <div className="text-sm font-medium text-header">
                {section.shortcode}
            </div>
        </td>
        <td colSpan={2} className="pb-4 pt-4">
            <div className="text-sm font-medium text-header">
                {section.accessCode}
            </div>
        </td>
        <td colSpan={2} className="pb-4 pt-4">
            <div className="flex flex-col items-start">
                <p className="tracking-widest font-medium  text-subHeader text-sm">{section.activities.length}</p>
                {/* <p className="text-subHeader opacity-60 text-sm">Activities</p> */}
            </div>
        </td>
        <td colSpan={1} className="pb-4 pt-4">
            <div className="flex flex-col items-start">
                <p className="font-medium tracking-widest   text-subHeader text-sm">{section.students.length}</p>
                {/* <p className="text-subHeader opacity-60 text-sm">Students</p> */}
            </div>
        </td>
        <td colSpan={3} className="pb-4 pt-4">
            <div className="">
                <AvatarList userList={section?.students?.map(student => student.user)} maxUsers={5} />
            </div>
        </td>
        <td colSpan={2} className="pb-4 pt-4 text-sm font-medium">
            {section.isOnline ? <span className="text-green-600">ONLINE</span>: <span className="text-subHeader">OFFLINE</span>}
        </td>
        <td colSpan={1} className="pb-4 pt-4">
            <TrashIcon className="w-5 h-5 text-red-600 cursor-pointer hover:scale-105" />
        </td>
    </tr>
  )
}

export default SectionRowView