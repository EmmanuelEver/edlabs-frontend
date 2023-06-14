import useFetch from "@/hooks/useFetch"
import useAppStore from "@/store/appStore"
import StudentDashboardView from "./StudentDashboardView"

const StudentDashboard = () => {
  const {data, isLoading} = useFetch("/dashboard")
  const { user, isAuthenticating } = useAppStore((state) => ({
    user: state.user,
    isAuthenticating: state.isAuthenticating,

  }))
  return (
    <StudentDashboardView data={data} isLoading={isLoading} user={user} />
  )
}

export default StudentDashboard