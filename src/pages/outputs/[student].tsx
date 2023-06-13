import MainLayout from "@/components/layouts/MainLayout"
import StudentOutputContainer from "@/modules/teacher/studentOutput/StudentOutputContainer"
import useAppStore from "@/store/appStore"
import { useRouter } from "next/router"
import { useEffect } from "react"

const StudentOutputsPage = () => {
    const router = useRouter()
    const { user, isAuthenticating } = useAppStore((state) => ({
        user: state.user,
        isAuthenticating: state.isAuthenticating,
    }))

    useEffect(() => {
        if(user?.role === "STUDENT") {
            router.replace("/")
        }
    }, [user])
    return (
        <MainLayout role={user?.role} pageTitle="Student Output">
            {
                !isAuthenticating &&
                    user?.role === "TEACHER" ?
                    <StudentOutputContainer />
                    :
                    null
            }
        </MainLayout>
    )
}
StudentOutputsPage.isPrivate = true

export default StudentOutputsPage