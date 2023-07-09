import ActivityCard from "@/components/cards/ActivityCard"
import LoadingComponent from "@/components/loader/LoadingComponent"
import useFetch from "@/hooks/useFetch"
import Link from "next/link"
import { useRouter } from "next/router"

const StudentAllOutputView = () => {
  const router = useRouter()
  const { data: outputs, isLoading } = useFetch(router?.query?.student ? `/outputs/students/${router.query.student}` : null)
  return (
    <div className="relative w-full h-full py-4">
      {
        isLoading && <LoadingComponent />
      }

      {
        outputs?.map((section: any) => (
          <div key={section.id} className="px-4 mb-4 last-of-type:mb-0">
            <ActivityCard >
              <h3 title={section.title} className="text-base font-bold text-header hover:underline">
                <Link href={`/outputs/${router.query.student}?sectionId=${section.id}`}>
                  {section.title}
                </Link>
              </h3>
              <ul className="mt-2 list-disc list-inside">
                {
                  section?.activities?.map((activity: any) => (
                    <li className="text-sm text-body" key={activity.id}>
                      <Link href={`/outputs/${router.query.student}?activityId=${activity.id}`} >
                        <span className="hover:underline">{activity.title}</span>
                      </Link>
                      <span className="text-[10px] text-subHeader">  ({activity?.compilations?.length} compilations)</span>
                    </li>
                  ))
                }
              </ul>
            </ActivityCard>
          </div>
        ))
      }
    </div>
  )
}

export default StudentAllOutputView