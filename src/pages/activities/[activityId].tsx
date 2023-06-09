import MainLayout from "@/components/layouts/MainLayout";
import StudentActivityContainer from "@/modules/student/activity/StudentActivityContainer";
import TeacherSectionContainer from "@/modules/teacher/sections/TeacherSectionContainer";
import useAppStore from "@/store/appStore";

const ActivityPage = () => {
  const { user, isAuthenticating } = useAppStore((state) => ({
      user: state.user,
      isAuthenticating: state.isAuthenticating,
      
  }))

  return (
    <MainLayout role={user?.role} pageTitle="Activity">
        {
          !isAuthenticating &&
            user?.role === "STUDENT" ?
                <StudentActivityContainer />
            :
            user?.role === "TEACHER" ?
                <TeacherSectionContainer />
            :
            null
        }
    </MainLayout>
  )
}
ActivityPage.isPrivate = true

export default ActivityPage