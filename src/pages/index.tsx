import MainLayout from "@/components/layouts/MainLayout"
import StudentDashboard from "@/modules/student/dashboard/StudentDashboardContainer";
import TeacherDashboardContainer from "@/modules/teacher/dashboard/TeacherDashboardContainer";
import useAppStore from "@/store/appStore";
import { ROLES } from "@/types/types";
import { FC } from "react"
// import CodeMirror from '@uiw/react-codemirror';
// import {StreamLanguage} from '@codemirror/language';
// import { c } from '@codemirror/legacy-modes/mode/clike';
// import { keymap } from "@codemirror/view";
// import {insertTab, indentLess} from '@codemirror/commands'
// type TProps = {
//   role: ROLES;
// }

const Home = () => {
  const { user, isAuthenticating } = useAppStore((state) => ({
    user: state.user,
    isAuthenticating: state.isAuthenticating,

  }))
  return (
    <MainLayout pageTitle="Dashboard" role={user?.role}> 
    {
        !isAuthenticating &&
          user?.role === "STUDENT" ?
          <StudentDashboard />
          :
          user?.role === "TEACHER" ?
            <TeacherDashboardContainer />
            :
            null
      }
    </MainLayout>
  )
}
Home.isPrivate = true

export default Home