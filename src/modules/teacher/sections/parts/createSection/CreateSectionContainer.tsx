import useToast from "@/hooks/useToast";
import { apiPrivate } from "@/services/axios";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import CreateSectionView from "./CreateSectionView"
import {useSWRConfig}  from "swr"

export interface ICreateSectionForm {
    title: string;
    shortcode: string;
    description: string;
    isOnline: boolean;
}

const defaultValues: ICreateSectionForm = {
    title: "",
    shortcode: "",
    description: "",
    isOnline: true
}

const CreateSectionContainer = () => {
    const [showCreateModal, setShowCreateModal] = useState(false)
    const {toast} = useToast()
    const {mutate} = useSWRConfig()
    const {register, handleSubmit, reset, formState: {isSubmitting, isDirty, errors, isSubmitted}} = useForm({
        mode: "onBlur",
        shouldUnregister: true,
        defaultValues: {
            ...defaultValues
        }
    })

    async function onSubmit(val: ICreateSectionForm) {
        //Todo: send data here to BE
        try {
            const resp = await apiPrivate.post("/sections", JSON.stringify(val))
            await mutate("/sections")
            toast("SUCCESS", 'Section created!')
            setShowCreateModal(false)
        } catch (error) {
            console.log(error)
            toast("DANGER","an error occured while saving")
        }
    }

    function handleCreateSection(val:boolean) {
        if(val) setShowCreateModal(true)
        else {
            if(!isSubmitting) setShowCreateModal(false)
        }
    }

    useEffect(() => {
        reset()
    }, [isSubmitted])
    
    return (
        <CreateSectionView 
            isDirty={isDirty} 
            isSubmitting={isSubmitting} 
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register} 
            showCreateModal={showCreateModal} 
            handleCreateSection={handleCreateSection}
            errors={errors}
        />
    )
}

export default CreateSectionContainer