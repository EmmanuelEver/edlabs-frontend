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
            userList.slice(0, maxUsers).map((user, idx) => (
                <div key={idx} style={{transform: `translateX(-${idx * 10}px)`}}>
                    <Avatar key={idx} image={user.avatar} name={user.username} />
                </div>
            ))
        }
        {
            maxUsers <= userList.length &&
            <div className="" style={{transform: `translateX(-${maxUsers * 10}px)`}}>
                <div title={`${userList.length - maxUsers} more`} className="rounded-full bg-dark-header bg-opacity-70 flex justify-center items-center w-8 h-8 border border-light-300 overflow-hidden">
                    <p className="text-sm text-light-100 leading-none ">
                        +{userList.length - maxUsers}
                    </p>
                </div>            
            </div>
        }
    </div>
  )
}

export default AvatarList