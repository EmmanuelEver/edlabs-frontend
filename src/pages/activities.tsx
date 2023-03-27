import { FC } from "react"
import StudentsActivitiesContainer from "@/modules/student/activities/StudentsActivitiesContainer";
import TeacherActivitiesContainer from "@/modules/teacher/activities/TeacherActivitiesContainer";
import { ROLES } from "@/types/types";
import MainLayout from "@/components/layouts/MainLayout";

type TProps = {
    role: ROLES;
}

const ActivitiesPage: FC<TProps> = ({role}) => {
  console.log(role)
  return (
    <MainLayout role={role} pageTitle="Activities">
        {
            role === "STUDENT" ?
            <StudentsActivitiesContainer />
            :
            role === "TEACHER" ?
                <TeacherActivitiesContainer />
            :
            null
        }
    </MainLayout>
  )
}

export default ActivitiesPage