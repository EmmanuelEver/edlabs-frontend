import { FC, Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { CopyBlock, atomOneDark } from "react-code-blocks";
import { IActivityFull } from '@/types/types'

interface IProps {
    wrapperClassName?: string
    details: IActivityFull | undefined;
}

const ActivityDetails:FC<IProps> = ({wrapperClassName="", details}) => {
  return (
    <Popover className="relative">
        <Popover.Button className="border-dark-header text-dark-header hover:text-opacity-100 border rounded py-1.5 px-4">
            <span>Instruction</span>
        </Popover.Button>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-x-1/2"
            enterTo="opacity-100 -translate-x-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 -translate-x-1/2"
        >
            <Popover.Panel className="fixed top-0 left-0 w-full h-screen max-w-lg p-4 transform -translate-x-1/2 shadow-lg bg-light-400 z-modal">
                <div className='h-full overflow-y-auto'>
                    <h2 className='text-3xl font-medium text-header'>{details?.title}</h2>
                    <p className='text-base text-body'>
                        {details?.section.title} ({details?.section.shortcode})
                    </p>
                    <div className='mt-4 text-body' dangerouslySetInnerHTML={{__html: details?.description || ""}}/>
                    {
                        !!details?.starterCode && 
                        <div className='mt-4'>
                            <h3 className='mb-2 font-medium text-md text-body'>Starter code:</h3>
                            <CopyBlock
                                text={details.starterCode}
                                theme={atomOneDark}
                                showLineNumbers={true}
                                language={details?.lang || "c"}
                                wrapLines
                            />
                        </div>
                    }
                </div>
            </Popover.Panel>
        </Transition>
    </Popover>
  )
}

export default ActivityDetails