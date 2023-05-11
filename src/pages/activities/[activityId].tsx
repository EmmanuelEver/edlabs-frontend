import MainLayout from "@/components/layouts/MainLayout";
import StudentActivityContainer from "@/modules/student/activity/StudentActivityContainer";
import TeacherSectionContainer from "@/modules/teacher/sections/TeacherSectionContainer";
import { ROLES } from "@/types/types";
import { FC } from "react";

interface IProps{
    role: ROLES;
}

const ActivityPage: FC<IProps> = ({role}) => {
  return (
    <MainLayout role={role} pageTitle="Activity">
        {
            role === "STUDENT" ?
                <StudentActivityContainer />
            :
            role === "TEACHER" ?
                <TeacherSectionContainer />
            :
            null
        }
    </MainLayout>
  )
}

export default ActivityPage