import { FC, Fragment, useMemo } from 'react'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { XMarkIcon, ClipboardDocumentListIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
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
  control: any;
}


const myModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', "code"],
    ['clean']
  ],
}

const langs = ["c", "python", "java"]

const AddActivityView: FC<IProps> = ({ handleCloseModal, handleDescription, description, register, handleSubmit, onSubmit, isSubmitting, isDirty, control }) => {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
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
              <Dialog.Panel className="w-full max-w-4xl px-3 py-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="div"
                  className="flex items-center justify-between"
                >
                  <div className='flex items-center'>
                    <ClipboardDocumentListIcon className='w-5 h-5 ml-2 text-body' />
                    <h3 className="pl-2 text-lg font-medium leading-6 text-header">Add activity</h3>
                  </div>
                  <button onClick={handleCloseModal} className="w-6 h-6">
                    <XMarkIcon className="text-header" />
                  </button>
                </Dialog.Title>
                <div className="mx-3 mt-2">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-2'>
                      <label className="block mb-1 text-xs font-medium text-body" htmlFor="new-activity-title">
                        Title
                      </label>
                      <input id='new-activity-title' {...register("title", { required: "This field is required." })} className="text-header border rounded placeholder:font-normal font-medium text-sm w-full py-1.5 pl-2" placeholder="Activity name" />
                    </div>
                    <div>
                      <label className="block mb-1 text-xs font-medium text-body" htmlFor="new-activity-shortDescription">
                        Short description
                      </label>
                      <input id='shortDescription' {...register("shortDescription", { required: "This field is required." })} className="w-full py-1 pl-2 mb-3 text-sm font-medium border rounded text-header placeholder:font-normal" placeholder="Short description" />
                    </div>
                    <div className="relative mb-3">
                      <label className="block mb-1 text-xs font-medium text-body" htmlFor="newActivity-description">
                        Description
                      </label>
                      <div id="newActivity-description" className="relative h-40 max-h-72">
                        <ReactQuill modules={myModules} value={description} onChange={handleDescription} />
                      </div>
                    </div>
                    <div className="relative mb-3">
                      <div className='flex items-center gap-5'>
                        <div className="relative w-full">
                          <label className="block mb-1 text-xs font-medium text-body" htmlFor="newActivity-starterCode">
                            Starter code
                          </label>
                          <div className='w-full h-36 max-h-36'>
                            <textarea id="newActivity-starterCode" {...register("starterCode", { shouldUnregister: true })} className="w-full h-full px-2 py-1 font-mono text-sm border rounded resize-none border-light-300" />
                          </div>
                        </div>
                        <div className="relative w-full">
                          <label className="block mb-1 text-xs font-medium text-body" htmlFor="newActivity-answer">
                            Expected result
                          </label>
                          <div className='w-full h-36 max-h-36'>
                            <textarea id="newActivity-answer" {...register("correctAnswer", { shouldUnregister: true })} className="w-full h-full px-2 py-1 font-mono text-sm border rounded resize-none border-light-300" />
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-3">
                        <Controller
                          defaultValue="python"
                          control={control}
                          name="lang"
                          render={
                            ({ field: { value, ref, onChange, onBlur } }) => (
                              <Listbox ref={ref} value={value} onChange={onChange}>
                                <div className="relative mt-1">
                                  <Listbox.Button className="relative min-w-[100px] w-fit pr-3 py-1 pl-2 text-left bg-white rounded-sm border border-light-300 cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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
                    </div>

                    <div className='flex items-center'>
                      <div className="relative mb-3">
                        <label className="block mb-1 text-xs font-medium text-body" htmlFor="openDate">
                          Date open
                        </label>
                        <input {...register("openDate", { required: "This field is required." })} type="date" id="openDate" defaultValue={new Date().toISOString().split("T")[0]} min={new Date().toISOString().split("T")[0]} className="w-auto px-3 py-1 text-xs leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" />
                      </div>
                      <div className='mx-4'>-</div>
                      <div className="relative mb-3">
                        <label className="block mb-1 text-xs font-medium text-body" htmlFor="closeDate">
                          Date expires (optional)
                        </label>
                        <input {...register("closeDate")} type="date" id="closeDate" min={new Date().toISOString().split("T")[0]} className="w-auto px-3 py-1 text-xs leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" />
                      </div>
                    </div>
                    <div className="relative mb-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input {...register("isOnline")} type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-9 h-4 bg-gray-200 peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-grey after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                        <span className="ml-3 text-sm font-medium text-subHeader">Publish online</span>
                      </label>
                    </div>
                    <div className="flex gap-2 mt-8">
                      <button
                        type="button"
                        className="inline-flex justify-center w-20 px-4 py-2 text-sm font-medium bg-transparent border rounded-md border-dark-header text-header hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                      <button
                        disabled={!isDirty && !description}
                        type="submit"
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
  )
}

export default AddActivityView

