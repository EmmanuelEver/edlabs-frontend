import { FC, Fragment, useMemo } from 'react'
import dynamic from 'next/dynamic';
import { Dialog, Transition, Listbox} from '@headlessui/react'
import { XMarkIcon, TrashIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import 'react-quill/dist/quill.snow.css';
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"
dayjs.extend(localizedFormat)
import ActivityDetailsContainer from './parts/activityDetails/ActivityDetailsContainer';
import { IActivityFull } from '@/types/types';
import clsx from 'clsx';
import { Controller } from "react-hook-form";


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
  control: any;
}

const myModules = {
  toolbar: [
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', "code"],
    ['clean']
  ],
}

const langs = ["c", "python"]

const ActivityView: FC<IProps> = ({handleCloseModal, handleDescription, description, register, handleSubmit, onSubmit, isSubmitting, isDirty, data, isDescriptionChanged, handleDelete, control}) => {
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
                          <div className="relative mb-3">
                        <Controller
                          control={control}
                          name="lang"
                          render={
                            ({ field: { value, ref, onChange, onBlur } }) => (
                              <Listbox ref={ref} value={value} onChange={onChange}>
                                <div className="relative mt-1">
                                  <Listbox.Button className="relative min-w-[100px] min-h-[30px] w-fit pr-3 py-1 pl-2 text-left bg-white rounded-sm border border-light-300 cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block text-sm truncate">{value}</span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                      <ChevronUpDownIcon
                                        className="w-5 h-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>
                                  <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg w-fit z-dropdown max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                      {langs.map((lang, langIdx) => (
                                        <Listbox.Option
                                          key={langIdx}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-3 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                            }`
                                          }
                                          value={lang}
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                  }`}
                                              >
                                                {lang}
                                              </span>
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </Listbox>
                            )
                          }
                        />
                      </div>
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