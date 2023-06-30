import { ArrowLeftIcon, CommandLineIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import LoadingComponent from "@/components/loader/LoadingComponent";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import Link from "next/link"
import { FC } from "react"
import Avatar from '@/components/avatar/Avatar';
import TerminalOutputModalContainer from '@/components/terminalOutputModal/TerminalOutputModalContainer';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import clsx from 'clsx';

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


interface IProps {
    data: any;
    isLoading: boolean;
    revalidate: any;
    isValidating: boolean;
    averageEqScore: string;
}

const OutputsByActivityView: FC<IProps> = ({ data, isLoading, revalidate, isValidating, averageEqScore }) => {
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
                        <span className='text-sm leading-none text-light-200'>{isValidating ? "Refreshing" : "Refresh data" }</span>
                    </button>
                    <p className='mt-2 text-sm font-normal text-body'>Average EQ score: <span className='text-base font-medium'>{averageEqScore}</span></p>
                </div>
            </div>
            <div className='flex-1 overflow-y-auto'>
                {
                    data?.sessions?.map((session: any) => (
                        <div key={session?.id} className="w-full p-4 mt-4 overflow-hidden border shadow-sm bg-light-400">
                            <div className="flex items-start justify-between">
                                <div className='flex items-center'>
                                    <Avatar image={session?.student.user.profileUrl} name={session?.student.user.name} />
                                    <div className="flex-col items-center ml-2">
                                        <h2 className="text-sm font-medium leading-tight text-header">{session?.student.user.name}</h2>
                                        <p className="text-xs cursor-pointer text-subHeader">{session?.student.user.email}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col items-center justify-center'>
                                    <p className="text-sm text-header">{session?.compilations?.length} Compilation/s</p>
                                    <div className='w-32 h-24'>
                                        <Doughnut data={{
                                            labels: [],
                                            datasets: [
                                                {
                                                    label: "eq score",
                                                    data: [session?.eqScore, 1],
                                                    backgroundColor: [
                                                        `rgba(126, 23, 23, ${session?.eqScore + .50})`, 'rgba(157, 178, 191, .2)',
                                                    ],
                                                    borderColor: [
                                                        'rgba(126, 23, 23, 1)', 'rgba(157, 178, 191, .3)'
                                                    ],
                                                    borderWidth: 1,
                                                },
                                            ],
                                        }} />
                                    </div>
                                </div>
                            </div>
                            {
                                session.compilations.length > 0 ?
                                    <div className="mt-4">
                                        <Carousel responsive={responsive}>
                                            {
                                                session.compilations.map((compilation: any, idx: number) => (
                                                    <div key={compilation.id} className="flex flex-col w-full px-2">
                                                        <div title="Compilation result" className="sticky top-0 z-20 w-full rounded-sm cursor-pointer bg-light-200">
                                                            <TerminalOutputModalContainer textValue={compilation.compileResult}>
                                                                <CommandLineIcon className="w-5 h-5 rounded-sm bg-light-200 text-dark-100" />
                                                            </TerminalOutputModalContainer>
                                                        </div>
                                                        <div className='flex-1 overflow-y-auto h-60'>
                                                        <CodeBlock
                                                            text={compilation.codeValue}
                                                            language={data?.lang}
                                                            showLineNumbers={true}
                                                            theme={atomOneDark}
                                                            highlight={idx === 0 ? "" : getLineChanges(session.compilations[idx - 1].codeValue, compilation.codeValue).join(",")}
                                                        />
                                                        </div>
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
            </div>
        </div>
    )
}

export default OutputsByActivityView