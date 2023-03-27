import { ROLES } from "@/types/types"
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FC, PropsWithChildren, useState } from "react"
import { CodeBracketSquareIcon, BuildingLibraryIcon, ListBulletIcon, CogIcon } from '@heroicons/react/24/solid'
import { useRouter } from "next/router";

interface IProps extends PropsWithChildren {
    role: ROLES;
}

const MainSidebar: FC<IProps> = ({role}) => {
    const [hovered, setHovered] = useState(false);
    const router = useRouter()
    return (
        <nav onMouseLeave={() => setHovered(false)} onMouseOver={() => setHovered(true)} className={clsx("flex-shrink-0 border-r border-dark-400 delay-150 duration-150 transition-all bg-light-100", hovered ? "w-56" : "pt-5 w-12")}>
            <div className="mt-5">
                <Link href="/" className={clsx("w-full delay-150 duration-150", hovered ? "scale-100 opacity-100" : "scale-0 opacity-0")}>
                    <Image className="object-contain w-full" width={80} height={30} src="/images/logo-full-transparent.png" alt="" />
                </Link>
            </div>
            <ul className={clsx("mt-8 w-full flex flex-col items-center transition-all duration-150", hovered ? "pr-4" : "")}>
                <li className="w-full mb-3">
                    <Link href="/" >
                        <div className={clsx("w-full py-2 flex items-center transition-all delay-150 duration-300", router.pathname === "/" ? "bg-accentColor-100 text-light-100": "bg-transparent text-subHeader text-opacity-50", hovered ? "justify-start rounded-r-full pl-4 " : "justify-center rounded-r-none")}>
                            <div className="w-7 h-7">
                                <BuildingLibraryIcon />
                            </div>
                            {
                                hovered && <div className="ml-4 font-medium">
                                                Dashboard
                                            </div>
                            }
                        </div>
                    </Link>
                </li>
                <li className="w-full mb-3">
                    <Link href="/sections" >
                        <div className={clsx("w-full py-2 flex items-center transition-all delay-150 duration-300", router.pathname  === "/sections" ? "bg-accentColor-100 text-light-100": "bg-transparent text-subHeader text-opacity-50", hovered ? "justify-start rounded-r-full pl-4 " : "justify-center rounded-r-none")}>
                            <div className="w-7 h-7">
                                <ListBulletIcon />
                            </div>
                            {
                                hovered && <div className="ml-4 font-medium">
                                                Sections
                                            </div>
                            }
                        </div>
                    </Link>
                </li>
                <li className="w-full mb-3">
                    <Link href="/activities" >
                        <div className={clsx("w-full py-2 flex items-center transition-all delay-150 duration-300", router.pathname  === "/activities" ? "bg-accentColor-100 text-light-100": "bg-transparent text-subHeader text-opacity-50", hovered ? "justify-start rounded-r-full pl-4 " : "justify-center rounded-r-none")}>
                            <div className="w-7 h-7">
                                <CodeBracketSquareIcon />
                            </div>
                            {
                                hovered && <div className="ml-4 font-medium">
                                                Activities
                                            </div>
                            }
                        </div>
                    </Link>
                </li>
                <li className="w-full mb-3">
                    <Link href="/settings" >
                        <div className={clsx("w-full py-2 flex items-center transition-all delay-150 duration-300", router.pathname  === "/settings" ? "bg-accentColor-100 text-light-100": "bg-transparent text-subHeader text-opacity-50", hovered ? "justify-start rounded-r-full pl-4 " : "justify-center rounded-r-none")}>
                            <div className="w-7 h-7">
                                <CogIcon />
                            </div>
                            {
                                hovered && <div className="ml-4 font-medium">
                                                Settings
                                            </div>
                            }
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default MainSidebar