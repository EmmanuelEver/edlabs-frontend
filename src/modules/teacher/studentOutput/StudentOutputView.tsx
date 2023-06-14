import { User } from "@/types/types";
import Image from "next/image";
import { FC } from "react"
import StudentAllOutputView from "./parts/StudentAllOutputView";
import StudentSectionOutputView from "./parts/StudentSectionOutputView";

interface IProps {
  user: User | undefined;
  showOnlySpecificSection: any;
}

const StudentOutputView:FC<IProps> = ({user, showOnlySpecificSection}) => {
  return (
    <div className="flex flex-col w-full h-full p-6">
      <div className="flex items-center pb-6 border-b flex-nowrap border-light-300">
          {
            !!user && 
            <>
              <div className="w-20 h-20 overflow-hidden rounded-full">
                <Image className="object-contain w-full h-full rounded-full" width={50} height={50} src={user.profileUrl} alt={user.name} />
              </div>
              <div className="flex-col items-center ml-4">
                <h2 className="text-xl font-medium text-header">{user.name}</h2>
                <p className="text-base cursor-pointer text-subHeader">{user.email}</p>
              </div>
            </>
          }
      </div>
      <div className="relative flex-1 w-full overflow-y-auto">
          {
            !!showOnlySpecificSection ?
            <StudentSectionOutputView />
            :
            <StudentAllOutputView />
          }
      </div>
    </div>
  )
}

export default StudentOutputView