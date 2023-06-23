import { FC, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { PlusIcon, XMarkIcon, UserGroupIcon } from '@heroicons/react/24/solid'
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
                        as="div"
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center">
                            <UserGroupIcon className="w-6 h-6 mr-2"/>
                            <div>
                                <h3 className="text-lg font-medium leading-6 text-header">Create section</h3>
                                <p></p>
                            </div>
                        </div>
                        <button onClick={() => handleCreateSection(false)} className="w-6 h-6">
                            <XMarkIcon className="text-header" />
                        </button>
                    </Dialog.Title>
                        <div className="mt-7">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="relative mb-5">
                                    <label className="block mb-2 text-xs font-medium text-body" htmlFor="section-title">
                                        Section name*
                                    </label>
                                    <input {...register("title", {required: "This field is required"})} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" id="section-title" type="text"/>
                                    {
                                        !!errors?.title &&
                                        <p className="absolute text-xs text-red-500 -bottom-4">{errors?.title?.message}</p>
                                    }
                                </div>
                                <div className="relative mb-5">
                                    <label className="block mb-2 text-xs font-medium text-body" htmlFor="shortCode">
                                        Shortcode*
                                    </label>
                                    <input {...register("shortcode", {required: "This field is required"})} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" id="shortCode" type="text"/>
                                    {
                                        !!errors?.shortcode &&
                                        <p className="absolute text-xs text-red-500 -bottom-4">{errors?.shortcode?.message}</p>
                                    }
                                </div>
                                <div className="relative mb-5">
                                    <label className="block mb-2 text-xs font-medium text-body" htmlFor="section-description">
                                        Section description*
                                    </label>
                                    <textarea {...register("description", {required: "This field is required"})} className="w-full h-20 px-3 py-2 text-xs leading-tight text-gray-700 border rounded appearance-none resize-none placeholder:text-sm focus:outline-none focus:shadow-outline" id="section-description" placeholder="Add a description..."/>
                                    {
                                        !!errors?.description &&
                                        <p className="absolute text-xs text-red-500 -bottom-4">{errors?.description?.message}</p>
                                    }
                                </div>
                                <div>
                                    <label className="block font-medium text-body md:w-2/3">
                                        <input {...register("isOnline")} className="mr-2 leading-tight" type="checkbox"/>
                                        <span className="text-xs">
                                            Publish after creating.
                                        </span>
                                    </label>
                                </div>
                                <div className="flex items-center justify-end gap-2 mt-8">
                                <button
                                    disabled={isSubmitting}
                                        type="button"
                                        className="inline-flex justify-center w-20 px-4 py-2 text-sm font-medium bg-transparent border border-transparent rounded-md border-dark-header text-header hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={() => handleCreateSection(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!isDirty || isSubmitting}
                                        className="inline-flex justify-center w-20 px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-dark-header text-light-100 hover:bg-accentColor-200 hover:text-header focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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