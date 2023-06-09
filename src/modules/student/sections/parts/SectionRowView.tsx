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
        <td colSpan={4} className="pb-4 pt-4 pl-4">
            <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-accentColor-200">
                    <BookOpenIcon className="w-3 h-3" />
                </div>
                <div className="text-base text-header ml-4">
                    {/* TODO: link to section */}
                    {section?.title}
                </div>
            </div>
        </td>
        <td colSpan={2} className="pb-4 pt-4">
            <div className="text-base text-subHeader">
                {section?.shortcode}
            </div>
        </td>
        <td colSpan={2} className="pb-4 pt-4">
            <div className="flex flex-col items-start">
                <p className="font-light tracking-widest   text-header text-base">{section?.activities?.length}</p>
            </div>
        </td>
        <td colSpan={4} className="pb-4 pt-4 pr-4">
            <div className="flex flex-col items-start">
                <p className="font-light tracking-widest   text-header text-base">{section?.teacher?.user.name}</p>
            </div>
        </td>
    </tr>
  )
}

export default SectionRowView