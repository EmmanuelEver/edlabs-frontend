import { FC, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { IFormStruct } from "./JoinSectionModalContainer";

interface IProps {
    show: boolean;
    onClose: () => void;
    handleSubmit: (func:any) => any;
    onSubmit: (val: IFormStruct) => void;
    register: any;
    isDirty: boolean;
    isSubmitting: boolean;
}

const JoinSectionModalView: FC<IProps> = ({show, onClose, handleSubmit, onSubmit, register, isDirty, isSubmitting}) => {
  return (
    <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-full p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Join section
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Enter below the section you want to join. All request will be subject for approval by the section teacher.
                                </p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                                <input
                                    className="w-full py-1.5 pl-2 pr-1 h-9 placeholder:text-sm placeholder:font-light placeholder:leading-none border-light-300 rounded border"
                                    placeholder="Enter section access code here"
                                    {...register("accessCode")}
                                />
                                <div className="flex gap-2 mt-2">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-20 px-4 py-2 text-sm font-medium border border-transparent rounded-md text-header bg-accentColor-200 hover:bg-opacity-70 "
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!isDirty || isSubmitting}
                                        className="inline-flex justify-center w-20 px-4 py-2 text-sm font-medium border border-transparent rounded-md hover:bg-opacity-90 text-light-100 bg-dark-header"
                                    >
                                        {isSubmitting ? "Joining" : "Join"}
                                    </button>
                                </div>
                            </form>

                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
  )
}

export default JoinSectionModalView