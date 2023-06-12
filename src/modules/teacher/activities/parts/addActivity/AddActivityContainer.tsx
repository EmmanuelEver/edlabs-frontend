import { FC, useEffect, useState } from "react";
import AddActivityView from "./AddActivityView";
import {useForm} from "react-hook-form";
import { apiPrivate } from "@/services/axios";
import {useSWRConfig} from "swr"

interface IProps {
    sectionId: string;
    handleCloseModal: () => void;
}

const AddActivityContainer: FC<IProps> = ({handleCloseModal, sectionId}) => {
  const [description, setDescription] = useState("")
  const {register, reset, handleSubmit, formState: {isSubmitting, isDirty, isSubmitSuccessful}} = useForm();
  const {mutate} = useSWRConfig()

  function handleDescription(value:any) {
    setDescription(value)
  }

  async function onSubmit(val:any) {
    if(!isDirty && !description) return 
    try {
      const resp = await apiPrivate.post(`/activities?sectionId=${sectionId}`, JSON.stringify({...val, description}))
      console.log(resp)
      await  mutate("/sections")
      handleCloseModal()
    } catch (error) {
      console.log(error)
      alert("An error occured while Saving")
    }
  }

  useEffect(() => {
    reset({})
  }, [isSubmitSuccessful])
  

  return (
    <AddActivityView
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      isDirty={isDirty}
      handleDescription={handleDescription} 
      description={description} 
      handleCloseModal={handleCloseModal} 
    />
  )
}

export default AddActivityContainer