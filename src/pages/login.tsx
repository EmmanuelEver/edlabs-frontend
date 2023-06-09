import LoadingScreen from "@/components/loader/LoadingScreen"
import { api } from "@/services/axios"
import { Transition } from '@headlessui/react'
import clsx from "clsx"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
/*global google*/
const LoginPage = () => {
    const router = useRouter()
    const [loadingScreen, setLoadingScreen] = useState(true)
    const [loading, setLoading] = useState(false)


    function handleCallbackResponse(response: any) {
        loginToApi(response.credential)
    }

    async function loginToApi(token: string) {
        setLoading(true)
        try {
            const resp = await api.post("/auth/google-login", JSON.stringify({token}), {withCredentials: true})
            if(resp.status === 201) {
                localStorage.setItem("edlat", resp.data.accessToken)
                router.push("/")
            } else {
                alert("Sign in failed")
                setLoading(false)
            }
        } catch (error:any) {
            alert(error?.response?.data.error || "Sign in failed")
            setLoading(false)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("edlat")
        if(token) {
            router.push("/")
        } else {
            setLoadingScreen(false)
        }
    }, [])

    useEffect(() => {
        /*global google*/
        if ("google" in window) {
            const elem: any = document.getElementById("googleSignIn")
            const client_id: any = process.env.NEXT_PUBLIC_GOOGLE_CLIENT
            google.accounts.id.initialize({
                client_id: client_id,
                callback: handleCallbackResponse
            })
            google.accounts.id.renderButton(
                elem,
                {
                    theme: "outline", size: "large", width: "310px", type: "standard", text: "continue_with"
                }
            )
        }
    }, [])
    return (
        <>
        {
            loadingScreen &&
                <LoadingScreen />
        }
        <div className="flex items-stretch w-screen min-h-screen overflow-hidden flex-nowrap bg-light-200">
                    <div className="flex items-center justify-center w-1/2 bg-blue-100">
                        <Image src="/images/logo-full-transparent.png" alt="" width={550} height={350} />
                    </div>
                    <div className="flex flex-col items-center justify-center w-1/2 px-20">
                        <h1 className="font-sans text-3xl font-medium text-center text-header">Sign in</h1>
                        <p className="mt-4 text-sm text-center text-body">Have problem Signing in? please refresh the page <br/> or message us at <a className="font-medium" href="mailmailto:edlabs2022@gmail.com">edlabs2022@gmail.com</a></p>
                        <div id="googleSignIn" className={clsx("mt-8 max-w-xs w-full")}>
                            {/* <button className="flex items-center w-full justify-center rounded shadow py-2.5 px-5 hover:bg-light-300 transition-all active:scale-95">
                                <span className="font-light text-body text-sm mr-2.5">Sign in with Google </span>
                                <Image src="/images/google-logo.png" alt="" width={30} height={30} />
                            </button> */}
                        </div>
                        <Transition show={loading}>
                            <div className="flex items-center mt-8">
                                <Image src="/images/spinning-circles.svg" alt="loading" width={40} height={40} />
                            </div>
                        </Transition>
                    </div>
                </div>
        </>
    )
}

export default LoginPage