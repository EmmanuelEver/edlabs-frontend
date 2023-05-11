import { useState } from "react"
import { useForm } from "react-hook-form";
import CreateSectionView from "./CreateSectionView"

export interface ICreateSectionForm {
    name: string;
    shortcode: string;
    description: string;
    publish: boolean;
}

const defaultValues: ICreateSectionForm = {
    name: "",
    shortcode: "",
    description: "",
    publish: true
}

const CreateSectionContainer = () => {
    const [showCreateModal, setShowCreateModal] = useState(false)

    const {register, handleSubmit, formState: {isSubmitting, isDirty, errors}} = useForm({
        mode: "onBlur",
        shouldUnregister: true,
        defaultValues: {
            ...defaultValues
        }
    })

    function onSubmit(val: ICreateSectionForm) {
        //Todo: send data here to BE
    }

    
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