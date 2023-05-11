import { useState } from "react"
import SectionDetailsView from "./SectionDetailsView"

const SectionDetailsContainer = () => {
    const [showStudentList, setShowStudentList] = useState(false)
    const [activitiesList, setShowActivitiesList] = useState(false)
  return (
    <SectionDetailsView 
        showStudentList={showStudentList}
        setShowStudentList={setShowStudentList}
        activitiesList={activitiesList}
        setShowActivitiesList={setShowActivitiesList}
    />
  )
}

export default SectionDetailsContainer