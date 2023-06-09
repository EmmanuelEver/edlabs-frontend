import MainLayout from "@/components/layouts/MainLayout"
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
    
    </MainLayout>
  )
}
Home.isPrivate = true

export default Home