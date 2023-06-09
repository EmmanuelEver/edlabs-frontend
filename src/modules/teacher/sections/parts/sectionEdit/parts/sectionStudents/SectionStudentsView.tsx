import { FC } from 'react';
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon, CheckIcon, NoSymbolIcon, LockOpenIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx';
import Avatar from '@/components/avatar/Avatar';
import { IStudent } from '@/types/types';




interface IProps {
  students: IStudent[] | undefined;
  updateStatus: (status: string | undefined, studentId: string) => void
}

const SectionStudentsView: FC<IProps> = ({students, updateStatus}) => {
  return (
    <Disclosure>
    {
      ({open}) => (
          <>
          <Disclosure.Button className="px-4 py-2.5 flex justify-between hover:bg-light-300  w-full border-b border-light-300">
              <span>Students</span>
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
              <Disclosure.Panel className="px-4 py-5 border-b border-light-300">
                <table className="w-full table-fixed">
                  <thead>
                    <tr>
                      <th colSpan={4} className='text-[10px] font-light text-subHeader pb-2 pl-2'>NAME</th>
                      <th colSpan={5} className='text-[10px] font-light text-subHeader pb-2'>EMAIL</th>
                      <th colSpan={2} className='text-[10px] font-light text-subHeader pb-2'>STATUS</th>
                      <th colSpan={2} className='text-[10px] font-light text-subHeader pb-2 pl-2'>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      students?.map((student, idx) => (
                        <tr key={student?.id} className={clsx("border-b border-light-300", idx%2 === 0 ? "bg-light-300 bg-opacity-50" : "bg-transparent")}>
                          <td colSpan={4} className='py-1.5 pl-2'>
                            <div className="flex items-center">
                              <Avatar wrapperClassName="w-3 h-3" image={student?.profileUrl} name={student?.name} />
                              <p className='text-[11px] ml-1.5 font-medium text-header truncate'>{student?.name}</p>
                            </div>
                          </td>
                          <td colSpan={5} className='py-1.5 pl-2'>
                            <p className='text-[11px] font-medium text-header truncate'>{student?.email}</p>
                          </td>
                          <td colSpan={2} className='py-1.5'>
                            <p className='text-[10px]   font-medium text-header'>{student?.status}</p>
                          </td>
                          <td colSpan={2} className='py-1.5 pl-2 pr-2'>
                            {
                              student?.status === "PENDING" && 
                              <button onClick={() => updateStatus(student?.status, student?.studentId)} className='flex items-center hover:text-blue-600'>
                                <CheckIcon className="w-4 h-4 mr-1" />
                                <span className='text-[10px]'>Approve</span>
                              </button>
                            }

                            {
                              student?.status === "APPROVED" && 
                              <button onClick={() => updateStatus(student?.status, student?.studentId)} className='flex items-center hover:text-red-600'>
                                <NoSymbolIcon className="w-4 h-4 mr-1" />
                                <span className='text-[10px]'>Block</span>
                              </button>
                            }

                            {
                              student?.status === "BLOCKED" && 
                              <button onClick={() => updateStatus(student?.status, student?.studentId)} className='flex items-center hover:text-red-600'>
                                <LockOpenIcon className="w-4 h-4 mr-1" />
                                <span className='text-[10px]'>Unblock</span>
                              </button>
                            }
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </Disclosure.Panel>
          </Transition>
          </>
      )
    }
  </Disclosure>
  )
}

export default SectionStudentsView