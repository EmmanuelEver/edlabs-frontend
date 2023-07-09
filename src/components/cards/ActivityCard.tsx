import { IActivitySummary } from "@/types/types"
import { FC, PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
    [rest:string]: any;
}


const ActivityCard: FC<IProps> = ({children, rest}) => {
  return (
    <article {...rest} className="relative w-full p-5 transition-shadow rounded-lg shadow-md bg-light-100 hover:shadow-lg">
       {children}
    </article>
  )
}

export default ActivityCard