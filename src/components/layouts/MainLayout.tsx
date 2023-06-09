import { ROLES } from "@/types/types"
import { FC, PropsWithChildren } from "react"
import Header from "../header/Header";
import MainSidebar from "../sidebar/MainSidebar"

interface IProps extends PropsWithChildren {
    role: ROLES | undefined;
    pageTitle?: string;
}

const MainLayout: FC <IProps> = ({children, role="STUDENT", pageTitle}) => {
  return (
    <div className="w-screen h-screen flex flex-nowrap">
        <MainSidebar role={role} />
        <section className="flex-1 bg-light-200 flex-col flex overflow-hidden">
            {
              !!pageTitle && <Header pageTitle={pageTitle} />
            }
            <main className="flex-1 overflow-hidden">
              {children}
            </main>
        </section>
    </div>
  )
}

export default MainLayout