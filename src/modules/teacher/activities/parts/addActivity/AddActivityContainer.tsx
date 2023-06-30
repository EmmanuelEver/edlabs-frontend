import { FC, useEffect, useState } from "react";
import AddActivityView from "./AddActivityView";
import {useForm} from "react-hook-form";
import { apiPrivate } from "@/services/axios";
import {useSWRConfig} from "swr"
import useToast from "@/hooks/useToast";

interface IProps {
    sectionId: string;
    handleCloseModal: () => void;
}

const AddActivityContainer: FC<IProps> = ({handleCloseModal, sectionId}) => {
  const [description, setDescription] = useState("")
  const {register, reset, handleSubmit, control, formState: {isSubmitting, isDirty, isSubmitSuccessful}} = useForm();
  const {mutate} = useSWRConfig()
  const {toast} = useToast()

  function handleDescription(value:any) {
    setDescription(value)
  }

  async function onSubmit(val:any) {
    if(!isDirty && !description) return 
    try {
      const resp = await apiPrivate.post(`/activities?sectionId=${sectionId}`, JSON.stringify({...val, description}))
      console.log(resp)
      await  mutate("/sections")
      toast("SUCCESS", 'Activity created!')
      handleCloseModal()
    } catch (error) {
      console.log(error)
      toast("DANGER", 'An error occured while saving')

    }
  }
  useEffect(() => {
    reset({})
  }, [isSubmitSuccessful])
  
  function closeModal() {
    if(!isSubmitting) handleCloseModal()
  }

  return (
    <AddActivityView
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      isDirty={isDirty}
      handleDescription={handleDescription} 
      description={description} 
      handleCloseModal={closeModal} 
      control={control}
    />
  )
}

export default AddActivityContainer