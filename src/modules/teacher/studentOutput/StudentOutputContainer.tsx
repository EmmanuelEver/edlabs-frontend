import useFetch from "@/hooks/useFetch"
import { useRouter } from "next/router"
import StudentOutputView from "./StudentOutputView"

const StudentOutputContainer = () => {
  const router = useRouter()
  const {data: user, revalidate, isValidating} = useFetch(router?.query?.student ? `/users/${router.query.student}` : null)
  const { data: outputs, isLoading } = useFetch(router?.query?.student ? `/outputs/students/${router.query.student}` : null)
  console.log(outputs)
  return (
    <StudentOutputView  
      revalidate={revalidate} 
      isValidating={isValidating} 
      user={user}
      outputs={outputs}
      showOnlySpecificSection={router?.query?.activityId ? "activity" : router?.query?.sectionId ?  "section" : ""} 
    />
  )
}

export default StudentOutputContainer