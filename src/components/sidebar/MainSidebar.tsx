import { ROLES } from "@/types/types"
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FC, PropsWithChildren, useState } from "react"

interface IProps extends PropsWithChildren {
    role: ROLES;
}

const MainSidebar: FC<IProps> = ({role}) => {
    const [hovered, setHovered] = useState(true);
    return (
        <nav onMouseLeave={() => setHovered(false)} onMouseOver={() => setHovered(true)} className={clsx("flex-shrink-0 border-r border-dark-400 delay-150 duration-150 transition-all bg-light-100", hovered ? "w-40 px-4" : "pt-5 w-8")}>
            <Link href="/" className={clsx("w-full delay-150 duration-150", hovered ? "scale-100 opacity-100" : "scale-0 opacity-0")}>
                <Image className="object-contain w-full" width={80} height={30} src="/images/logo-full-transparent.png" alt="" />
            </Link>
        </nav>
    )
}

export default MainSidebar