import { Transition } from "@headlessui/react";
import { FC, Fragment } from "react"
import OutputsAllContainer from "./parts/outputsAll/OutputsAllContainer";
import OutputsByActivityContainer from "./parts/outputsByActivity/OutputsByActivityContainer";
import OutputSectionContainer from "./parts/outputSection/OutputSectionContainer";

interface IProps {
    showOutputBySection: any;
    showOutputByActivity: any;
}

const OutputsView: FC<IProps> = ({ showOutputBySection, showOutputByActivity }) => {
    return (
        !!showOutputByActivity ?
            <OutputsByActivityContainer />
            :
            <div className="relative flex w-full h-full overflow-hidden flex-nowrap">
                <OutputsAllContainer />
                <Transition
                    className="w-full h-full"
                    show={!!showOutputBySection}
                    enter='transform transition ease-in-out duration-500 sm:duration-700'
                    enterFrom='translate-x-full'
                    enterTo='translate-x-0'
                    leave='transform transition ease-in-out duration-500 sm:duration-700'
                    leaveFrom='translate-x-0'
                    leaveTo='translate-x-full'
                >
                    <OutputSectionContainer />
                </Transition>
            </div>
    )
}

export default OutputsView