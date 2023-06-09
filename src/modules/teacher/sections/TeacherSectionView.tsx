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
}

const TeacherSectionView: FC<IProps> = ({ sections, activeSections, handleSelectSection, selectedSection}) => {
  return (
    <div className="py-6 px-10">
        <div className="flex items-center justify-between">
            <div className="flex">
                <p className="text-sm font-semibold">
                    <span className="text-accentColor-100">ACTIVE:  </span>
                    <span className="text-subHeader ml-2">{activeSections} {activeSections > 1 ? "Sections" : "Section"}</span>
                </p>
            </div>
            <CreateSectionContainer />
        </div>
        <div className="mt-6">
            <table className="w-full table-fixed">
                <thead>
                    <tr>
                    <th colSpan={3} className='text-xs font-light text-left text-subHeader pb-2 pl-16'>TITLE</th>
                      <th colSpan={2} className='text-xs font-light text-left text-subHeader pb-2'>SHORTCODE</th>
                      <th colSpan={2} className='text-xs font-light text-left text-subHeader pb-2'>ACCESSKEY</th>
                      <th colSpan={2} className='text-xs font-light text-left text-subHeader pb-2'>ACTIVITIES</th>
                      <th colSpan={1} className='text-xs font-light text-left text-subHeader pb-2'>STUDENTS</th>
                      <th colSpan={3} className='text-xs font-light text-left text-subHeader pb-2'></th>
                      <th colSpan={2} className='text-xs font-light text-left text-subHeader pb-2'>STATUS</th>
                      <th colSpan={1} className='text-xs font-light text-left text-subHeader pb-2'></th>

                    </tr>
                </thead>
                <tbody>
                    {
                        sections?.map((section, idx) => (
                            <SectionRowView key={section.id} oddRow={idx%2 === 0} handleSelectSection={handleSelectSection} section={section} />
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