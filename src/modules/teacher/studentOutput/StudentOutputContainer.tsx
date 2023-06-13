import useFetch from "@/hooks/useFetch"
import { useRouter } from "next/router"
import StudentOutputView from "./StudentOutputView"

const StudentOutputContainer = () => {
  const router = useRouter()
  const {data: user} = useFetch(router?.query?.student ? `/users/${router.query.student}` : null)
  const {data: outputs} = useFetch(router?.query?.student ? `/outputs/students/${router.query.student}?sectionId=${router.query.sectionId}` : null)
  return (
    <StudentOutputView user={user} showOnlySpecificSection={router?.query?.sectionId || ""} />
  )
}

export default StudentOutputContainer