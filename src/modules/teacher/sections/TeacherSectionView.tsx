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
    <div className="relative px-10 py-6">
        {
            (isLoading && !sections) && <LoadingComponent />
        }
        <div className="flex items-center justify-between">
            {/* <div className="flex">
                <p className="text-sm font-semibold">
                    <span className="text-accentColor-100">ACTIVE:  </span>
                    <span className="ml-2 text-subHeader">{activeSections} {activeSections > 1 ? "Sections" : "Section"}</span>
                </p>
            </div> */}
            <CreateSectionContainer />
        </div>
        <div className="mt-6">
            <table className="w-full table-fixed">
                <thead>
                    <tr>
                    <th colSpan={3} className='pb-2 pl-16 text-xs font-light text-left text-subHeader'>TITLE</th>
                      <th colSpan={2} className='pb-2 text-xs font-light text-left text-subHeader'>SHORTCODE</th>
                      <th colSpan={2} className='pb-2 text-xs font-light text-left text-subHeader'>ACCESSKEY</th>
                      <th colSpan={2} className='pb-2 text-xs font-light text-left text-subHeader'>ACTIVITIES</th>
                      <th colSpan={4} className='pb-2 text-xs font-light text-left text-subHeader'>STUDENTS</th>
                      <th colSpan={2} className='pb-2 text-xs font-light text-left text-subHeader'>STATUS</th>
                      <th colSpan={1} className='pb-2 text-xs font-light text-left text-subHeader'></th>

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