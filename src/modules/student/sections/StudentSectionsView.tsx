import JoinSectionContainer from "@/components/joinSection/JoinSectionContainer";
import { ISection } from "@/types/types"
import { Tab, Transition } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import { FC, Fragment, useMemo } from "react"
import SectionFullView from "./parts/SectionFullView";
import SectionRowView from "./parts/SectionRowView";

interface IProps {
    sections: ISection[];
    activeSections: number;
    selectedSection: ISection | null;
    selectSection: (id: string) => void;
}

const StudentSectionsView: FC<IProps> = ({ sections, activeSections, selectedSection, selectSection }) => {
    const activeSectionList = useMemo(() => {
        if (sections) {
            return sections.filter((section) => section.isOnline)
        }
        return []
    }, [sections])
    return (
        <div className="h-full">
            <div className="flex items-center justify-between">
                {/* <div className="flex">
                <p className="text-sm font-semibold">
                    <span className="text-accentColor-100">ACTIVE:  </span>
                    <span className="ml-2 text-subHeader">{activeSections} SECTIONS</span>
                </p>
            </div> */}
                {/* <h1 className="text-2xl font-semibold text-header">Sections</h1>
            <JoinSectionContainer /> */}
            </div>
            {/* <div className="mt-6">
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
        </div> */}
            <div className="flex w-full h-full flex-nowrap">
                <div className="w-5/12 px-6 py-6">
                    <h1 className="text-2xl font-semibold text-header">Sections</h1>
                    <Tab.Group defaultIndex={0}>
                        <div className="flex items-center justify-between mt-6">
                            <Tab.List>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button className={clsx("text-base p-1 mr-4 font-medium transition-colors", selected ? "text-dark-100" : "text-subHeader text-opacity-70")}>All</button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button className={clsx("text-base p-1 mr-4 font-medium transition-colors", selected ? "text-dark-100" : "text-subHeader text-opacity-70")}>Active</button>
                                    )}
                                </Tab>
                            </Tab.List>
                            <JoinSectionContainer />
                        </div>
                        <Tab.Panels className="mt-4">
                            <Tab.Panel>
                                <ul className="flex flex-col w-full gap-4 mt-4 list-none">
                                    {
                                        sections?.map((section, idx) => (
                                            <li role="button" onClick={() => selectSection(section.id)} key={section.id} className="cursor-pointer">
                                                <div className="rounded pl-4 pb-4 w-full min-h-[100px] flex flex-nowrap bg-light-100 pt-4 shadow-md hover:shadow-lg transition-shadow">
                                                    <div className="flex-shrink-0 max-w-[150px] bg-accentColor-200 max-h-[150px]">
                                                        <Image style={{ objectFit: "cover", width: "100%", height: "100%" }} alt="" src={section?.coverImage} width={360} height={240} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="p-4 ">
                                                            <h3 className="text-base font-semibold text-body ">{section.title}</h3>
                                                            <p className="mt-4 text-sm font-medium text-subHeader text-opacity-70">{section.description}</p>
                                                        </div>
                                                        <div className="inline-block float-right p-2 mx-4 text-xs rounded bg-opacity-30 bg-slate-300 text-subHeader text-opacity-70">
                                                            {section?.activities?.length} Activities
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Tab.Panel>
                            <Tab.Panel>
                                <ul className="flex flex-col w-full gap-4 mt-4 list-none">
                                    {
                                        activeSectionList?.map((section) => (
                                            <li role="button" onClick={() => selectSection(section.id)} key={section.id} className="cursor-pointer">
                                                <div className="rounded pl-4 pb-4 w-full min-h-[100px] flex flex-nowrap bg-light-100 pt-4 shadow-md hover:shadow-lg transition-shadow">
                                                    <div className="flex-shrink-0 max-w-[150px] bg-accentColor-200 max-h-[150px]">
                                                        <Image style={{ objectFit: "cover", width: "100%", height: "100%" }} alt="" src={section?.coverImage} width={360} height={240} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="p-4 ">
                                                            <h3 className="text-base font-semibold text-body ">{section.title}</h3>
                                                            <p className="mt-4 text-sm font-medium text-subHeader text-opacity-70">{section.description}</p>
                                                        </div>
                                                        <div className="inline-block float-right p-2 mx-4 text-xs rounded bg-opacity-30 bg-slate-300 text-subHeader text-opacity-70">
                                                            {section?.activities?.length} Activities
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>

                </div>
                <div className="w-7/12 h-full">
                    <Transition
                        className="w-full h-full"
                        show={!!selectedSection}
                        enter='transform transition ease-in-out duration-500 sm:duration-700'
                        enterFrom='translate-x-full'
                        enterTo='translate-x-0'
                        leave='transform transition ease-in-out duration-500 sm:duration-700'
                        leaveFrom='translate-x-0'
                        leaveTo='translate-x-full'
                    >
                        <SectionFullView section={selectedSection} />
                    </Transition>
                </div>
            </div>
        </div>
    )
}

export default StudentSectionsView