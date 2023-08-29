import { ROLES } from "@/types/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react"
import HeaderNavigation from "../navigations/HeaderNavigation";

interface IProps extends PropsWithChildren {
    role: ROLES;
}
const Navbar: FC<IProps> = ({ role }) => {
    const router = useRouter()
    const activePath = router.pathname
    if (router.pathname === "/activities/[activityId]") return <></>
    return (
        <nav className="flex items-center justify-between flex-shrink-0 w-full h-20 px-6 bg-blue-300">
            <div className="flex items-center justify-start h-full">
                <div className="h-full mr-14 brightness-200">
                    <Link href="/">
                        <Image width={100} height={60} src="/images/logo-full-transparent.png" alt="" style={{height: "100%", objectFit: "contain"}}/>
                    </Link>
                </div>
                <ul className="flex items-center h-full gap-6 list-none">
                    <li className={clsx("text-lg font-normal relative h-full flex items-center hover:text-light-200 transition-colors ", activePath === "/" ? "text-light-100" : "text-blue-200 ")}>
                        <Link className="py-2" href="/">
                            Dashboard
                        </Link>
                        <div className={clsx("absolute bottom-0 left-0 w-full h-1 transition-all", activePath === "/" ? "bg-light-100" : "bg-transparent")}></div>
                    </li>
                    <li className={clsx("text-lg font-normal relative h-full flex items-center hover:text-light-200 transition-colors", activePath === "/sections" ? "text-light-100" : "text-blue-200 ")}>
                        <Link className="py-2" href="/sections">
                            Sections
                        </Link>
                        <div className={clsx("absolute bottom-0 left-0 w-full h-1 transition-all", activePath === "/sections" ? "bg-light-100" : "bg-transparent")}></div>
                    </li>
                    <li className={clsx("text-lg font-normal relative h-full flex items-center hover:text-light-200 transition-colors", activePath === "/activities" ? "text-light-100" : "text-blue-200 ")}>
                        <Link className="py-2" href="/activities">
                            Activities
                        </Link>
                        <div className={clsx("absolute bottom-0 left-0 w-full h-1 transition-all", activePath === "/activities" ? "bg-light-100" : "bg-transparent")}></div>
                    </li>
                    {
                        role === "TEACHER" && 
                            <li className={clsx("text-lg font-normal relative h-full flex items-center hover:text-light-200 transition-colors", activePath.startsWith("/outputs") ? "text-light-100" : "text-blue-200 ")}>
                                <Link className="py-2" href="/outputs">
                                    Outputs
                                </Link>
                                <div className={clsx("absolute bottom-0 left-0 w-full h-1 transition-all", activePath === "/outputs" ? "bg-light-100" : "bg-transparent")}></div>
                            </li>
                    }
                    {
                        role === "ADMIN" && 
                            <li className={clsx("text-lg font-normal relative h-full flex items-center hover:text-light-200 transition-colors", activePath === "/admin" ? "text-light-100" : "text-blue-200 ")}>
                                <Link className="py-2" href="/admin">
                                    Admin
                                </Link>
                                <div className={clsx("absolute bottom-0 left-0 w-full h-1 transition-all", activePath === "/admin" ? "bg-light-100" : "bg-transparent")}></div>
                            </li>
                    }
                </ul>
            </div>
            <HeaderNavigation />
        </nav>
    )
}

export default Navbar