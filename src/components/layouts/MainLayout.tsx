import { ROLES } from "@/types/types"
import { FC, PropsWithChildren } from "react"
import MainSidebar from "../sidebar/MainSidebar"

interface IProps extends PropsWithChildren {
    role: ROLES;
    pageTitle?: string;
}

const MainLayout: FC <IProps> = ({children, role, pageTitle}) => {
  return (
    <div className="w-screen h-screen flex flex-nowrap">
        <MainSidebar role={role} />
        <section className="flex-1 bg-light-200 flex-col flex">
            {
              pageTitle && <header className="w-full bg-light-100 border-b border-light-300 px-6 py-4 text-header font-bold text-2xl">{pageTitle}</header>
            }
            <main className="flex-1 overflow-hidden">
              {children}
            </main>
        </section>
    </div>
  )
}

export default MainLayout