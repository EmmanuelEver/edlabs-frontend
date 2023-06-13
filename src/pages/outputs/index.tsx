import MainLayout from "@/components/layouts/MainLayout"
import OutputsContainer from "@/modules/teacher/outputs/OutputsContainer"
import useAppStore from "@/store/appStore"
import { useRouter } from "next/router"
import { useEffect } from "react"

const OutputsPage = () => {
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
        <MainLayout role={user?.role} pageTitle="Outputs">
            {
                !isAuthenticating &&
                    user?.role === "TEACHER" ?
                    <OutputsContainer />
                    :
                    null
            }
        </MainLayout>
    )
}
OutputsPage.isPrivate = true

export default OutputsPage