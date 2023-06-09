import MainLayout from "@/components/layouts/MainLayout"
import AdminContainer from "@/modules/admin/admin/AdminContainer";
import useAppStore from "@/store/appStore";

const Admin = () => {
  const { user, isAuthenticating } = useAppStore((state) => ({
    user: state.user,
    isAuthenticating: state.isAuthenticating,

  }))
  return (
    <MainLayout pageTitle="Admin" role={user?.role}> 
        <AdminContainer />
    </MainLayout>
  )
}
Admin.isPrivate = true

export default Admin