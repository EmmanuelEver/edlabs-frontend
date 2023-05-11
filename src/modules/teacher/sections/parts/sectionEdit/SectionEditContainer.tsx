import { useRouter } from "next/router";
import { FC } from "react";
import SectionEditView from "./SectionEditView";
import {useForm} from "react-hook-form";

interface IProps {
    selectedSection: string;
}

const SectionEditContainer: FC<IProps> = ({selectedSection=""}) => {
    const router = useRouter()
    const {register, reset, handleSubmit, formState: {isDirty, isSubmitting, errors}} = useForm()


    function handleCloseModal() {
        if(!isSubmitting) {
            router.push({
                pathname: "/sections",
              }, undefined, {shallow: true})
        }
    }

    function onSubmit(val: any) {

    }

  return (
    <SectionEditView 
        handleCloseModal={handleCloseModal} 
        register={register}
        isDirty={isDirty}
        isSubmitting={isSubmitting}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}

    />
  )
}

export default SectionEditContainer