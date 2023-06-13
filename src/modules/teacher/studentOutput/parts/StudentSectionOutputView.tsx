import useFetch from "@/hooks/useFetch"
import { useRouter } from "next/router"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CodeBlock, atomOneDark } from "react-code-blocks";

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
    const { data: outputs } = useFetch(router?.query?.student ? `/outputs/students/${router.query.student}?sectionId=${router.query.sectionId}` : null)
    return (
        <div className="w-full py-4">
            {
                outputs ?
                    <>
                        <h3 className="text-xl font-medium text-header">{outputs?.title}  <span className="ml-2 font-normal">({outputs?.shortcode})</span></h3>
                        {
                            outputs.activities.map((activity:any) => (
                                <div key={activity.id} className="w-full p-4 mt-4 overflow-hidden border shadow-sm bg-light-400">
                                    <div className="flex items-start justify-between">
                                        <h5 className="text-sm font-medium text-header">{activity.title}</h5>
                                        <p className="text-sm text-header">{activity.sessions[0].compilationCount} Compilation/s</p>
                                    </div>
                                    <p className="text-xs text-subHeader">{activity.shortDescription}</p>
                                    {
                                        activity.sessions[0] ?
                                        <div className="mt-4">
                                            <Carousel responsive={responsive}>
                                                {
                                                    activity.sessions[0].compilations.map((compilation: any) => (
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
                    </>
                    :
                    null
            }
        </div>
    )
}

export default StudentSectionOutputView