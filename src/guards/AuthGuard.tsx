import LoadingScreen from "@/components/loader/LoadingScreen"
import { useAuth } from "@/hooks"
import { useRouter } from "next/router"
import { FC, PropsWithChildren, useEffect } from "react"

interface IProps extends PropsWithChildren {
}

const AuthGuard: FC<IProps> = ({children}): any => {
  const router = useRouter()
  const {user, logout, isAuthenticating, isAuthenticated} = useAuth()

  useEffect(() => {
    if(!isAuthenticating && !isAuthenticated) {
      router.push("/login")
    }
  }, [!isAuthenticating && !isAuthenticated])
  
  if(isAuthenticating) return <LoadingScreen />
  if(isAuthenticated && user) return <>{children}</>
}

export default AuthGuard