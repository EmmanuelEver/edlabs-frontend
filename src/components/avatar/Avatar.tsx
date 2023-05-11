import clsx from "clsx";
import Image from "next/image";
import { FC } from "react"

interface IProps {
    image?: string;
    name: string;
    wrapperClassName?: string;
}

const Avatar: FC<IProps> = ({image, name="?", wrapperClassName=""}) => {
  return (
    <div title={name} className={clsx("rounded-full flex justify-center items-center bg-light-100 w-8 h-8 border border-light-300 overflow-hidden", wrapperClassName)}>
        {
            image ?
            <Image className="w-full h-full rounded-full object-contain" width={40} height={40} src={image} alt={name} />
            :
            <p className="text-base text-dark-100 leading-none">{name[0]}</p>
        }
    </div>
  )
}

export default Avatar