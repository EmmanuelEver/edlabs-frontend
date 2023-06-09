import { apiPrivate } from "@/services/axios";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import JoinSectionView from "./JoinSectionModalView";
import {useSWRConfig} from "swr"
import useToast from "@/hooks/useToast";

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
    const {toast} = useToast()
    async function onSubmit(val: IFormStruct) {
        try {
            const resp = await apiPrivate.post(`/sections/join`, JSON.stringify({...val}))
            await mutate("/sections")
            reset({accessCode: ""})
            setTimeout(() => {
                toast("SUCCESS", resp?.data.message || "Request to join submitted!")
                onClose()
            }, 1500)
        } catch (error: any) {
            console.log(error)
            toast("DANGER", error?.response?.data.message || "An error occured while joining section")
        }
    }

    function handleClose() {
        if(!isSubmitting) onClose()
    }

    return (
        <JoinSectionView register={register} isSubmitting={isSubmitting} isDirty={isDirty} show={show} onClose={handleClose} handleSubmit={handleSubmit} onSubmit={onSubmit}/>
    )
}

export default JoinSectionModalContainer