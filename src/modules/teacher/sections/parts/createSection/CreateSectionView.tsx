import { FC, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { ICreateSectionForm } from "./CreateSectionContainer";


interface IProps {
    handleCreateSection: (val: boolean) => void;
    handleSubmit: (func:any) => any;
    onSubmit: (val: ICreateSectionForm) => void;
    showCreateModal: boolean;
    register: any;
    isDirty: boolean;
    isSubmitting: boolean;
    errors: any;
}

const CreateSectionView: FC<IProps> = ({handleCreateSection, showCreateModal, handleSubmit, onSubmit, register, isDirty, isSubmitting, errors}) => {
  return (
    <>
        <button onClick={() => handleCreateSection(true)} className="flex ml-auto text-sm leading-none text-light-100 items-center font-medium justify-center rounded py-2.5 transition-colors px-4 bg-dark-header hover:text-header hover:bg-accentColor-200">
            <PlusIcon className="w-4 h-4"/>
            <span className="ml-1">Create section</span>
        </button>
        <Transition appear show={showCreateModal} as={Fragment}>
            <Dialog as="div" className="relative z-10 max-h-full" onClose={() => handleCreateSection(false)}>
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
                        as="div"
                        className="flex items-center justify-between"
                    >
                        <h3 className="text-lg font-medium leading-6 text-header">Create section</h3>
                        <button onClick={() => handleCreateSection(false)} className="w-6 h-6">
                            <XMarkIcon className="text-header" />
                        </button>
                    </Dialog.Title>
                        <div className="mt-7">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-5 relative">
                                    <label className="block text-subHeader text-sm font-medium mb-2" htmlFor="section-name">
                                        Section name*
                                    </label>
                                    <input {...register("title", {required: "This field is required"})} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="section-title" type="text"/>
                                    {
                                        !!errors?.title &&
                                        <p className="text-xs text-red-500 absolute -bottom-4">{errors?.title?.message}</p>
                                    }
                                </div>
                                <div className="mb-5 relative">
                                    <label className="block text-subHeader text-sm font-medium mb-2" htmlFor="shortCode">
                                        Shortcode*
                                    </label>
                                    <input {...register("shortcode", {required: "This field is required"})} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="shortCode" type="text"/>
                                    {
                                        !!errors?.shortcode &&
                                        <p className="text-xs text-red-500 absolute -bottom-4">{errors?.shortcode?.message}</p>
                                    }
                                </div>
                                <div className="mb-5 relative">
                                    <label className="block text-subHeader text-sm font-medium mb-2" htmlFor="section-description">
                                        Section description*
                                    </label>
                                    <textarea {...register("description", {required: "This field is required"})} className="resize-none h-20  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="section-description" placeholder="Add a description..."/>
                                    {
                                        !!errors?.description &&
                                        <p className="text-xs text-red-500 absolute -bottom-4">{errors?.description?.message}</p>
                                    }
                                </div>
                                <div>
                                    <label className="md:w-2/3 block text-gray-500 font-bold">
                                        <input {...register("isOnline")} className="mr-2 leading-tight" type="checkbox"/>
                                        <span className="text-sm">
                                            Publish after creating.
                                        </span>
                                    </label>
                                </div>
                                <div className="mt-8 flex justify-end items-center gap-2">
                                <button
                                        type="button"
                                        className="inline-flex w-20 justify-center rounded-md border border-transparent bg-transparent border-dark-header px-4 py-2 text-sm font-medium text-header hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={() => handleCreateSection(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!isDirty || isSubmitting}
                                        className="inline-flex w-20 justify-center rounded-md border border-transparent bg-dark-header px-4 py-2 text-sm font-medium text-light-100 hover:bg-accentColor-200 hover:text-header  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
    </>
  )
}

export default CreateSectionView