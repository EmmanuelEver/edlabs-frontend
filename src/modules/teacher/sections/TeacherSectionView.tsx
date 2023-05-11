import { ITeacherSection } from '@/types/types';
import { FC } from 'react';
import CreateSectionContainer from './parts/createSection/CreateSectionContainer';
import SectionEditContainer from './parts/sectionEdit/SectionEditContainer';
import SectionRowView from './parts/SectionRowView';

interface IProps {
    sections: ITeacherSection[];
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
                    <span className="text-subHeader ml-2">{activeSections} SECTIONS</span>
                </p>
            </div>
            <CreateSectionContainer />
        </div>
        <div className="mt-6">
            <table className="w-full table-fixed">
                <tbody>
                    {
                        sections?.map(section => (
                            <SectionRowView key={section.internal_id} handleSelectSection={handleSelectSection} section={section} />
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