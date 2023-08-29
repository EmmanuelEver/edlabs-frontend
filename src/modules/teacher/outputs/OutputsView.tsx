import { Transition } from "@headlessui/react";
import { FC, Fragment } from "react"
import OutputsAllContainer from "./parts/outputsAll/OutputsAllContainer";
import OutputsByActivityContainer from "./parts/outputsByActivity/OutputsByActivityContainer";
import OutputSectionContainer from "./parts/outputSection/OutputSectionContainer";

interface IProps {
    showOutputByActivity: any;
}

const OutputsView: FC<IProps> = ({ showOutputByActivity }) => {
    return (
        <div className="relative flex w-full h-full overflow-hidden flex-nowrap">
            <OutputsAllContainer />

            <Transition
                className="w-full h-full"
                show={!!showOutputByActivity}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
            >
                <OutputSectionContainer />
            </Transition>
            {/* <div className="w-full h-full overflow-y-auto">
            {
            data?.map((section: any, idx: number) => (
                <Fragment key={section.shortcode + idx}>
                    <div className="flex w-full pb-6 border-b mt-14 first-of-type:mt-0 flex-nowrap border-light-300">
                        <div className="flex-shrink-0 w-full max-w-xs">
                            <h3 className="font-medium leading-none text-md text-header">{section?.title} <span className="ml-2">({section.shortcode})</span></h3>
                            <p className="mt-2 text-sm text-subHeader">{section.description}</p>
                            <ul className="mt-4 list-disc list-inside">
                                {
                                    section?.activities.map((activity: any) => (
                                        <li className="text-sm text-body" key={activity.title}>
                                            <Link className="hover:underline" href={`/outputs?selected=${activity.id}`}>
                                                {activity.title}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="flex-1 h-full pl-10 overflow-y-auto max-h-80">
                            <table className="w-full h-full overflow-y-auto table-fixed">
                                <thead>
                                    <tr className="border-b border-light-300">
                                        <th colSpan={4} className='pb-2 pl-6 text-xs font-light text-left text-subHeader'>NAME</th>
                                        <th colSpan={2} className='pb-2 text-xs font-light text-left text-subHeader'>OUTPUTS</th>
                                        <th colSpan={2} className='pb-2 text-xs font-light text-left text-subHeader'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        section?.students?.map((student: any) => (
                                            <tr key={student.user.id} className="border-b boder-light-400 last-of-type:border-none">
                                                <td colSpan={4} className="py-2 pl-6">
                                                    <div className="flex items-center">
                                                        <Avatar wrapperClassName="w-5 h-5 flex-shrink-0" image={student.user.profileUrl} name={student.user.name} />
                                                        <div className="flex flex-col items-start ml-2">
                                                            <h5 className="text-sm font-medium text-header">{student.user.name}</h5>
                                                            <p className="text-xs font-normal text-subHeader">{student.user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td colSpan={2}>
                                                    <p className="text-sm font-normal text-subHeader">{student?.activitySessions?.length}</p>
                                                </td>
                                                <td colSpan={2}>
                                                    <Link href={`/outputs/${student.user.id}?sectionId=${section.id}`} className="text-sm font-medium text-header">
                                                        <span>VIEW OUTPUT</span>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Fragment>
            ))
        }
        </div> */}
        </div>
    )
}

export default OutputsView