import { Fragment } from "react"
import { Menu, Transition } from '@headlessui/react'
import Avatar from "../avatar/Avatar";
import useAppStore from "@/store/appStore";
import { api, apiPrivate } from "@/services/axios";
import { useRouter } from "next/router";

const HeaderNavigation = () => {
    const router = useRouter()
    const { user, setUser } = useAppStore((state) => ({
        user: state.user,
        setUser: state.setUser
    }))


    async function logout() {
        try {
            const resp = await apiPrivate.post("/auth/logout", JSON.stringify({payload: null}))
            localStorage.removeItem("edlat")
            setUser(null)
            router.push("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Menu>
            <div className="relative">
                <Menu.Button>
                    <Avatar name={user?.name} image={user?.profileUrl} wrapperClassName="cursor-pointer" />
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 w-full max-w-xs min-w-fit mt-2 px-1.5 py-1 bg-light-100 shadow rounded">
                        <Menu.Item>
                            <button onClick={logout} className="w-full pl-2 py-1 pr-12 text-sm whitespace-nowrap rounded hover:bg-accentColor-200 cursor-pointer">
                                Sign off
                            </button>
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </div>
        </Menu>
    )
}

export default HeaderNavigation