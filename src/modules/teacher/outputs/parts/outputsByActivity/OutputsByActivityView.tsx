import { ArrowLeftIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import LoadingComponent from "@/components/loader/LoadingComponent";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link"
import { FC, useMemo } from "react"
import Avatar from '@/components/avatar/Avatar';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import clsx from 'clsx';
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

ChartJS.register(ArcElement, Tooltip, Legend);

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
    averageEqScore: string;
    sessions: any[] | null;
}

const OutputsByActivityView: FC<IProps> = ({ data, sessions, isLoading, revalidate, isValidating, averageEqScore }) => {
    function getLineChanges(prevValue: string, currentValue: string) {
        const prevValueArray = prevValue.split(/\r?\n/)
        const currentValueArray = currentValue.split(/\r?\n/)

        const maxLength = Math.max(prevValueArray.length, currentValueArray.length);
        const unequalIndices = [];

        for (let i = 0; i < maxLength; i++) {
            if (prevValueArray[i] !== currentValueArray[i]) {
                unequalIndices.push(i + 1);
            }
        }
        return unequalIndices
    }

    function getGeqs(eqScores: any[]) {
        const totalScore = eqScores.reduce((a, score) => {
            if(!isNaN(score.eqScore)) {
                return a + score.eqScore
            }
            return a
        }, 0)

        return parseFloat((totalScore / eqScores.length).toString()).toFixed(3)
    }


    return (
        <div className="flex flex-col w-full h-full overflow-y-auto">
            {
                isLoading && <LoadingComponent />
            }
            <div className="flex items-start justify-between flex-shrink-0 pt-4 pb-2 shadow-sm flex-nowrap bg-light-200">
                <div className='pr-4'>
                    <Link className="flex items-center w-fit text-subHeader hover:text-body hover:underline" href={`/outputs`}>
                        <ArrowLeftIcon className="w-4 h-4" />
                        <span className="ml-1 text-xs font-light">All Outputs</span>
                    </Link>
                    <h3 className="text-xl font-medium text-header">{data?.title}</h3>
                    <p className="mt-2 text-sm text-subHeader">{data?.shortDescription}</p>
                </div>
                <div className='flex flex-col items-end pr-2'>
                    <button className='flex items-center gap-2 px-4 py-2 rounded-sm flex-nowrap bg-dark-header' onClick={() => revalidate()} disabled={isValidating || isLoading}>
                        <ArrowPathIcon className={clsx('w-6 h-6 text-light-200', isValidating ? "animate-spin" : "")} />
                        <span className='text-sm leading-none text-light-200'>{isValidating ? "Refreshing" : "Refresh data"}</span>
                    </button>
                    <p className='mt-2 text-sm font-normal text-body'>Average EQ score: <span className='text-base font-medium'>{averageEqScore}</span></p>
                </div>
            </div>
            <div className='flex-1 overflow-y-auto'>
                {/* {
                    data?.sessions?.map((session: any) => (
                        <div key={session?.id} className="w-full p-4 mt-4 overflow-hidden border shadow-sm bg-light-400">
                            <div className="flex items-start justify-between">
                                <div className='flex items-center'>
                                    <Avatar image={session?.student.user.profileUrl} name={session?.student.user.name} />
                                    <div className="flex-col items-center">
                                        <Link href={`/outputs/${session?.student.user.id}?activityId=${data.id}`} className="ml-2 text-sm font-medium leading-tight hover:underline text-header">{session?.student.user.name}</Link>
                                        <p className="ml-2 text-xs cursor-pointer text-subHeader">{session?.student.user.email}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col items-center justify-center'>
                                    <p className="text-sm text-header">{session?.compilations?.length} Compilation/s</p>
                                </div>
                            </div>
                            {
                                session.compilations.length > 0 ?
                                    <div className="relative pb-6 mt-4">
                                        <Carousel draggable={false} showDots renderDotsOutside dotListClass='flex-wrap w-full' responsive={responsive}>
                                            {
                                                session.compilations.map((compilation: any, idx: number) => (
                                                    <div key={compilation.id} className="flex flex-col w-full px-2 overflow-y-hidden">
                                                        <div className='overflow-y-auto h-[300px] codeblock-wrapper'>
                                                            <CodeBlock
                                                                text={compilation.codeValue}
                                                                language={data?.lang}
                                                                showLineNumbers={true}
                                                                theme={atomOneDark}
                                                                highlight={idx === 0 ? "" : getLineChanges(session.compilations[idx - 1].codeValue, compilation.codeValue).join(",")}
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="w-full h-64 p-2 mt-4 overflow-hidden overflow-x-auto overflow-y-auto text-left align-middle transition-all transform rounded-md shadow-xl bg-dark-header">
                                                                {
                                                                    compilation.error &&
                                                                    compilation?.LineError > 0 ?
                                                                        <p className='mb-4 text-red-300'>
                                                                            {`Line error: ${compilation.LineError} ${compilation.errorType ? `(${compilation.errorType})` : ""}`}
                                                                        </p>
                                                                        :
                                                                        null
                                                                }
                                                                <p className='mb-2 font-bold text-light-300'>
                                                                            Compile result: 
                                                                        </p>
                                                                <pre className='whitespace-pre-wrap text-light-200'>
                                                                    {compilation.compileResult}
                                                                </pre>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </Carousel>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    ))
                } */}

                <table className="w-full mt-4 table-fixed">
                    <thead>
                        <tr>
                        <th colSpan={4} className='pb-2 pl-2 text-sm font-light text-left text-subHeader'>STUDENT</th>
                        <th colSpan={2} className='pb-2 text-sm font-light text-left text-subHeader'>EQ SCORE</th>
                        <th colSpan={2} className='pb-2 text-sm font-light text-left text-subHeader'>COMPILATIONS</th>
                        <th colSpan={2} className='pb-2 text-sm font-light text-left text-subHeader'>LAST UPDATED</th>
                        <th colSpan={2} className='pb-2 text-sm font-light text-left text-subHeader'>GENERAL EQ SCORE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sessions?.map((session: any) => (
                                <tr key={session?.id}>
                                    <td colSpan={4} className="pl-2">
                                        <div className='flex items-center'>
                                            <Avatar image={session?.student.user.profileUrl} name={session?.student.user.name} />
                                            <div className="flex-col items-center">
                                                <Link href={`/outputs/${session?.student.user.id}?activityId=${data.id}`} className="ml-2 text-sm font-medium leading-tight hover:underline text-header">{session?.student.user.name}</Link>
                                                <p className="ml-2 text-xs cursor-pointer text-subHeader">{session?.student.user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td colSpan={2}> 
                                        {parseFloat(session?.eqScore).toFixed(3)}
                                    </td>
                                    <td colSpan={2}> 
                                        {session?.compilations?.length}
                                    </td>
                                    <td colSpan={2}> 
                                        {dayjs(session.lastUpdated).fromNow()}
                                    </td>
                                    <td colSpan={2}> 
                                        {getGeqs(session?.student?.activitySessions)}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OutputsByActivityView