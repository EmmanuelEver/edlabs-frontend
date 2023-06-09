import useFetch from "@/hooks/useFetch"
import { User } from "@/types/types"
import { useState } from "react"
import UserListView from "./UserListView"

const UserListContainer = () => {
  const {data, isLoading, revalidate} = useFetch("/users")
  const [editUser, setEditUser] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  function handleCloseModal() {
    setEditUser("")
    setSelectedUser(null)
  }
  function handleSelectuser (id: string) {
    const user = data?.filter((item: User) => item.id === id)[0]
    if(user) {
      setEditUser(id)
      setSelectedUser(user)
    }
  }

  return (
    <UserListView revalidate={revalidate} closeModal={handleCloseModal} data={data} selectedUser={selectedUser} editUser={editUser} setEditUser={handleSelectuser} />
  )
}

export default UserListContainer