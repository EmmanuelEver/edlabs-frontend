import { ISection } from "@/types/types"
import { FC } from "react"
import StudentSectionsView from "./StudentSectionsView"

interface IProps {

}

const sections: ISection[] = [
    {
        internal_id: "1ksal12-12312-1231",
        sectionName: "INTRODUCTION TO C",
        sectionCode: "ITC1",
        sectionInstructor: "Emman Lopez",
        totalActivities: 3,
        submittedActivities: 0,
        isActive: true
    },
    {
        internal_id: "1af2al12-19213-1231",
        sectionName: "ADVANCED TO C",
        sectionCode: "ITC2",
        sectionInstructor: "John Doe",
        totalActivities: 5,
        submittedActivities: 0,
        isActive: true
    }
]

const StudentSectionsContainer: FC<IProps> = () => {

    const activeSections = sections.filter(section => section.isActive).length

  return (
    <StudentSectionsView sections={sections} activeSections={activeSections} />
  )
}

export default StudentSectionsContainer