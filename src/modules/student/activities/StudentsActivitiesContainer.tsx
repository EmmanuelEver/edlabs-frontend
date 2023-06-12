import useFetch from "@/hooks/useFetch";
import { IActivitesBySection, IActivitySummary } from "@/types/types";
import { useState } from "react";
import StudentActivitiesView from "./StudentActivitiesView";


interface IResponse {
  activities: IActivitesBySection[];
}

const ActivitiesContainer = () => {
  const { data } = useFetch("/sections");
  const [showAddModal, setShowAddModal] = useState<boolean>(false)

  function handleSetShowModal(val: boolean) {
    setShowAddModal(val)
  }

  return (
    <StudentActivitiesView showAddModal={showAddModal} handleSetShowModal={handleSetShowModal} activities={data} />
  )
}

export default ActivitiesContainer