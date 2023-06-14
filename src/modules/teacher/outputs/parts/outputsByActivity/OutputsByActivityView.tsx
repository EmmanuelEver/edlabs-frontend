import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import LoadingComponent from "@/components/loader/LoadingComponent";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import Link from "next/link"
import { FC } from "react"
import Avatar from '@/components/avatar/Avatar';

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
}

const OutputsByActivityView: FC<IProps> = ({ data, isLoading }) => {
    return (
        <div className="flex flex-col w-full h-full overflow-y-auto">
            {
                isLoading && <LoadingComponent />
            }
            <div className="flex-shrink-0 pt-4 pb-2 shadow-sm bg-light-200">
                <Link className="flex items-center w-fit text-subHeader hover:text-body hover:underline" href={`/outputs`}>
                    <ArrowLeftIcon className="w-4 h-4" />
                    <span className="ml-1 text-xs font-light">All Outputs</span>
                </Link>
                <h3 className="text-xl font-medium text-header">{data?.title}</h3>
                <p className="mt-2 text-sm text-subHeader">{data?.shortDescription}</p>
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
                                <p className="text-sm text-header">{session?.compilations?.length} Compilation/s</p>
                            </div>
                            {
                                session.compilations.length > 0 ?
                                    <div className="mt-4">
                                        <Carousel responsive={responsive}>
                                            {
                                                session.compilations.map((compilation: any) => (
                                                    <div key={compilation.id} className="w-full max-w-xs px-2">
                                                        <CodeBlock
                                                            text={compilation.codeValue}
                                                            language="c"
                                                            showLineNumbers={true}
                                                            theme={atomOneDark}
                                                        />
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