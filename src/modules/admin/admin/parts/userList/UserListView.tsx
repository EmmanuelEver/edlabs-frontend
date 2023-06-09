import { FC } from "react"

import { User } from "@/types/types"
import UserManageContainer from "./parts/UserManageContainer";

interface IProps {
  data: User[]
  setEditUser: (userId: string) => void;
  editUser: string;
  closeModal: () => void;
  selectedUser: User | null;
  revalidate: any;
}

const UserListView: FC<IProps> = ({ data, setEditUser, editUser, closeModal, selectedUser, revalidate }) => {
  return (
    <div className="w-full h-full overflow-hidden">

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-dark-100">
          <thead className="text-xs text-dark-100  uppercase bg-accentColor-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Fullname
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                First name
              </th>
              <th scope="col" className="px-6 py-3">
                Last name
              </th>
              <th scope="col" className="px-6 py-3">
                Created
              </th>
              <th className="px-6 py-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              data?.map((user) => (
                <tr key={user.id} className=" border-b bg-light-400 text-dark-header border-light-300  hover:bg-opacity-50">
                  <th scope="row" className="px-6 py-4 font-medium text-dark-header whitespace-nowra">
                    {user.name}
                  </th>
                  <td className="px-6 py-4">
                    {user.role}
                  </td>
                  <td className="px-6 py-4">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    {user.firstname}
                  </td>
                  <td className="px-6 py-4">
                    {user.lastname}
                  </td>
                  <td className="px-6 py-4">
                    {user.createdAt}
                  </td>

                  <td className="px-6 py-4 text-left">
                    <button onClick={() => setEditUser(user.id || "")} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Manage</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {
        !!editUser && <UserManageContainer revalidate={revalidate} user={selectedUser} closeModal={closeModal} />
      }
    </div >
  )
}

export default UserListView