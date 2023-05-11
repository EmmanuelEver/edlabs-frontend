import { IActivitesBySection, IActivitySummary } from "@/types/types";
import { useState } from "react";
import StudentActivitiesView from "./StudentActivitiesView";


interface IResponse {
  activities: IActivitesBySection[];
}

const ActivitiesContainer = () => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false)

  function handleSetShowModal(val: boolean) {
    setShowAddModal(val)
  }

  const activities: IActivitesBySection[] = [
    {
      section: "Introduction to C",
      internal_id: "xz123h-123cxas-123xcdhj",
      activites: [
        {
          activity_name: "Reverse number in C",
          due_date: "03/27/2023",
          internal_id: "01"
        },
        {
          activity_name: "Convert Celsius to Fahrenheit",
          due_date: "03/28/2023",
          internal_id: "02"
        }, {
          activity_name: "Reverse number in C",
          due_date: "03/27/2023",
          internal_id: "03"
        }
      ]
    }
  ]
  return (
    <StudentActivitiesView showAddModal={showAddModal} handleSetShowModal={handleSetShowModal} activities={activities} />
  )
}

export default ActivitiesContainer