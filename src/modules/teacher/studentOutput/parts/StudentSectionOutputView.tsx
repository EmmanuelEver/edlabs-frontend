import useFetch from "@/hooks/useFetch"
import { useRouter } from "next/router"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import Link from "next/link";
import { ArrowLeftIcon, CommandLineIcon } from '@heroicons/react/24/solid'
import LoadingComponent from "@/components/loader/LoadingComponent";
import TerminalOutputModalContainer from "@/components/terminalOutputModal/TerminalOutputModalContainer";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 4
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
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

const StudentSectionOutputView = () => {
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
    console.log(outputs)
    return (
        <div className="relative w-full h-full pb-4">
            {
                isLoading && <LoadingComponent />
            }
            {
                outputs ?
                    <>
                        <div className="sticky top-0 pt-4 pb-2 shadow-sm bg-light-200 z-header ">
                            <Link className="flex items-center text-subHeader hover:text-body hover:underline" href={`/outputs/${router.query.student}`}>
                                <ArrowLeftIcon className="w-4 h-4" />
                                <span className="ml-1 text-xs font-light">Joined Sections</span>
                            </Link>
                            <h3 className="text-xl font-medium text-header">{outputs?.title}  <span className="ml-2 font-normal">({outputs?.shortcode})</span></h3>
                        </div>
                        {
                            outputs?.activities?.map((activity: any) => (
                                <div key={activity.id} className="w-full p-4 mt-4 overflow-hidden border shadow-sm bg-light-400">
                                    <div className="flex items-start justify-between">
                                        <div>
                                        <h5 className="text-sm font-medium text-header">{activity.title}</h5>
                                        <p className="text-xs text-subHeader">{activity?.shortDescription}</p>
                                        </div>
                                        {
                                            !!activity?.sessions[0] ?
                                                <div className='flex flex-col items-center justify-center'>
                                                    <p className="text-sm text-header">{activity?.sessions[0].compilationCount} Compilation/s</p>
                                                    <div className='w-32 h-24'>
                                                        <Doughnut data={{
                                                            labels: [],
                                                            datasets: [
                                                                {
                                                                    label: "eq score",
                                                                    data: [activity?.sessions[0]?.eqScore, 1],
                                                                    backgroundColor: [
                                                                        `rgba(126, 23, 23, ${activity?.sessions[0]?.eqScore + .70})`, '#9DB2BF',
                                                                    ],
                                                                    borderColor: [
                                                                        'rgba(126, 23, 23, 1)', '#9DB2BF'
                                                                    ],
                                                                    borderWidth: 1,
                                                                },
                                                            ],
                                                        }} />

                                                    </div>
                                                </div>
                                                :
                                                <p className="text-sm text-header">0 Compilation</p>
                                        }
                                    </div>
                                    <div>
                                    </div>
                                    {
                                        activity?.sessions[0] ?
                                            <div className="mt-4">
                                                <Carousel responsive={responsive}>
                                                    {
                                                        activity.sessions[0].compilations.map((compilation: any, idx: number) => (
                                                            <div key={compilation.id} className="relative w-full px-2 overflow-y-auto h-60">
                                                                <div title="Compilation result" className="absolute z-10 rounded-sm cursor-pointer top-2 right-4">
                                                                    <TerminalOutputModalContainer textValue={compilation.compileResult}>
                                                                        <CommandLineIcon className="w-5 h-5 rounded-sm bg-light-200 text-dark-100" />
                                                                    </TerminalOutputModalContainer>
                                                                </div>
                                                                <CodeBlock
                                                                    text={compilation.codeValue}
                                                                    language="c"
                                                                    showLineNumbers={true}
                                                                    theme={atomOneDark}
                                                                    highlight={idx === 0 ? "" : getLineChanges(activity.sessions[0].compilations[idx - 1].codeValue, compilation.codeValue).join(",")}
                                                                />
                                                                {
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
                                                                }
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