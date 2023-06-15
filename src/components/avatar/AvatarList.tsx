import { IStudent } from "@/types/types"
import { FC } from "react";
import Avatar from "./Avatar";

interface IProps {
    userList: IStudent[];
    maxUsers?: number;
}

const AvatarList: FC<IProps> = ({userList, maxUsers=5}) => {
  return (
    <div className="flex flex-nowrap">
        {
            userList?.slice(0, maxUsers).map((user, idx) => (
                <div key={idx} style={{transform: `translateX(-${idx * 10}px)`}}>
                    <Avatar key={idx} image={user.profileUrl} name={user.name} />
                </div>
            ))
        }
        {
            maxUsers <= userList?.length &&
            <div className="" style={{transform: `translateX(-${maxUsers * 10}px)`}}>
                <div title={`${userList?.length - maxUsers} more`} className="flex items-center justify-center w-8 h-8 overflow-hidden border rounded-full bg-dark-header bg-opacity-70 border-light-300">
                    <p className="text-sm leading-none text-light-100 ">
                        +{userList?.length - maxUsers}
                    </p>
                </div>            
            </div>
        }
    </div>
  )
}

export default AvatarList