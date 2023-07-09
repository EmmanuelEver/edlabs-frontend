import LoadingComponent from "@/components/loader/LoadingComponent";
import useFetch from "@/hooks/useFetch"
import { useRouter } from "next/router"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import Image from "next/image";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import ProglangLogo from "@/components/logos/ProglangLogo";
dayjs.extend(relativeTime)

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
    return (
        <div className="relative flex-1 w-full overflow-y-auto">

            <div className="flex items-center justify-between pb-4 border-b flex-nowrap border-light-300">
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
                            <h4 className="text-3xl font-bold text-right text-red-400">{parseFloat(session.eqScore).toFixed(4)}</h4>
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

                                        <Carousel draggable={false} showDots renderDotsOutside responsive={responsive} dotListClass='flex-wrap w-full'>
                                            {
                                                output.sessions[0].compilations.map((compilation: any, idx: number) => (
                                                    <div key={compilation.id} className="relative flex flex-col w-full px-2 overflow-hidden">
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
            </div>
        </div>
    )
}

export default StudentActivityOutputView