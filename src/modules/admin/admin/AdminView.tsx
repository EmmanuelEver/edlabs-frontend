import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import UserListContainer from './parts/userList/UserListContainer'

const AdminView = () => {
  return (
    <div className="flex flex-col w-full h-full p-4">
        <Tab.Group>
            <Tab.List className="flex flex-shrink-0 p-1 space-x-1 w-fit rounded-xl bg-blue-900/20">
                <Tab
                    className={({ selected }) =>
                        clsx(
                        'w-full whitespace-nowrap rounded-lg py-1.5 px-8 text-sm font-medium leading-5 text-dark-header',
                        'ring-white ring-opacity-60 ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-1',
                        selected
                            ? 'bg-white shadow'
                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                        )
                    }
                >
                    USERS
                </Tab>
                <Tab
                    className={({ selected }) =>
                        clsx(
                        'w-full whitespace-nowrap rounded-lg py-1.5 px-8 text-sm font-medium leading-5  text-dark-header',
                        'ring-white ring-opacity-60 ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-1',
                        selected
                            ? 'bg-white shadow'
                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                        )
                    }
                >
                    SECTIONS
                </Tab>
            </Tab.List>
            <Tab.Panels className="flex-1 w-full mt-4 overflow-hidden">
                <Tab.Panel className="h-full">
                    <UserListContainer />
                </Tab.Panel>
                <Tab.Panel>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    </div>
  )
}

export default AdminView