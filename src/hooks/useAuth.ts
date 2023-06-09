import { api, apiPrivate } from "@/services/axios"
import useAppStore from "@/store/appStore"
import { useRouter } from "next/router"
import { useEffect } from "react"
import useAxiosInterceptors from "./useAxiosInterceptors"

const useAuth = () => {
    const router = useRouter()
    const {setupInterceptors, ejectInterceptors, refresh} = useAxiosInterceptors()
    const { user, setUser, setIsAuthenticating, isAuthenticated, isAuthenticating } = useAppStore((state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isAuthenticating: state.isAuthenticating,
        setUser: state.setUser,
        setIsAuthenticating: state.setIsAuthenticating
        
    }))

    function logout() {
        
    }

    async function validateUser() {
        //get user data
        setIsAuthenticating(true)
        const token = localStorage?.getItem("edlat")
        try {
            const resp = await api.get("/me", {headers: {Authorization: `Bearer ${token}`}})
            if(resp.status === 200) {
                setUser(resp.data)
                setIsAuthenticating(false)
            }
            setIsAuthenticating(false)
        } catch (error: any) {
            if(error.response.status === 401) {
                try {
                    ejectInterceptors()
                    await refresh()
                    setupInterceptors()
                    const resp = await apiPrivate.get("/me")
                    if(resp.status === 200) {
                        setUser(resp.data)
                        return setIsAuthenticating(false)
                    }
                    setIsAuthenticating(false)
                } catch (error) {
                    console.log(error)
                    setIsAuthenticating(false)
                    router.push("/login")
                    localStorage.removeItem("edlat")
                    setIsAuthenticating(false)
                    throw error
                }
            }
            setIsAuthenticating(false)
            router.push("/login")
            localStorage.removeItem("edlat")
            setIsAuthenticating(false)
        }
        setIsAuthenticating(false)

    }

    useEffect(() => {
        const token = localStorage.getItem("edlat")
            if(!token) {
                router.push("/login")
                setIsAuthenticating(false)
            }
            else {
                if(!isAuthenticated && !user) {
                    setupInterceptors()
                    validateUser()
                }
            }
    }, [])

    return {user, logout, isAuthenticating, isAuthenticated}
}

export {useAuth}