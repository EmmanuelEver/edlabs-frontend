import useFetch from "@/hooks/useFetch"
import useAppStore from "@/store/appStore"
import TeacherDashboardView from "./TeacherDashboardView"

const TeacherDashboardContainer = () => {
  const {data, isLoading} = useFetch("/dashboard")
  const { user, isAuthenticating } = useAppStore((state) => ({
    user: state.user,
    isAuthenticating: state.isAuthenticating,

  }))
  return (
    <TeacherDashboardView data={data} isLoading={isLoading} user={user} />
  )
}

export default TeacherDashboardContainer