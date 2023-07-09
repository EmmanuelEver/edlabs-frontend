import { ROLES } from "@/types/types"
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FC, PropsWithChildren, useState } from "react"
import { HomeIcon, ClipboardDocumentListIcon, CircleStackIcon, CommandLineIcon, UserGroupIcon } from '@heroicons/react/24/solid'
import { useRouter } from "next/router";

interface IProps extends PropsWithChildren {
    role: ROLES;
}

const MainSidebar: FC<IProps> = ({role}) => {
    const [hovered, setHovered] = useState(false);
    const router = useRouter()


    return (
        <nav onMouseLeave={() => setHovered(false)} onMouseOver={() => setHovered(true)} className={clsx("flex-shrink-0 border-r border-dark-400 delay-150 duration-150 bg-accentColor-200", hovered ? "w-56" : "pt-5 w-12")}>
            <div className="mt-5">
                <Link href="/" className={clsx("w-full delay-150 duration-150", hovered ? "scale-100 opacity-100" : "scale-0 opacity-0")}>
                    <Image className="object-contain w-full" width={80} height={30} src="/images/logo-full-transparent.png" alt="" />
                </Link>
            </div>
            <ul className={clsx("mt-8 w-full flex flex-col items-center", hovered ? "pr-4 pl-4" : "")}>
                <li className="w-full mb-3">
                    <Link href="/" >
                        <div className={clsx("w-full py-2 flex items-center", router.pathname === "/" ? "bg-dark-header text-light-100": "bg-transparent hover:bg-dark-header transition-all hover:text-subHeader hover:bg-opacity-20 text-blue-200", hovered ? "rounded-full justify-start pl-4" : "justify-center")}>
                            <div className="w-7 h-7">
                                <HomeIcon />
                            </div>
                            {
                                hovered && <div className="ml-4 text-sm font-normal tracking-wide">
                                                Dashboard
                                            </div>
                            }
                        </div>
                    </Link>
                </li>
                <li className="w-full mb-3">
                    <Link href="/sections" >
                        <div className={clsx("w-full py-2 flex items-center", router.pathname  === "/sections" ? "bg-dark-header text-light-100": "bg-transparent hover:bg-dark-header transition-all hover:text-subHeader hover:bg-opacity-20 text-blue-200",hovered ? "rounded-full justify-start pl-4" : "justify-center")}>
                            <div className="w-7 h-7">
                                <UserGroupIcon />
                            </div>
                            {
                                hovered && <div className="ml-4 text-sm font-normal tracking-wide">
                                                Sections
                                            </div>
                            }
                        </div>
                    </Link>
                </li>
                <li className="w-full mb-3">
                    <Link href="/activities" >
                        <div className={clsx("w-full py-2 flex items-center", router.pathname.includes("/activities") ? "bg-dark-header text-light-100": "bg-transparent hover:bg-dark-header transition-all hover:text-subHeader hover:bg-opacity-20 text-blue-200", hovered ? "rounded-full justify-start pl-4" : "justify-center")}>
                            <div className="w-7 h-7">
                                <ClipboardDocumentListIcon />
                            </div>
                            {
                                hovered && <div className="ml-4 text-sm font-normal tracking-wide">
                                                Activities
                                            </div>
                            }
                        </div>
                    </Link>
                </li>
                {
                    role === "TEACHER" &&
                    <li className="w-full mb-3">
                        <Link href="/outputs" >
                            <div className={clsx("w-full py-2 flex items-center", router.pathname.includes("/outputs")? "bg-dark-header text-light-100": "bg-transparent hover:bg-dark-header transition-all hover:text-subHeader hover:bg-opacity-20 text-blue-200", hovered ? "rounded-full justify-start pl-4" : "justify-center")}>
                                <div className="w-7 h-7">
                                    <CommandLineIcon />
                                </div>
                                {
                                    hovered &&  <div className="ml-4 text-sm font-normal tracking-wide">
                                                    Outputs
                                                </div>
                                }
                            </div>
                        </Link>
                    </li>
                }
                {
                    role === "ADMIN" &&
                    <li className="w-full mb-3">
                        <Link href="/admin" >
                            <div className={clsx("w-full py-2 flex items-center", router.pathname  === "/settings" ? "bg-dark-header text-light-100": "bg-transparent hover:bg-dark-header transition-all hover:text-subHeader hover:bg-opacity-20 text-blue-200", hovered ? "rounded-full justify-start pl-4" : "justify-center")}>
                                <div className="w-7 h-7">
                                    <CircleStackIcon/>
                                </div>
                                {
                                    hovered &&  <div className="ml-4 text-sm font-normal tracking-wide">
                                                    Admin
                                                </div>
                                }
                            </div>
                        </Link>
                    </li>
                }
            </ul>
        </nav>
    )
}

export default MainSidebar