import MainLayout from "@/components/layouts/MainLayout"
import AdminContainer from "@/modules/admin/admin/AdminContainer";
import useAppStore from "@/store/appStore";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Admin = () => {
  const router = useRouter()
  const { user, isAuthenticating } = useAppStore((state) => ({
    user: state.user,
    isAuthenticating: state.isAuthenticating,

  }))
  useEffect(() => {
    if(!isAuthenticating) {
      if(user && user.role !== "ADMIN") {
        router.replace("/")
      }
    }
  }, [user, isAuthenticating])
  return (
    <MainLayout pageTitle="Admin" role={user?.role}> 
        <AdminContainer />
    </MainLayout>
  )
}
Admin.isPrivate = true

export default Admin