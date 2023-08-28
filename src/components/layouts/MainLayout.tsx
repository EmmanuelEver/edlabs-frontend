import { ROLES } from "@/types/types"
import { FC, PropsWithChildren } from "react"
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";
import MainSidebar from "../sidebar/MainSidebar"

interface IProps extends PropsWithChildren {
    role: ROLES | undefined;
    pageTitle?: string;
}

const MainLayout: FC <IProps> = ({children, role="STUDENT", pageTitle}) => {
  return (
    <div className="flex flex-col w-screen h-screen flex-nowrap">
        <Navbar role={role} />
        <section className="flex flex-col flex-1 overflow-hidden bg-light-400">
            <main className="flex-1 overflow-hidden">
              {children}
            </main>
        </section>
    </div>
  )
}

export default MainLayout