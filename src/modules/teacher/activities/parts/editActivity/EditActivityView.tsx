import { FC, Fragment, useMemo } from 'react'
import dynamic from 'next/dynamic';
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/solid'
import 'react-quill/dist/quill.snow.css';
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"
dayjs.extend(localizedFormat)
import ActivityDetailsContainer from './parts/activityDetails/ActivityDetailsContainer';
import { IActivityFull } from '@/types/types';
import clsx from 'clsx';

interface IProps {
  handleCloseModal: () => void;
  handleDescription: (value: any) => void;
  description: any;
  register: any;
  handleSubmit: (func: any) => any;
  onSubmit: (val: any) => void
  isSubmitting: boolean;
  isDirty: boolean
  data: IActivityFull;
  isDescriptionChanged: boolean;
  handleDelete: () => void;
}

const myModules = {
  toolbar: [
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', "code"],
    ['clean']
  ],
}

const ActivityView: FC<IProps> = ({handleCloseModal, handleDescription, description, register, handleSubmit, onSubmit, isSubmitting, isDirty, data, isDescriptionChanged, handleDelete}) => {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);

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
                <Dialog.Panel className="w-full max-w-6xl px-6 py-3 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="div"
                    className="flex items-center justify-between"
                  >
                    <h3 className="text-lg font-medium leading-6 text-header">Edit activity</h3>
                    <button onClick={handleCloseModal} className="w-6 h-6">
                        <XMarkIcon className="text-header" />
                    </button>
                  </Dialog.Title>
                  <div className="flex w-full mt-4 flex-nowrap">
                    <form className="w-3/5" onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("title", { required: "This field is required."})} className="text-header placeholder:font-normal font-medium text-xl w-full pl-4 py-1.5" placeholder="Activity name" />
                        <input {...register("shortDescription", { required: "This field is required."})} className="w-full py-1 pl-4 mb-3 text-base font-medium text-header placeholder:font-normal" placeholder="Short description" />
                        <div className="relative pl-4 mb-3">
                            <label className="block mb-2 text-sm font-medium text-subHeader" htmlFor="openDate">
                                Date open
                            </label>
                            <input {...register("openDate", { required: "This field is required."})} type="date" id="openDate" defaultValue={new Date(data?.openDate || new Date()).toISOString().split("T")[0]} min={new Date(data?.openDate || new Date()).toISOString().split("T")[0]} className="w-auto px-3 py-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="relative pl-4 mb-3">
                            <label className="block mb-2 text-sm font-medium text-subHeader" htmlFor="expiredDate">
                                Date expires
                            </label>
                            {
                              data && data.closeDate ?
                              <input {...register("closeDate", {shouldUnregister: true})} type="date" id="expiredDate" className="w-auto px-3 py-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" defaultValue={new Date(data?.closeDate || new Date()).toISOString().split("T")[0]} min={new Date(data?.openDate || new Date()).toISOString().split("T")[0]} />
                              :
                              <input {...register("closeDate", {shouldUnregister: true})} type="date" id="expiredDate" className="w-auto px-3 py-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" min={new Date(data?.openDate || new Date()).toISOString().split("T")[0]} />
                            }
                        </div>
                        <div className="relative pl-4 mb-3">
                            <label className="block mb-2 text-sm font-medium text-subHeader" htmlFor="expiredDate">
                                Description
                            </label>
                            <div id="newActivity-description" className="relative h-36 max-h-72">
                              <ReactQuill modules={myModules} value={description} onChange={handleDescription} />
                            </div>
                        </div>
                        <div className="relative pl-4 mb-3">
                          <label className="block mb-1 text-sm font-medium text-subHeader" htmlFor="expiredDate">
                              Starter code
                          </label>
                          <div id="newActivity-starterCode" className="relative h-28 max-h-36">
                              <textarea {...register("starterCode", {shouldUnregister: true})} className="w-full h-full px-2 py-1 font-mono text-sm border rounded resize-none border-light-300" />
                          </div>
                        </div>
                        <div className="flex gap-2 pl-4 mt-8">
                            <button
                              disabled={isSubmitting}
                              type="button"
                              className="inline-flex justify-center w-32 px-4 py-2 text-sm font-medium bg-transparent border rounded-md border-dark-header text-header hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={handleCloseModal}
                            >
                              Cancel
                            </button>
                            <button
                                disabled={(!isDirty && !isDescriptionChanged) || isSubmitting}
                                type="submit"
                                className={clsx("inline-flex justify-center rounded-md border border-transparent bg-dark-header px-4 py-2 text-sm font-medium text-light-100 hover:bg-accentColor-200 hover:text-header  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2", (!isDirty && !isDescriptionChanged) || isSubmitting ? "opacity-50 pointer-events-none" : "")}
                                >
                                Save Changes
                            </button>
                        </div>
                    </form>
                    <div className="w-2/5 ml-6 ">
                      <div className="w-full mt-6 ">
                          <div>
                            <button onClick={handleDelete} className="flex ml-auto text-sm leading-none text-light-100 items-center font-medium justify-center rounded-sm py-2.5 transition-colors px-4 bg-red-700 hover:text-header hover:bg-accentColor-200">
                              <TrashIcon className='w-4 h-4' />
                              <span className='ml-1'>Delete</span>
                              </button>
                          </div>
                          <div className="w-full mt-4 border rounded border-light-300">
                              <ActivityDetailsContainer data={data} />
                          </div>
                          <div className="px-4 mt-4">
                              <p className='mb-1 text-xs text-subHeader'>Created: <span className='ml-2 text-sm text-dark-100'>{dayjs(data?.createdAt).format("LLLL")} </span></p>
                              <p className='text-xs text-subHeader'>Updated: <span className='ml-2 text-sm text-dark-100'>{dayjs(data?.lastUpdated).format("LLLL")}</span></p>
                          </div>
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

export default ActivityView