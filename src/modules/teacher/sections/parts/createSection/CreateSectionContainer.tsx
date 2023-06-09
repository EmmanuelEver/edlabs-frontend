import { apiPrivate } from "@/services/axios";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import CreateSectionView from "./CreateSectionView"

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

    const {register, handleSubmit, reset, formState: {isSubmitting, isDirty, errors, isSubmitted}} = useForm({
        mode: "onBlur",
        shouldUnregister: true,
        defaultValues: {
            ...defaultValues
        }
    })

    function onSubmit(val: ICreateSectionForm) {
        //Todo: send data here to BE
        try {
            const resp = apiPrivate.post("/sections", JSON.stringify(val))
            console.log(resp)
        } catch (error) {
            console.log(error)
            alert("an error occured while saving")
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
            handleCreateSection={setShowCreateModal}
            errors={errors}
        />
    )
}

export default CreateSectionContainer