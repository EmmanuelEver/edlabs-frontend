import MainLayout from "@/components/layouts/MainLayout";
import StudentSectionsContainer from "@/modules/student/sections/StudentSectionsContainer";
import TeacherSectionContainer from "@/modules/teacher/sections/TeacherSectionContainer";
import useAppStore from "@/store/appStore";

const Sections = () => {
  const { user, isAuthenticating } = useAppStore((state) => ({
    user: state.user,
    isAuthenticating: state.isAuthenticating,
  }))
  return (
    <MainLayout role={user?.role} pageTitle="Sections">
      {
        !isAuthenticating &&
          user?.role === "STUDENT" ?
          <StudentSectionsContainer />
          :
          user?.role === "TEACHER" ?
            <TeacherSectionContainer />
            :
            null
      }
    </MainLayout>
  )
}
Sections.isPrivate = true
export default Sections