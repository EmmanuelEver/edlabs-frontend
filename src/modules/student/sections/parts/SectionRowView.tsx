import { ISection } from "@/types/types"
import { FC } from "react"
import { BookOpenIcon } from '@heroicons/react/24/solid'
import clsx from "clsx";

interface IProps {
    section: ISection;
    oddRow: boolean;
}

const SectionRowView: FC <IProps> = ({section, oddRow}) => {
  return (
    <tr className={clsx("border-b border-light-300", !oddRow ? "bg-light-300 bg-opacity-50" : "bg-transparent")}>
        <td colSpan={4} className="pt-2 pb-2 pl-4">
            <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accentColor-200">
                    <BookOpenIcon className="w-3 h-3" />
                </div>
                <div className="ml-4 text-xs font-medium text-header">
                    {/* TODO: link to section */}
                    {section?.title}
                </div>
            </div>
        </td>
        <td colSpan={2} className="pt-2 pb-2">
            <div className="text-xs font-medium text-header">
                {section?.shortcode}
            </div>
        </td>
        <td colSpan={2} className="pt-2 pb-2">
            <div className="flex flex-col items-start">
                <p className="text-xs font-light tracking-widest text-header">{section?.activities?.length}</p>
            </div>
        </td>
        <td colSpan={4} className="pt-2 pb-2 pr-4">
            <div className="flex flex-col items-start">
                <p className="text-xs font-light tracking-widest text-header">{section?.teacher?.user.name}</p>
            </div>
        </td>
    </tr>
  )
}

export default SectionRowView