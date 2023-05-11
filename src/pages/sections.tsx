import MainLayout from "@/components/layouts/MainLayout";
import StudentSectionsContainer from "@/modules/student/sections/StudentSectionsContainer";
import TeacherSectionContainer from "@/modules/teacher/sections/TeacherSectionContainer";
import { ROLES } from "@/types/types";

type TProps = {
    role: ROLES;
}
const sections = ({role}: TProps) => {
  return (
    <MainLayout role={role} pageTitle="Sections">
        {
            role === "STUDENT" ?
                <StudentSectionsContainer />
            :
            role === "TEACHER" ?
              <TeacherSectionContainer />
            :
            null
        }
    </MainLayout>
  )
}

export default sections