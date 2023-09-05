import LoadingComponent from "@/components/loader/LoadingComponent";
import "react-multi-carousel/lib/styles.css";
import { FC } from "react"
import Avatar from '@/components/avatar/Avatar';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from "chart.js";
import clsx from 'clsx';
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Doughnut } from 'react-chartjs-2';
import Link from "next/link";
import { DocumentChartBarIcon, ExclamationCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Tooltip from "@/components/tooltip/Tooltip";
dayjs.extend(relativeTime)

ChartJS.register(ArcElement, ChartTooltip, Legend);

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 2
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


interface IProps {
    data: any;
    isLoading: boolean;
    revalidate: any;
    isValidating: boolean;
    averageEqScore: number;
    averageCompilations: number;
    sessions: any[] | null;
    errorTypes: any[] | null;
}

const OutputsByActivityView: FC<IProps> = ({ data, isLoading, sessions, errorTypes, isValidating, averageEqScore, averageCompilations }) => {

    return (
        <div className="relative flex w-full h-full overflow-hidden flex-nowrap">
            {
                isLoading && <LoadingComponent />
            }
            <div className="flex-shrink-0 w-3/12 min-w-[320px] py-4 pr-2 pl-4 overflow-y-auto">
                <div className="sticky top-0 p-4 overflow-y-auto rounded-md shadow bg-light-100">
                    <div className="flex items-start justify-between gap-4">
                        <h2 className="text-xl font-medium text-blue-300">{data?.title}</h2>
                        <Link href={`/activities?selected=${data?.id}`}>
                            <PencilSquareIcon title="Edit activity" className="w-5 h-5 text-blue-300" />
                        </Link>
                    </div>
                    <p className="mt-2 text-sm text-subHeader text-opacity-70">{data?.shortDescription}</p>
                </div>
                {
                    averageCompilations !== null &&
                    <div className="flex items-center justify-center p-4 mt-4 rounded-md shadow bg-light-100">
                        <div className="flex flex-col items-center">
                            <h4 className="text-4xl font-medium text-blue-300">{averageCompilations}</h4>
                            <p className="mt-2 text-sm text-subHeader text-opacity-70">Avg. Compilations</p>
                        </div>
                    </div>
                }
                <div className="flex items-center p-4 mt-4 rounded-md shadow bg-light-100">
                    <div className="w-full max-w-[200px] mx-auto">
                        <Doughnut options={{ responsive: true, maintainAspectRatio: true }} data={{ labels: ["EQ score"], datasets: [{ data: [parseFloat(averageEqScore.toFixed(3)), 1], backgroundColor: ["#192638", "#F4F7FC"] }] }} />
                    </div>
                </div>

                {
                    (!!errorTypes && errorTypes.length > 0) &&
                    <div className="p-4 mt-4 rounded-md shadow bg-light-100">
                        <div className="flex items-center gap-2">
                            <ExclamationCircleIcon className="text-blue-300 w-7 h-7" />
                            <h3 className="text-xl font-medium text-blue-300">Common errors</h3>
                        </div>
                        <ul className="flex flex-col mt-4">
                            {
                                [...errorTypes.slice(0, 5)]?.map((errorType) => (
                                    <li key={errorType.error} className="flex items-center justify-between px-4 py-2 rounded-3xl odd:bg-light-200">
                                        <p className="text-subHeader text-opacity-70">{errorType.error}</p>
                                        <p>{errorType.count}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                }
            </div>
            <div className="flex-1 w-9/12 py-4 pl-2 pr-4 overflow-y-auto">
                <div className="flex items-center w-full py-4 mb-4 rounded-md shadow bg-light-100">
                    <table className="w-full table-fixed">
                        <thead>
                            <th colSpan={6} className="pb-1 pl-4 text-xs font-normal text-left text-subHeader text-opacity-70">Student</th>
                            <th colSpan={3} className="pb-1 text-xs font-normal text-left text-subHeader text-opacity-70">EQ Score</th>
                            <th colSpan={3} className="pb-1 text-xs font-normal text-left text-subHeader text-opacity-70">Compilations</th>
                            <th colSpan={3} className="pb-1 text-xs font-normal text-left text-subHeader text-opacity-70">Last activity</th>
                            <th colSpan={1} className="pb-1 pr-4"></th>
                        </thead>
                        <tbody>
                            {
                                sessions?.map((session) => (
                                    <tr className="w-full even:bg-light-200" key={session?.id}>
                                        <td colSpan={6} className="py-1.5 pl-4">
                                            <div className="flex items-center gap-1.5">
                                                <Avatar name={session?.student?.user?.name} image={session?.student?.user?.profileUrl} />
                                                <div>
                                                    <h4 className="text-sm font-medium text-blue-300">
                                                        {session?.student?.user?.name}
                                                    </h4>
                                                    <p className="text-xs cursor-pointer text-subHeader">{session?.student.user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td colSpan={3} className="py-1.5 align-top">
                                            <p className="text-sm font-medium text-blue-300">{Number.isFinite(session?.eqScore) ? session?.eqScore?.toFixed(3) : 0}</p>
                                        </td>
                                        <td colSpan={3} className="py-1.5 align-top">
                                            <p className="text-sm font-medium text-blue-300">{session?.compilations?.length}</p>
                                        </td>
                                        <td colSpan={3} className="py-1.5 align-top">
                                            <p className="text-sm font-medium text-blue-300">{dayjs(session.lastUpdated).fromNow()}</p>
                                        </td>
                                        <td colSpan={1} className="py-1.5 align-top pr-4">
                                            <Tooltip content="output">
                                                <Link href={`/outputs/${session?.student.user.id}?activityId=${data?.id}`}>
                                                    <DocumentChartBarIcon className="w-5 h-5 text-blue-300" />
                                                </Link>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OutputsByActivityView