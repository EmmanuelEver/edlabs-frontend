import { FC } from "react";
import { PlusIcon } from '@heroicons/react/24/solid'
import JoinSectionContainer from "./joinSectionModal/JoinSectionModalContainer";

interface IProps {
    showAddModal: boolean;
    handleSetShowModal: (val: boolean) => void
}
const JoinSectionView: FC<IProps> = ({showAddModal, handleSetShowModal}) => {
  return (
    <>
        <button onClick={() => handleSetShowModal(true)} className="flex ml-auto text-sm leading-none text-light-100 items-center font-medium justify-center rounded-sm py-2.5 transition-colors px-4 bg-dark-header hover:text-header hover:bg-accentColor-200">
            <PlusIcon className="w-4 h-4"/>
            <span className="ml-1">Join section</span>
        </button>
        <JoinSectionContainer show={showAddModal} onClose={() => handleSetShowModal(false)} />
    </>
  )
}

export default JoinSectionView