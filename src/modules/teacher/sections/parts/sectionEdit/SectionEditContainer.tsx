import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import SectionEditView from "./SectionEditView";
import {useForm} from "react-hook-form";
import useFetch from "@/hooks/useFetch";
import { apiPrivate } from "@/services/axios";

interface IProps {
    selectedSection: string;
}

const SectionEditContainer: FC<IProps> = ({selectedSection=""}) => {
    const router = useRouter()
    const {data, revalidate} = useFetch(router.isReady ? `/sections/${router.query.selected}` : null);
    const {register, reset, handleSubmit, formState: {isDirty, isSubmitting, errors, dirtyFields}} = useForm({
      defaultValues: {
        title: "",
        shortcode: "",
        description: ""
      }
    })


    function handleCloseModal() {
        if(!isSubmitting) {
            router.push({
                pathname: "/sections",
              }, undefined, {shallow: true})
        }
    }

    async function onSubmit(val: any) {
      
      if(!data) return
      const changedFieldKeys: string[] = Object.keys(dirtyFields)
      const fieldsToSave: any = {}
      changedFieldKeys.forEach((key) => {
        fieldsToSave[key] = val[key]
      })
      try {
        const resp = await apiPrivate.put(`/sections/${data.id}`, JSON.stringify({...fieldsToSave}))
        await revalidate()
        console.log(resp)
      } catch (error) {
        console.log(error)
        alert("Error occured while saving")
      }
    }

    useEffect(() => {
      if(data) {
        reset({
          title: data.title,
          description: data.description,
          shortcode: data.shortcode
        }, {keepDirty: false, keepDirtyValues: false})
      }
    }, [data])

  return (
    <SectionEditView
      data={data}
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