import { IActivitySummary } from "@/types/types";
import StudentActivitiesView from "./StudentActivitiesView";

export interface IActivitesBySection {
  section: string;
  readonly internal_id: string;
  activites: IActivitySummary[]
}

interface IResponse {
  activities: IActivitesBySection[];
}

const ActivitiesContainer = () => {

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
          internal_id: "01"
        }
      ]
    }
  ]
  return (
    <StudentActivitiesView activities={activities} />
  )
}

export default ActivitiesContainer