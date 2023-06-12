import { FC } from "react"
import { ISection } from "@/types/types"
import SectionColumnView from "./parts/SectionColumnView"
import JoinSectionContainer from "@/components/joinSection/JoinSectionContainer"
import useFetch from "@/hooks/useFetch"

interface IProps {
    activities: ISection[] | undefined;
    showAddModal: boolean;
    handleSetShowModal: (val: boolean) => void
}

const StudentActivitiesView: FC<IProps> = ({ activities, showAddModal, handleSetShowModal }) => {
    return (
        <div className="w-full h-full overflow-hidden">
            <div className="w-full px-6">
                <div className="flex items-center justify-between w-full pt-6">
                    <JoinSectionContainer />
                </div>
            </div>
            <div className="flex w-auto h-full px-6 pt-8 pb-4 overflow-auto flex-nowrap">
                {
                    activities?.map((section:ISection) => (
                        <SectionColumnView key={section.id} section={section} />
                    ))
                }
            </div>
        </div>
    )
}

export default StudentActivitiesView