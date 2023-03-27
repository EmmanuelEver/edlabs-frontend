import MainLayout from "@/components/layouts/MainLayout"
import { ROLES } from "@/types/types";
import { FC } from "react"
// import CodeMirror from '@uiw/react-codemirror';
// import {StreamLanguage} from '@codemirror/language';
// import { c } from '@codemirror/legacy-modes/mode/clike';
// import { keymap } from "@codemirror/view";
// import {insertTab, indentLess} from '@codemirror/commands'
type TProps = {
  role: ROLES;
}

const Home: FC<TProps> = ({role}) => {
  return (
    <MainLayout pageTitle="Dashboard" role={role}> 
    
    </MainLayout>
  )
}

export default Home