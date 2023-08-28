import Avatar from "@/components/avatar/Avatar";
import ProglangLogo from "@/components/logos/ProglangLogo";
import { ISection } from "@/types/types"
import { ClockIcon, CommandLineIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"
import duration from "dayjs/plugin/duration"
import Tooltip from "@/components/tooltip/Tooltip";
import Link from "next/link";
import { CodeBracketIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { ChevronDoubleRightIcon, PencilIcon } from "@heroicons/react/24/solid";
dayjs.extend(localizedFormat)
dayjs.extend(duration)

interface IProps {
    section: ISection;
}

const SectionFullView: FC<IProps> = ({section}) => {
  return (
    <div className="flex flex-col w-full h-full px-8 pt-8 overflow-hidden bg-light-100">
        <div className="flex-shrink-0 w-full pb-8 border-b rounded border-light-300 h-80">
            <Image style={{height: "100%", width: "100%", objectFit: "contain"}} src={section?.coverImage} alt="" width={720} height={450} />
        </div>
        <div className="flex-1 w-full pt-4 pb-6 overflow-y-auto">
            <h2 className="text-3xl font-semibold text-header">{section?.title}</h2>
            <p className="mt-4 text-base font-normal text-subHeader text-opacity-70">{section?.description}</p>
            <div className="flex items-center justify-start gap-3 mt-4">
                <Avatar image={section?.teacher?.user.profileUrl} name={section?.teacher?.user.name} />
                <div>
                    <h5 className="text-sm font-medium text-dark-100">{section?.teacher?.user.name}</h5>
                    <p className="text-xs font-normal text-subHeader text-opacity-70">Instructor</p>
                </div>
            </div>
            <div className="w-full mt-6">
                <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium text-header">Section activities</h4>
                    <p className="text-sm text-subHeader text-opacity-70">{section?.activities.length} activities</p>
                </div>
                <ul className="flex flex-col w-full gap-4 mt-6">
                    {
                        section?.activities?.map((activity) => (
                            <li className="w-full min-h-[100px] flex flex-nowrap rounded-lg border overflow-hidden border-light-300" key={activity?.id}>
                                <div className="flex-shrink-0 w-full max-w-[150px] flex items-center justify-center bg-blue-300">
                                    <CodeBracketIcon className="w-20 h-20 text-light-300" />
                                </div>
                                <div className="flex-1 p-4">
                                    <div className="flex items-center gap-1 mb-2 flex-nowrap">
                                        {
                                            !!activity?.lang &&
                                            <div title={`${activity?.lang} programming language`}>
                                            <ProglangLogo size="24" lang={activity?.lang}/>
                                            </div>
                                        }
                                        <Tooltip size="w-48" content={`${dayjs(activity?.closeDate).diff(dayjs(), 'day').toString()} days left before this activity will be locked`}>
                                            <ClockIcon className="w-5 h-5" />
                                        </Tooltip>
                                    </div>
                                    <h5 className="text-sm font-medium text-dark-100">{activity?.title}</h5>
                                    <p className="mt-2 text-xs font-medium text-subHeader text-opacity-70">{activity?.shortDescription}</p>
                                </div>
                                <div className="flex items-center flex-shrink-0 px-4">
                                    <Link href={`/activities/${activity?.id}`} className="flex items-center justify-center w-10 h-10 p-1 bg-blue-300 rounded-full">
                                        <ChevronDoubleRightIcon className="w-6 h-6 text-light-100" />
                                    </Link>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    </div>
  )
}

export default SectionFullView