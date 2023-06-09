import useFetch from "@/hooks/useFetch"
import { IActivitesBySection } from "@/types/types"
import { useRouter } from "next/router"
import { useState } from "react"
import TeacherActivitiesView from "./TeacherActivitiesView"

// const activities: IActivitesBySection[] = [
//   {
//     section: "Introduction to C",
//     internal_id: "xz123h-123cxas-123xcdhj",
//     activites: [
//       {
//         activity_name: "Reverse number in C",
//         due_date: "03/27/2023",
//         internal_id: "01",
//       },
//       {
//         activity_name: "Convert Celsius to Fahrenheit",
//         due_date: "03/28/2023",
//         internal_id: "02",
//       }, 
//       {
//         activity_name: "Reverse number in C",
//         due_date: "03/27/2023",
//         internal_id: "03",
//       }
//     ]
//   }
// ]

const ActivitiesContainer = () => {
  const router = useRouter()
  const [activityModal, setActivityModal] = useState("")
  const {data} = useFetch("/sections");

  function handleAddActivity (id: string) {
    setActivityModal(id)
  }

  function handleCloseNewActivityModal() {
    setActivityModal("")
  }

  return (
    <TeacherActivitiesView
      selectedActivity={router?.isReady ? router?.query?.selected : ""}
      handleCloseNewActivityModal={handleCloseNewActivityModal} 
      handleAddActivity={handleAddActivity} 
      activityModal={activityModal} 
      sectionActivities={data} 
    />
  )
}
  
  export default ActivitiesContainer