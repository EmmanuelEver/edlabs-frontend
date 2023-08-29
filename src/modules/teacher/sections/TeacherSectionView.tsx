import LoadingComponent from '@/components/loader/LoadingComponent';
import { ITeacherSection } from '@/types/types';
import { FC } from 'react';
import CreateSectionContainer from './parts/createSection/CreateSectionContainer';
import SectionEditContainer from './parts/sectionEdit/SectionEditContainer';
import SectionRowView from './parts/SectionRowView';

interface IProps {
    sections: ITeacherSection[] | undefined;
    activeSections: number;
    handleSelectSection: (id:string) => void;
    selectedSection: any;
    isLoading: boolean;
    deleteSection: (id:string, name: string) => void;
    isDeleting: boolean
}

const TeacherSectionView: FC<IProps> = ({ sections, activeSections, handleSelectSection, selectedSection, isLoading, isDeleting, deleteSection}) => {
  return (
    <div className="relative flex flex-col h-full px-6 py-6">
        {
            (isLoading && !sections) && <LoadingComponent />
        }
        <div className="flex-1 py-6 mt-6 rounded shadow bg-light-100">
        <div className="flex items-center justify-between flex-shrink-0 px-6 mb-6">
            {/* <div className="flex">
                <p className="text-sm font-semibold">
                    <span className="text-accentColor-100">ACTIVE:  </span>
                    <span className="ml-2 text-subHeader">{activeSections} {activeSections > 1 ? "Sections" : "Section"}</span>
                </p>
            </div> */}
            <CreateSectionContainer />
        </div>
            <table className="w-full table-fixed">
                <thead>
                    <tr className='border-t border-b border-light-300'>
                    <th colSpan={3} className='py-2 pb-2 pl-16 text-xs font-light text-left text-subHeader'>TITLE</th>
                      <th colSpan={2} className='py-2 pb-2 text-xs font-light text-left text-subHeader'>SHORTCODE</th>
                      <th colSpan={2} className='py-2 pb-2 text-xs font-light text-left text-subHeader'>ACCESSKEY</th>
                      <th colSpan={2} className='py-2 pb-2 text-xs font-light text-left text-subHeader'>ACTIVITIES</th>
                      <th colSpan={4} className='py-2 pb-2 text-xs font-light text-left text-subHeader'>STUDENTS</th>
                      <th colSpan={2} className='py-2 pb-2 text-xs font-light text-left text-subHeader'>STATUS</th>
                      <th colSpan={1} className='py-2 pb-2 text-xs font-light text-left text-subHeader'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sections?.map((section, idx) => (
                            <SectionRowView key={section.id} oddRow={idx%2 === 0} handleSelectSection={handleSelectSection} section={section} deleteSection={deleteSection} isDeleting={isDeleting} />
                        ))
                    }
                </tbody>
            </table>
        </div>
        {
            !!selectedSection && <SectionEditContainer selectedSection={selectedSection} />
        }
    </div>
  )
}

export default TeacherSectionView