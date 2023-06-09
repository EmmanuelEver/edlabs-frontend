import { FC } from "react"
import HeaderNavigation from "../navigations/HeaderNavigation";

interface IProps {
    pageTitle: string;
}

const Header: FC<IProps> = ({ pageTitle }) => {


    return (
        <header className="w-full bg-light-100 border-b border-light-300 flex justify-between items-center pr-10">
            <h1 className="px-6 py-4 text-header font-bold text-2xl">{pageTitle}</h1>
            <HeaderNavigation />
        </header>
    )
}

export default Header