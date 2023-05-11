import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import JoinSectionView from "./JoinSectionModalView";

interface IProps {
    show: boolean;
    onClose: () => void
}

export interface IFormStruct {
    sectionCode: string;
}

const JoinSectionModalContainer: FC<IProps> = ({ show, onClose }) => {
    const {register, reset, handleSubmit, formState:{isSubmitting, isDirty}} = useForm({
        defaultValues: {
            sectionCode: ""
        }
    })

    async function onSubmit(val: IFormStruct) {
        console.log(val)
        //join section logic here
        reset()
        setTimeout(() => {
            onClose()

        }, 1000)
    }


    return (
        <JoinSectionView register={register} isSubmitting={isSubmitting} isDirty={isDirty} show={show} onClose={onClose} handleSubmit={handleSubmit} onSubmit={onSubmit}/>
    )
}

export default JoinSectionModalContainer