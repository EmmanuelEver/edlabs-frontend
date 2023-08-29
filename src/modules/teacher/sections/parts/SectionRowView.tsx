import { ITeacherSection } from "@/types/types"
import { FC } from "react"
import { BookOpenIcon, TrashIcon } from '@heroicons/react/24/solid'
import AvatarList from "@/components/avatar/AvatarList";
import clsx from "clsx";

interface IProps {
    section: ITeacherSection;
    handleSelectSection: (id:string) => void
    oddRow: boolean;
    deleteSection: (id:string, name: string) => void;
    isDeleting: boolean;
}

const SectionRowView: FC <IProps> = ({section, handleSelectSection, oddRow, deleteSection, isDeleting}) => {
  return (
    <tr className={clsx("border-b border-light-300", oddRow ? "bg-light-300 bg-opacity-50" : "bg-transparent")}>
        <td colSpan={3} className="pt-2 pb-2 pl-4">
            <div className="flex items-center">
                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full bg-accentColor-200">
                    <BookOpenIcon className="w-3 h-3 text-blue-300" />
                </div>
                <div role="button" onClick={() => handleSelectSection(section.id)} className="ml-4 text-xs font-medium cursor-pointer text-header hover:underline">
                    {/* TODO: link to section */}
                    {section.title}
                </div>
            </div>
        </td>
        <td colSpan={2} className="pt-2 pb-2">
            <div className="text-xs font-medium text-header">
                {section.shortcode}
            </div>
        </td>
        <td colSpan={2} className="pt-2 pb-2">
            <div className="text-xs font-medium text-header">
                {section.accessCode}
            </div>
        </td>
        <td colSpan={2} className="pt-2 pb-2">
            <div className="flex flex-col items-start">
                <p className="text-xs font-medium tracking-widest text-subHeader">{section.activities?.length}</p>
            </div>
        </td>
        <td colSpan={4} className="pt-2 pb-2">
            <div className="flex items-center gap-4">
                {/* <p className="text-xs font-medium tracking-widest text-subHeader">{section.students?.length}</p> */}
                <AvatarList userList={section?.students?.map(student => student.user)} maxUsers={5} />
            </div>
        </td>
        
        <td colSpan={2} className="pt-2 pb-2 text-xs font-medium">
            {section.isOnline ? <span className="text-green-600">ONLINE</span>: <span className="text-subHeader">OFFLINE</span>}
        </td>
        <td colSpan={1} className="pt-2 pb-2">
            <button disabled={isDeleting} className={isDeleting ? "cursor-wait" : ""}>
                <TrashIcon onClick={() => deleteSection(section.id, section.title)} className="w-5 h-5 text-red-600 cursor-pointer hover:scale-105" />
            </button>
        </td>
    </tr>
  )
}

export default SectionRowView