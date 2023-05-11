import { FC, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { IFormStruct } from "./JoinSectionContainer";

interface IProps {
    show: boolean;
    onClose: () => void;
    handleSubmit: (func:any) => any;
    onSubmit: (val: IFormStruct) => void;
    register: any;
    isDirty: boolean;
    isSubmitting: boolean;
}

const JoinSectionView: FC<IProps> = ({show, onClose, handleSubmit, onSubmit, register, isDirty, isSubmitting}) => {
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
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Join class
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Enter below the section you want to join. All request will be subject for approval by the section instructor.
                                </p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                                <input
                                    className="w-full py-1.5 pl-2 pr-1 h-9 placeholder:text-sm placeholder:font-light placeholder:leading-none border-light-300 rounded border"
                                    placeholder="Enter section code here"
                                    {...register("sectionCode")}
                                />
                                <div className="mt-2 flex gap-2">
                                    <button
                                        type="button"
                                        className="inline-flex w-20 justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!isDirty || isSubmitting}
                                        className="inline-flex w-20 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    >
                                        Join
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

export default JoinSectionView