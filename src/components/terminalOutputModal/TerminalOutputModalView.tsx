import { Popover, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'

const TerminalOutputModalView = ({ children, textValue }: { children: ReactNode, textValue: string }) => {
    return (
        <Popover>
            <Popover.Button>
                {children}
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="fixed overflow-y-auto -translate-x-1/2 top-1/2 left-1/2">
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
                            <div className="w-full max-w-md p-2 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <pre>
                                    {textValue}
                                </pre>
                            </div>
                        </Transition.Child>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

export default TerminalOutputModalView