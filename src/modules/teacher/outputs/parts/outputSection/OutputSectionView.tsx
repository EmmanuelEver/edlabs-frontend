import Avatar from "@/components/avatar/Avatar"
import Tooltip from "@/components/tooltip/Tooltip"
import { Tab } from "@headlessui/react"
import { Cog6ToothIcon, DocumentChartBarIcon, UserGroupIcon } from "@heroicons/react/24/outline"
import { Chart as ChartJS, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip as ChartTooltip } from "chart.js"
import clsx from "clsx"
import Link from "next/link"
import { Fragment } from "react"
import { Bar } from "react-chartjs-2"

const options: any = {
  responsive: true,
  scales: {
    yAxes: {
      display: false,
      suggestedMin: 0,
      suggestedMax: 1
    },
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'EQ score per activities',
      position: "bottom"
    }
  },
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const OutputSectionView = ({ section }) => {
  function getEqScore(sessions: any, sectionId: string) {
    const sectionSessions = sessions?.filter((session: any) => session.activity.sectionId === sectionId)
    const sectionSessionsScore = sectionSessions?.reduce((a: number, session: any) => {
      if (Number.isFinite(session.eqScore)) return a += session.eqScore
      return a
    }, 0)
    const eqScore = parseFloat((sectionSessionsScore / sectionSessions?.length).toString()).toFixed(3)
    return eqScore
  }

  function sortStudents(students: any[], sectionId: string) {
    try {
      const sorted = [...students].sort((a: any, b: any) => {
        return parseFloat(getEqScore(b.activitySessions, sectionId)) - parseFloat(getEqScore(a.activitySessions, sectionId))
      })
      return sorted
    } catch (error) {
      return students
    }
  }

  const datasets = [
    {
      label: "EQ score",
      backgroundColor: "#192638",
      data: section?.activities?.map((activity) => (activity.sessions?.reduce((a, b) => {
        if (Number.isFinite(b.eqScore)) return a += b.eqScore
        return a
      }, 0)))
    }
  ]

  return (
    <div className="flex flex-col w-full h-full px-8 pt-8 overflow-hidden bg-light-100">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-header">{section?.title}</h2>
        <Tooltip content="Edit">
          <Link href={`/sections?selected=${section?.id}`}>
            <Cog6ToothIcon className="w-6 h-6 text-blue-300" />
          </Link>
        </Tooltip>
      </div>
      <p className="mt-4 text-base font-normal text-subHeader text-opacity-70">{section?.description}</p>
      <div className="flex items-center justify-start gap-3 mt-4"></div>
      <div className="mt-4 h-60">
        <Bar className="h-full mx-auto" options={options} data={{ labels: section?.activities.map((activity, idx) => (`Activity ${idx + 1}`)), datasets }} />
      </div>
      <div className="flex flex-col flex-1 pb-4 mt-4 overflow-hidden">
        {/* <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium text-header">Students</h4>
          <div className="flex items-center gap-1 text-sm text-blue-300">
            <span>{section?.students.length} </span>
            <UserGroupIcon className="w-5 h-5" />
          </div>
        </div> */}
        <Tab.Group>
          <Tab.List>
            <Tab.List className="border-b border-light-200">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button className={clsx("text-sm pb-2 relative pt-1 mr-4 font-normal transition-colors", selected ? "text-dark-100" : "text-subHeader text-opacity-70")}>
                    <span>Students</span>
                    {
                      selected && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-300 rounded"></div>
                    }
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button className={clsx("text-sm pb-2 relative pt-1 mr-4 font-normal transition-colors", selected ? "text-dark-100" : "text-subHeader text-opacity-70")}>
                    <span>Activities</span>
                    {
                      selected && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-300 rounded"></div>
                    }
                  </button>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel as="ul" className="flex flex-col flex-1 w-full gap-2 overflow-y-auto">
                {
                  sortStudents(section?.students, section?.id)?.map((student, idx) => (
                    <li key={student.id} className={clsx("w-full rounded-3xl py-4 px-4  flex items-center justify-between", idx % 2 !== 0 ? "bg-light-400" : "bg-transparent")}>
                      <div className="flex items-center gap-2">
                        <Avatar name={student.user.name} image={student?.user?.profileUrl} />
                        <h4 className="text-base font-medium text-blue-300">
                          <Link href={`/outputs/${student.user.id}`} className="hover:underline">
                            {student.user.name}
                          </Link>
                        </h4>
                      </div>
                      <div className="flex items-center pl-6">
                        <div className="pr-20 text-base font-normal text-blue-300 text-opacity-70 ">{getEqScore(student?.activitySessions, section.id)}</div>
                        <Tooltip content="Output">
                          <Link href={`/outputs/${student.user.id}`}>
                            <DocumentChartBarIcon className="w-6 h-6 text-blue-300" />
                          </Link>
                        </Tooltip>
                      </div>
                    </li>
                  ))
                }
              </Tab.Panel>
              <Tab.Panel as="ul" className="flex flex-col flex-1 w-full pt-2 mt-2 overflow-y-auto">
                {
                  section?.activities?.map((activity) => (
                    <li key={activity.id} className={clsx("w-full rounded-3xl py-1 flex items-center justify-between")}>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-blue-300">
                          <Link href={`/outputs?activityId=${activity.id}`} className="hover:underline">
                            {activity.title}
                          </Link>
                        </h4>
                      </div>
                    </li>
                  ))
                }
              </Tab.Panel>
            </Tab.Panels>
          </Tab.List>
        </Tab.Group>
      </div>
    </div>
  )
}

export default OutputSectionView