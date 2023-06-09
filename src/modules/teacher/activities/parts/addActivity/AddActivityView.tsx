import { FC, Fragment, useMemo } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';


interface IProps {
    handleCloseModal: () => void;
    handleDescription: (value: any) => void;
    description: any;
    register: any;
    handleSubmit: (func: any) => any;
    onSubmit: (val: any) => void
    isSubmitting: boolean;
    isDirty: boolean
}


const myModules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', "code"],
    ['clean']
  ],
}


const AddActivityView: FC<IProps> = ({handleCloseModal, handleDescription, description, register, handleSubmit, onSubmit, isSubmitting, isDirty}) => {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);

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
                <Dialog.Panel className=" max-w-4xl w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="flex justify-between items-center"
                  >
                    <h3 className="text-lg font-medium leading-6 text-header">New activity</h3>
                    <button onClick={handleCloseModal} className="w-6 h-6">
                        <XMarkIcon className="text-header" />
                    </button>
                  </Dialog.Title>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("title", { required: "This field is required."})} className="text-header placeholder:font-normal font-medium text-xl w-full pl-4 py-2.5" placeholder="Activity name" />
                        <input {...register("shortDescription", { required: "This field is required."})} className="mb-6 text-header placeholder:font-normal font-medium text-base w-full pl-4 py-2.5" placeholder="Short description" />
                        <div className="mb-5 relative pl-4">
                            <label className="block text-subHeader text-sm font-medium mb-2" htmlFor="openDate">
                                Date open
                            </label>
                            <input {...register("openDate", { required: "This field is required."})} type="date" id="openDate" defaultValue={new Date().toISOString().split("T")[0]} min={new Date().toISOString().split("T")[0]} className="shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-5 relative pl-4">
                            <label className="block text-subHeader text-sm font-medium mb-2" htmlFor="closeDate">
                                Date expires (optional)
                            </label>
                            <input {...register("closeDate")} type="date" id="closeDate" min={new Date().toISOString().split("T")[0]} className="shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-5 relative pl-4">
                            <label className="block text-subHeader text-sm font-medium mb-2" htmlFor="expiredDate">
                                Description
                            </label>
                            <div id="newActivity-description" className="relative h-56 max-h-72">
                              <ReactQuill modules={myModules} value={description} onChange={handleDescription} />
                            </div>
                        </div>
                        <div className="mb-5 relative pl-4">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input {...register("isOnline")} type="checkbox" defaultChecked className="sr-only peer"/>
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            <span className="ml-3 text-subHeader text-sm font-medium">Publish online</span>
                          </label>
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
                                disabled={!isDirty && !description}
                                type="submit"
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
  )
}

export default AddActivityView

