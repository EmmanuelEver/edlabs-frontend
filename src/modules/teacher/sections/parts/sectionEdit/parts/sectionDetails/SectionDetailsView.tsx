import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import { FC } from 'react'

interface IProps {
    showStudentList: boolean;
    setShowStudentList: (val:boolean) => void;
    activitiesList: boolean;
    setShowActivitiesList: (val:boolean) => void;
}

const SectionDetailsView: FC<IProps> = ({showStudentList, setShowStudentList, activitiesList, setShowActivitiesList,}) => {
  return (
    <Disclosure defaultOpen>
      {
        ({open}) => (
            <>
            <Disclosure.Button className="px-4 py-2.5 flex justify-between hover:bg-light-300  w-full border-b border-light-300">
                <span>Details</span>
                <ChevronUpIcon
                        className={`${
                            open ? '' : 'rotate-180 transform'
                        } h-5 w-5 text-header`}
                        />
            </Disclosure.Button>

            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Disclosure.Panel className="px-4 py-5">
                    <div className="mb-5 relative">
                        <div className='flex items-center'>
                            <label className="block text-subHeader text-sm font-medium">
                            No. of students: 
                            </label>
                            <p className='text-base font-semibold text-header ml-2'>20</p>
                            <button onClick={() => setShowStudentList(!showStudentList)} type="button" className="w-4 h-4 ml-2">
                                {
                                    showStudentList ? 
                                    <EyeSlashIcon className="text-subHeader" />
                                    :
                                    <EyeIcon className="text-subHeader" />

                                }
                            </button>
                        </div>
                    </div>
                    <div className="mb-5 relative">
                        <div className='flex items-center'>
                            <label className="block text-subHeader text-sm font-medium">
                            No. of activities: 
                            </label>
                            <p className='text-base font-semibold text-header ml-2'>3</p>
                            <button onClick={() => setShowActivitiesList(!activitiesList)} type="button" className="w-4 h-4 ml-2">
                                {
                                    activitiesList ? 
                                    <EyeSlashIcon className="text-subHeader" />
                                    :
                                    <EyeIcon className="text-subHeader" />

                                }
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className=" text-gray-500 font-bold">
                            <span className="text-sm leading-none">
                                Active: 
                            </span>
                            <input defaultChecked className="ml-2 leading-tight" type="checkbox"/>
                        </label>
                    </div>
                </Disclosure.Panel>
            </Transition>
            </>
        )
      }
    </Disclosure>
  )
}

export default SectionDetailsView