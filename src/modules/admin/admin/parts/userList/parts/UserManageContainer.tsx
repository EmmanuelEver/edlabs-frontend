import { apiPrivate } from "@/services/axios";
import { ROLES, User } from "@/types/types"
import { FC, useState } from "react"
import UserManageView from "./UserManageView"

interface IProps {
    user: User | null;
    closeModal: () => void;
    revalidate: any;
}

const UserManageContainer: FC<IProps> = ({user, closeModal, revalidate}) => {
    const [loading, setLoading] = useState(false)

    async function handleChangeRole(val: ROLES) {
        setLoading(true)
        try {
            const resp = await apiPrivate.put(`/users/role/${user?.id}`, JSON.stringify({role: val}))
            console.log(resp)
            await revalidate()
        } catch (error) {
            alert("An error occured")
        }
    }

    return (
        <UserManageView closeModal={closeModal} user={user} handleChangeRole={handleChangeRole} />
    )
}

export default UserManageContainer