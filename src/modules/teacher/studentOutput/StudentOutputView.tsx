import { User } from "@/types/types";
import Image from "next/image";
import { FC } from "react"
import StudentActivityOutputView from "./parts/StudentActivityOutputView";
import StudentAllOutputView from "./parts/StudentAllOutputView";
import StudentSectionOutputView from "./parts/StudentSectionOutputView";

interface IProps {
  user: User | undefined;
  showOnlySpecificSection: string;
  revalidate: any;
  isValidating: boolean;
}

const StudentOutputView: FC<IProps> = ({ user, showOnlySpecificSection, revalidate, isValidating }) => {
  return (
    <div className="flex flex-col w-full h-full p-6">
      {
        (showOnlySpecificSection === "" || showOnlySpecificSection === "section")  &&
        <div className="flex items-center pb-6 border-b flex-nowrap border-light-300">
          {
            !!user &&
            <>
              <div className="overflow-hidden rounded-full w-14 h-14">
                <Image className="object-contain w-full h-full rounded-full" width={50} height={50} src={user.profileUrl} alt={user.name} />
              </div>
              <div className="flex-col items-center ml-4">
                <h2 className="text-xl font-medium text-header">{user.name}</h2>
                <p className="text-base cursor-pointer text-subHeader">{user.email}</p>
              </div>
            </>
          }
        </div>
      }
      {
        showOnlySpecificSection === "activity" ?
          <StudentActivityOutputView />
          :
          showOnlySpecificSection === "section" ?
          <div className="relative flex-1 w-full overflow-y-auto">
            <StudentSectionOutputView revalidate={revalidate} isValidating={isValidating} />
            </div>
            :
            <div className="relative flex-1 w-full overflow-y-auto">
              <StudentAllOutputView />
            </div>
      }
    </div>
  )
}

export default StudentOutputView