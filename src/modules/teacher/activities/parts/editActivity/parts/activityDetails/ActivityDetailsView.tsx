import { IActivityFull } from '@/types/types'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import { ChangeEvent, FC } from 'react'

interface IProps {
    data: IActivityFull;
    handleChangeStatus: (e: ChangeEvent<HTMLInputElement>) => void;
    changingOnlineStatus: boolean;
}

const ActivityDetailsView:FC<IProps> = ({data, handleChangeStatus, changingOnlineStatus}) => {
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
                        <span className="text-base font-medium leading-none">
                            {data?.section?.title}
                        </span>
                    </div>
                    <div className="mb-5 relative">

                    </div>
                    <div>
                        <label className="flex items-center text-gray-500 font-bold">
                            <span className="text-sm leading-none">
                                Active: 
                            </span>
                            <input disabled={changingOnlineStatus} onChange={handleChangeStatus} checked={data?.isOnline || false} className="ml-2 leading-tight" type="checkbox"/>
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

export default ActivityDetailsView