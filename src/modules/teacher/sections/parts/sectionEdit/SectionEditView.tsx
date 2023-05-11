import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { FC, Fragment } from 'react'
import SectionDetailsContainer from './parts/sectionDetails/SectionDetailsContainer';
import SectionDetailsView from './parts/sectionDetails/SectionDetailsView';

interface IProps {
    handleCloseModal: () => void;
    handleSubmit: (func:any) => any;
    onSubmit: (val: any) => void;
    register: any;
    isDirty: boolean;
    isSubmitting: boolean;
    errors: any;
}

const SectionEditView: FC<IProps> = ({handleCloseModal, register, isDirty, isSubmitting, handleSubmit, onSubmit, errors}) => {
  return (
    <Transition appear show={true} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
                <Dialog.Panel className=" max-w-6xl w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex justify-between items-center"
                  >
                    <h3 className="text-lg font-medium leading-6 text-header">Section name</h3>
                    <button onClick={handleCloseModal} className="w-6 h-6">
                        <XMarkIcon className="text-header" />
                    </button>
                  </Dialog.Title>
                    <div className='flex flex-nowrap items-start pb-6'>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 w-3/5">
                            <div className="mb-5 relative">
                                <label className="block text-subHeader text-sm font-medium mb-2" htmlFor="section-name">
                                    Section name*
                                </label>
                                <input {...register("name", {required: "This field is required"})} className="shadow appearance-none visited:border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="section-name" type="text"/>
                                {
                                    !!errors?.name &&
                                    <p className="text-xs text-red-500 absolute -bottom-4">{errors?.name?.message}</p>
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
                            <div className="mb-5 relative">
                                <label className="block text-subHeader text-sm font-medium mb-2" htmlFor="section-description">
                                    Section key
                                </label>
                                <input readOnly value="XuLqwghz" className="shadow appearance-none border rounded w-auto py-2 px-3 text-subHeader leading-tight focus:outline-none focus:shadow-outline bg-light-200" id="shortCode" type="text"/>
                            </div>
                            <div className="mt-8 gap-2 flex">
                                <button
                                type="button"
                                className="inline-flex w-20 justify-center rounded-md border bg-transparent border-dark-header px-4 py-2 text-sm font-medium text-header hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={handleCloseModal}
                                >
                                Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!isDirty || isSubmitting}
                                    className="inline-flex w-20 justify-center rounded-md border border-transparent bg-dark-header px-4 py-2 text-sm font-medium text-light-100 hover:bg-accentColor-200 hover:text-header  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                        <div className=" ml-6 mt-6 w-2/5">
                            <div className="border-light-300 border rounded w-full">
                                <SectionDetailsContainer />
                            </div>
                            <div className="px-4 mt-4">
                                <p className='text-xs text-subHeader mb-1'>Created March 19, 2023 at 11:35 PM</p>
                                <p className='text-xs text-subHeader'>Updated May 9, 2023 at 2:00 PM</p>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}

export default SectionEditView