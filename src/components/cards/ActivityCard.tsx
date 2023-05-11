import { IActivitySummary } from "@/types/types"
import { FC, PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
    [rest:string]: any;
}


const ActivityCard: FC<IProps> = ({children, rest}) => {
  return (
    <article {...rest} className="rounded-lg shadow-md p-5 bg-light-100 w-full hover:shadow-lg cursor-pointer transition-shadow">
       {children}
    </article>
  )
}

export default ActivityCard