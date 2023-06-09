import StudentsActivitiesContainer from "@/modules/student/activities/StudentsActivitiesContainer";
import TeacherActivitiesContainer from "@/modules/teacher/activities/TeacherActivitiesContainer";
import MainLayout from "@/components/layouts/MainLayout";
import useAppStore from "@/store/appStore";


const ActivitiesPage = () => {
  const { user, isAuthenticating } = useAppStore((state) => ({
    user: state.user,
    isAuthenticating: state.isAuthenticating,

  }))
  return (
    <MainLayout role={user?.role} pageTitle="Activities">
        {
          !isAuthenticating &&
            user?.role === "STUDENT" ?
            <StudentsActivitiesContainer />
            :
            user?.role === "TEACHER" ?
                <TeacherActivitiesContainer />
            :
            null
        }
    </MainLayout>
  )
}
ActivitiesPage.isPrivate = true

export default ActivitiesPage