import { FC, useEffect, useRef, useState } from "react";
import ActivityView from "./EditActivityView";
import {useForm} from "react-hook-form";
import {useSWRConfig} from "swr"
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import { apiPrivate } from "@/services/axios";
import useToast from "@/hooks/useToast";
import { useConfirmAlert } from "@/context/providers/AlertProvider";

interface IProps {
    selectedActivity: string;
}

const ActivityContainer: FC<IProps> = ({selectedActivity}) => {
  const router = useRouter()
  const {data, revalidate} = useFetch(router?.query.selected ? `/activities/${router?.query.selected}` : null)
  const [description, setDescription] = useState("")
  const [isDescriptionChanged, setIsDescriptionChangedRef] = useState(false)
  const {register, reset, handleSubmit, control, formState: {isSubmitting, isDirty, dirtyFields}} = useForm({
    defaultValues: {
      title: "",
      shortDescription: "",
      openDate: "",
      closeDate: "",
      starterCode: "",
      lang: "python",
      correctAnswer: ""
    },
    shouldUnregister: true
  });

  const {mutate} = useSWRConfig()
  const {toast} = useToast()
  const {showAlert} = useConfirmAlert()


  function handleDescription(value:any) {
    if(value !== data?.description) setIsDescriptionChangedRef(true)
    else setIsDescriptionChangedRef(false)
    setDescription(value)
  }

  async function onSubmit(val:any) {
    if(!isDirty && (description === data.description)) return
    if(!data) return
    const changedFieldKeys: string[] = Object.keys(dirtyFields)
    const fieldsToSave: any = {}
    changedFieldKeys.forEach((key) => {
      if(key === "openDate" || key === "closeDate") {
        fieldsToSave[key] = new Date(val[key])
      }
      else {
        fieldsToSave[key] = val[key]
      }
    })
    try {
      const resp = await apiPrivate.put(`/activities/${data.id}`, JSON.stringify({...fieldsToSave, description}))
      await mutate("/activities")
      toast("SUCCESS", 'Activity updated!')

    } catch (error) {
      console.log(error)
      toast("DANGER", 'An error occured while saving')
    }
  }


  async function deleteActivity() {
    try {
      const resp = await apiPrivate.delete(`/activities/${router?.query.selected}`)
      await mutate("/sections")
      toast("SUCCESS", resp?.data?.message || "Activity deleted!")
      router.push({
        pathname: "/activities",
      }, undefined, {shallow: true})
    } catch (error: any) {
      console.error(error)
      toast("DANGER", error?.response?.data?.message || "Error deleting the activity")
    }
  }

  async function handleDeleteActivity() {
    showAlert({
      title: "Delete Activity",
      confirmMessage: `Are you sure to delete ${data?.title}?`,
      onConfirm: deleteActivity
    })
  }

  function handleCloseModal() {
    if(!isSubmitting) {
      router.push({
          pathname: "/activities",
        }, undefined, {shallow: true})
    }
  }

  useEffect(() => {
    if(data) {
      reset({
        title: data.title,
        shortDescription: data.shortDescription,
        starterCode: data.starterCode,
        lang: data.lang,
        correctAnswer: data?.correctAnswer,
        openDate: new Date(data.openDate).toISOString().split("T")[0],
        closeDate: new Date(data.closeDate).toISOString().split("T")[0],
      }, {keepDirty: false, keepDirtyValues: false})
      setDescription(data.description)
    }
  }, [data])


  return (
    <ActivityView 
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      isDirty={isDirty}
      handleDescription={handleDescription} 
      description={description} 
      handleCloseModal={handleCloseModal}
      data={data}
      isDescriptionChanged={isDescriptionChanged}
      handleDelete={handleDeleteActivity}
      control={control}
    />
  )
}

export default ActivityContainer