import { User } from '@/types/types'
import { create } from 'zustand'

interface AppState {
    user: User | null;
    isAuthenticating: boolean;
    isAuthenticated: boolean;
    setUser: (user:User | null) => void;
    setIsAuthenticating: (val: boolean) => void;

}

const initialUser: User = {
    name: "",
    email: "",
    profileUrl: "",
    role: "STUDENT"
}


const useAppStore = create<AppState>((set) => (
    {
        user: null,
        isAuthenticating: true,
        isAuthenticated: false,
        setUser: (user: User | null) => set(() => {
            if(!user) {
                return {user: null, isAuthenticated: false}
            }
            return { user, isAuthenticated: true}
        }),
        setIsAuthenticating: (val: boolean) => set(() => ({isAuthenticating: val}))
    }
)) 

export default useAppStore