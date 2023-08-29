import LoadingComponent from "@/components/loader/LoadingComponent";
import useFetch from "@/hooks/useFetch"
import { useRouter } from "next/router"
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, PointElement, LineElement, CategoryScale } from 'chart.js';
import Carousel from "react-multi-carousel";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import clsx from "clsx";
import { ArrowDownIcon, ArrowUpIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useMemo } from "react";
ChartJS.register(ArcElement, Tooltip, Legend, LinearScale,PointElement,LineElement, CategoryScale);

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


const StudentActivityOutputView = () => {
    const router = useRouter();
    const { data: user, revalidate, isValidating } = useFetch(router?.query?.student ? `/users/${router.query.student}` : null)
    const { data: output, isLoading } = useFetch(router?.query?.student && router.query.activityId ? `/outputs/students/${router.query.student}?activityId=${router.query.activityId}` : null)

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
    const session = output ? output?.sessions[0] : null

    const datasets = [
        {
            label: 'EQ score progression',
            data: session?.compilations?.map((compilation) => {
                if(Number.isFinite(compilation.eqScore)) return compilation.eqScore
                return 0
            }),
            borderColor: "rgb(25, 38, 56)",
            backgroundColor: "rgb(25, 38, 56)",
            borderWidth: 2
        }
    ]

    const errorTypes = useMemo(() => {
        if(output) {
            const errorTypesCount = {}
            output?.sessions[0].compilations?.forEach((compilation) => {
                if(compilation.error && !!compilation.errorType) {
                    if(compilation.errorType in errorTypesCount) {
                        errorTypesCount[compilation.errorType] = errorTypesCount[compilation.errorType] + 1
                    } else {
                        errorTypesCount[compilation.errorType] = 1
                    }
                }
            })
            const formattedErrors = Object.entries(errorTypesCount).map((item:any) => ({error: item[0], count: item[1]}))
            
            return formattedErrors.sort((a, b) => b.count - a.count)
        }
        return null
    }, [output])
    return (
        <div className="relative flex w-full gap-4 overflow-hidden flex-nowrap">
            <div className="flex-shrink-0 w-3/12 min-w-[320px] overflow-y-auto">
                {
                    !!user &&
                    <div className="sticky top-0 p-4 overflow-y-auto rounded-md shadow bg-light-100">
                        <div className="flex items-start ">
                            <div className="w-16 h-16 overflow-hidden rounded-md">
                                <Image className="object-contain w-full h-full rounded-md" width={50} height={50} src={user.profileUrl} alt={user.name} />
                            </div>
                            <div className="flex-col items-center ml-4">
                                <h2 className="text-lg font-medium text-header">{user.name}</h2>
                                <p className="text-sm cursor-pointer text-subHeader">{user.email}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h1 className="text-2xl font-medium text-blue-300">{output?.title}</h1>
                            <p className="mt-2 text-sm text-subHeader text-opacity-70">{output?.shortDescription}</p>
                            <p className="mt-6 text-xs text-subHeader text-opacity-70">last updated: {dayjs(session?.lastUpdated).fromNow()}</p>
                        </div>
                    </div>
                }
                {
                    !!output &&
                    <div className="flex items-center justify-center p-4 mt-4 rounded-md shadow bg-light-100">
                        {/* <div className="flex items-center justify-center w-10 h-10 bg-blue-300 rounded-full">
                            <ServerStackIcon className="w-6 h-6 text-light-100" />
                        </div> */}
                        <div className="flex flex-col items-center">
                            <h4 className="text-4xl font-medium text-blue-300">{session?.compilationCount}</h4>
                            <p className="mt-2 text-sm text-subHeader text-opacity-70">Compilations</p>
                        </div>
                    </div>
                }
                {
                    !!output &&
                    <div className="flex items-center p-4 mt-4 rounded-md shadow bg-light-100">
                        <div className="w-full max-w-[200px] mx-auto">
                            <Doughnut options={{ responsive: true, maintainAspectRatio: true }} data={{ labels: ["EQ score"], datasets: [{ data: [parseFloat(session.eqScore).toFixed(3), 1], backgroundColor: ["#192638", "#F4F7FC"] }] }} />
                        </div>
                    </div>
                }
                {
                    !!output && 
                    <div className="p-4 mt-4 rounded-md shadow bg-light-100">
                        <div className="flex items-center gap-2">
                            <ExclamationCircleIcon className="text-blue-300 w-7 h-7" />
                            <h3 className="text-xl font-medium text-blue-300">Common errors</h3>
                        </div>
                            <ul className="flex flex-col mt-4">
                                {
                                    errorTypes?.map((errorType) => (
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
            <div className="flex-1 w-9/12 overflow-y-auto">
                {
                    !!output &&
                    <div className="flex items-center p-4 mb-4 rounded-md shadow bg-light-100">
                        <div className="w-full px-8">
                            <Line options={{responsive: true, maintainAspectRatio: false, scales: {yAxes: {display: false, suggestedMin: 0, suggestedMax: 1}}}} data={{labels: session?.compilations?.map((_, idx) => (idx + 1).toString()),datasets: datasets}} />
                        </div>
                    </div>
                }
                <div className="p-4 rounded-md shadow bg-light-100">
                {
                    !!session &&
                    <Carousel draggable={false} showDots renderDotsOutside responsive={responsive} dotListClass='flex-nowrap overflow-y-auto py-4 !relative w-full px-10 !mx-auto '>
                        {
                            output.sessions[0].compilations.map((compilation: any, idx: number) => (
                                <div key={compilation.id} className="relative flex flex-col w-full px-2 overflow-hidden">
                                    <div className="flex items-center justify-between">
                                        {
                                            idx >= 1 ?
                                            (typeof compilation?.eqScore === "number" && !Number.isNaN(compilation?.eqScore)) &&
                                            <div className={clsx("flex items-center gap-1.5", compilation.eqScore > output.sessions[0].compilations[idx - 1].eqScore ? "text-red-600" : "text-green-600")}>
                                                {
                                                    compilation.eqScore > output.sessions[0].compilations[idx - 1].eqScore ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
                                                }
                                                {parseFloat(compilation.eqScore.toString()).toFixed(3)}
                                            </div>
                                            :
                                            <div className="h-6"> </div>
                                        }
                                    </div>
                                    <div className="overflow-y-auto h-[300px] codeblock-wrapper ">
                                        <CodeBlock
                                            text={compilation.codeValue}
                                            language={output?.lang}
                                            showLineNumbers={true}
                                            theme={atomOneDark}
                                            highlight={idx === 0 ? "" : getLineChanges(output.sessions[0].compilations[idx - 1].codeValue, compilation.codeValue).join(",")}
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
                }
                </div>
            </div>
            {/* <div className="flex items-center justify-between pb-4 border-b flex-nowrap border-light-300">
                {
                    !!user &&
                    <div className="flex items-center ">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                            <Image className="object-contain w-full h-full rounded-full" width={50} height={50} src={user.profileUrl} alt={user.name} />
                        </div>
                        <div className="flex-col items-center ml-4">
                            <h2 className="text-lg font-medium text-header">{user.name}</h2>
                            <p className="text-sm cursor-pointer text-subHeader">{user.email}</p>
                        </div>
                    </div>
                }
                {
                    !!output && 
                    <div className="">
                        <h3 className="text-lg font-medium text-right text-header">{output?.title}</h3>
                        {
                            !!session && 
                            <h4 className="text-3xl font-bold text-right text-red-400">{parseFloat(session.eqScore).toFixed(3)}</h4>
                        }
                    </div>
                }
            </div>

            <div className="relative w-full h-full">
                {
                    isLoading ?
                        <LoadingComponent />
                        :
                        <div>
                            {
                                session ?
                                    <div className="relative pb-6 mt-4">

                                        {
                                            session?.compilations?.length > 0 &&  
                                            <div className="flex items-center justify-between">
                                                <div className="pl-2">
                                                    <ProglangLogo lang={output?.lang} />
                                                </div>
                                                <div className="pr-1.5 mb-2 text-right text-subHeader">
                                                    <div>
                                                        <span>{session?.compilationCount}</span> compilation/s
                                                    </div>
                                                    <div>
                                                    last updated: {dayjs(session.lastUpdated).fromNow()}
                                                    </div>
                                                </div>
                                            </div>
                                           
                                        }

                                        <Carousel draggable={false} showDots renderDotsOutside responsive={responsive} dotListClass='flex-wrap !relative w-4/5 !mx-auto '>
                                            {
                                                output.sessions[0].compilations.map((compilation: any, idx: number) => (
                                                    <div key={compilation.id} className="relative flex flex-col w-full px-2 overflow-hidden">
                                                        <div className="flex items-center justify-between">
                                                            <div># <span>{compilation?.compileTimes}</span></div>
                                                            {
                                                                idx >= 1 &&
                                                                (typeof compilation?.eqScore === "number" && !Number.isNaN(compilation?.eqScore)) &&
                                                                <div className={clsx("flex items-center gap-1.5", compilation.eqScore > output.sessions[0].compilations[idx-1].eqScore ? "text-red-600" : "text-green-600")}>
                                                                    {
                                                                        compilation.eqScore > output.sessions[0].compilations[idx-1].eqScore ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
                                                                    }
                                                                    {parseFloat(compilation.eqScore.toString()).toFixed(3)}
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className="overflow-y-auto h-[300px] codeblock-wrapper ">
                                                            <CodeBlock
                                                                text={compilation.codeValue}
                                                                language={output?.lang}
                                                                showLineNumbers={true}
                                                                theme={atomOneDark}
                                                                highlight={idx === 0 ? "" : getLineChanges(output.sessions[0].compilations[idx - 1].codeValue, compilation.codeValue).join(",")}
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
                }
            </div> */}
        </div>
    )
}

export default StudentActivityOutputView