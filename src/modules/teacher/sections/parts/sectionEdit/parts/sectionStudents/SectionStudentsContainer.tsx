import useToast from "@/hooks/useToast";
import { apiPrivate } from "@/services/axios";
import {useSWRConfig} from "swr"
import { IStudent } from "@/types/types"
import { FC, useMemo, useState } from "react"
import SectionStudentsView from "./SectionStudentsView"

interface IProps {
  pendingStudents: IStudent[] | undefined;
  students: IStudent[] | undefined;
  blockedStudents: IStudent[] | undefined;
  sectionId: string | undefined;
}

const SectionStudentsContainer: FC<IProps> = ({pendingStudents, students, blockedStudents, sectionId}) => {
  const [isLoading, setIsLoading] = useState(false)
  const {toast} = useToast()
  const {mutate} = useSWRConfig()
  const combineStudents = useMemo(() => {
    if(pendingStudents && students && blockedStudents) {
      return [
        ...pendingStudents.map((student) => ({studentId: student.id, ...student.user, status: "PENDING"})),
        ...students.map((student) => ({studentId: student.id, ...student.user, status: "APPROVED"})),
        ...blockedStudents.map((student) => ({studentId: student.id, ...student.user, status: "BLOCKED"}))
      ]
    }
    return []
  }, [pendingStudents, students, blockedStudents])
  console.log()
  async function updateStatus(status: string | undefined, studentId: string) {
    setIsLoading(true)
    const url = `/sections/${sectionId}`
    const statusPath = status === "PENDING" ? "/approve" : status === "BLOCKED" ? "/unblock" : "/block"
    try {
      const resp = await apiPrivate.put(url + statusPath, JSON.stringify({studentId}))
      await mutate(`/sections/${sectionId}`)
      toast("SUCCESS", "Student access updated!")
      console.log(resp)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      toast("DANGER", "An error occured while saving")
      setIsLoading(false)
    }
  }

  return (
    <SectionStudentsView students={combineStudents} updateStatus={updateStatus} />
  )
}

export default SectionStudentsContainer