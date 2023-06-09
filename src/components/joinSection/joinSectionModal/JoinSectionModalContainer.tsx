import { apiPrivate } from "@/services/axios";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import JoinSectionView from "./JoinSectionModalView";
import {useSWRConfig} from "swr"

interface IProps {
    show: boolean;
    onClose: () => void
}

export interface IFormStruct {
    sectionCode: string;
}

const JoinSectionModalContainer: FC<IProps> = ({ show, onClose }) => {
    const {register, reset, handleSubmit, formState:{isSubmitting, isDirty, isSubmitSuccessful}} = useForm({
        defaultValues: {
            accessCode: ""
        }
    })
    const {mutate} = useSWRConfig()
    async function onSubmit(val: IFormStruct) {
        try {
            const resp = await apiPrivate.post(`/sections/join`, JSON.stringify({...val}))
            console.log({resp})
            await mutate("/sections")
            reset({accessCode: ""})
            setTimeout(() => {
                onClose()
            }, 1500)
        } catch (error) {
            console.log(error)
            alert("An error occured while joining section")
        }
    }

    return (
        <JoinSectionView register={register} isSubmitting={isSubmitting} isDirty={isDirty} show={show} onClose={onClose} handleSubmit={handleSubmit} onSubmit={onSubmit}/>
    )
}

export default JoinSectionModalContainer