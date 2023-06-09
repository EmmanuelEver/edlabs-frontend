import { FC, Fragment } from "react"
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { AtSymbolIcon, CalendarDaysIcon, UserCircleIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import Avatar from "@/components/avatar/Avatar"
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"
dayjs.extend(localizedFormat)
import { ROLES, User } from "@/types/types";


interface IProps {
    closeModal: () => void
    user: User | null;
    handleChangeRole: (role: ROLES) => void;
}

const roles = [
    "STUDENT",
    "TEACHER",
    "ADMIN"
]

const UserManageView: FC<IProps> = ({ closeModal, user, handleChangeRole }) => {
    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-modal" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className=" w-96 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                        >
                            <div className="flex items-center gap-2">
                                <Avatar image={user?.profileUrl} name={user?.name} />
                                <div className="flex flex-col items-left">
                                    <div className="text-base text-dark-100">
                                        {user?.name}
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        {user?.role}
                                    </p>
                                </div>
                            </div>
                        </Dialog.Title>
                        <div className="mt-6 flex items-center">
                            <div className="w-4 h-4 translate-y-0.5 mr-2">
                                <AtSymbolIcon />
                            </div>
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex mt-1 items-center">
                            <div className="w-4 h-4 translate-y-0.5 mr-2">
                                <CalendarDaysIcon title="User role" />
                            </div>
                            <span>{dayjs(user?.createdAt).format("LLLL")}</span>
                        </div>
                        <div className="flex mt-2 items-center">
                            <div className="w-5 h-5 translate-y-0.5 mr-2">
                                <UserCircleIcon />
                            </div>
                            <Listbox value={user?.role} onChange={handleChangeRole}>
                                <div className="relative mt-1">
                                    <Listbox.Button className="relative w-36  cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                        <span className="block">{user?.role}</span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon
                                                className="h-5 w-5 text-gray-400"
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
                                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {roles.map((role, personIdx) => (
                                                <Listbox.Option
                                                    key={personIdx}
                                                    className={({ active }) =>
                                                        `relative cursor-default select-none py-2 pl-10 pr-10 ${active ? 'bg-accentColor-200 text-amber-900' : 'text-dark-100 text-opacity-50'
                                                        }`
                                                    }
                                                    value={role}
                                                >
                                                    {({ selected }) => (
                                                        <>
                                                            <span
                                                                className={`block cursor-pointer ${selected ? 'font-medium text-dark-100' : 'font-normal'
                                                                    }`}
                                                            >
                                                                {role}
                                                            </span>
                                                            {selected ? (
                                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </Listbox>
                        </div>
                        <div className="mt-20 flex items-center gap-2">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-accentColor-200 bg-transparent px-4 py-2 text-sm font-medium text-dark-100 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={closeModal}
                            >
                                Delete
                            </button>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog >
        </Transition >
    )
}

export default UserManageView