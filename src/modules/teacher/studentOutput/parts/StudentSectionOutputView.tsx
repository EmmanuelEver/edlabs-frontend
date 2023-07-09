import useFetch from "@/hooks/useFetch"
import { useRouter } from "next/router"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import Link from "next/link";
import { ArrowLeftIcon, CommandLineIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import LoadingComponent from "@/components/loader/LoadingComponent";
import TerminalOutputModalContainer from "@/components/terminalOutputModal/TerminalOutputModalContainer";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { FC } from "react";
import clsx from "clsx";

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
    revalidate: any;
    isValidating: boolean;
}

const StudentSectionOutputView: FC<IProps> = ({ revalidate, isValidating }) => {
    const router = useRouter()
    const { data: outputs, isLoading } = useFetch(router?.query?.student ? `/outputs/students/${router.query.student}?sectionId=${router.query.sectionId}` : null)
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
    return (
        <div className="relative w-full h-full pb-4">
            {
                isLoading && <LoadingComponent />
            }
            {
                outputs ?
                    <>
                        <div className="sticky top-0 pt-4 pb-2 shadow-sm bg-light-200 z-header ">
                            <div className="flex items-start justify-between flex-nowrap">
                                <div>
                                    <Link className="flex items-center text-subHeader hover:text-body hover:underline" href={`/outputs/${router.query.student}`}>
                                        <ArrowLeftIcon className="w-4 h-4" />
                                        <span className="ml-1 text-xs font-light">Joined Sections</span>
                                    </Link>
                                    <h3 className="text-xl font-medium text-header">{outputs?.title}  <span className="ml-2 font-normal">({outputs?.shortcode})</span></h3>
                                </div>
                                <div className='pr-2'>
                                    <button className='flex items-center gap-2 px-4 py-2 rounded-sm flex-nowrap bg-dark-header' onClick={() => revalidate()} disabled={isValidating || isLoading}>
                                        <ArrowPathIcon className={clsx('w-6 h-6 text-light-200', isValidating ? "animate-spin" : "")} />
                                        <span className='text-sm leading-none text-light-200'>{isValidating ? "Refreshing" : "Refresh data"}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {
                            outputs?.activities?.map((activity: any) => (
                                <div key={activity.id} className="w-full p-4 mt-4 overflow-hidden border shadow-sm bg-light-400">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-base font-medium text-header">{activity.title}</h3>
                                            <p className="text-xs text-subHeader">{activity?.shortDescription}</p>
                                        </div>
                                        {
                                            !!activity?.sessions[0] && activity?.sessions[0].compilationCount > 1 ?
                                                <div className='flex flex-col items-end justify-center'>
                                                    <Link href={`/outputs/${router.query.student}?activityId=${activity.id}`} className="mr-4 font-bold hover:underline">VIEW FULL</Link>
                                                    <p className="mr-4 text-sm text-header">{activity?.sessions[0].compilationCount} Compilation/s</p>
                                                </div>
                                                :
                                                <p className="text-sm text-header">0 Compilation</p>
                                        }
                                    </div>
                                    <div>
                                    </div>
                                    {
                                        activity?.sessions[0] ?
                                            <div className="relative pb-6 mt-4">
                                                <Carousel draggable={false} showDots renderDotsOutside responsive={responsive} dotListClass='flex-wrap w-full'>
                                                    {
                                                        activity.sessions[0].compilations.map((compilation: any, idx: number) => (
                                                            <div key={compilation.id} className="relative flex flex-col w-full px-2 overflow-hidden">
                                                                <div className="overflow-y-auto h-[300px] codeblock-wrapper ">
                                                                    <CodeBlock
                                                                        text={compilation.codeValue}
                                                                        language={activity?.lang}
                                                                        showLineNumbers={true}
                                                                        theme={atomOneDark}
                                                                        highlight={idx === 0 ? "" : getLineChanges(activity.sessions[0].compilations[idx - 1].codeValue, compilation.codeValue).join(",")}
                                                                    />
                                                                </div>
                                                                {/* {
                                                                    compilation.error &&
                                                                    <div className="mt-1.5 flex items-center gap-2">
                                                                        <div title="Has error" className='w-4 h-4 bg-red-700 rounded-full'></div>
                                                                        {
                                                                            compilation.LineError > 0 ?
                                                                                `Error at line ${compilation.LineError}`
                                                                                :
                                                                                "View compilation result for more error info"
                                                                        }
                                                                    </div>
                                                                } */}
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
                        }
                    </>
                    :
                    null
            }
        </div>
    )
}

export default StudentSectionOutputView