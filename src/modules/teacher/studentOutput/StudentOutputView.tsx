import { User } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { FC, useMemo } from "react"
import { Doughnut } from "react-chartjs-2";
import StudentActivityOutputView from "./parts/StudentActivityOutputView";
import StudentAllOutputView from "./parts/StudentAllOutputView";
import StudentSectionOutputView from "./parts/StudentSectionOutputView";

interface IProps {
  user: User | undefined;
  showOnlySpecificSection: string;
  revalidate: any;
  isValidating: boolean;
  outputs: any;
}

const StudentOutputView: FC<IProps> = ({ user, outputs, showOnlySpecificSection, revalidate, isValidating }) => {
  const getEqScore = (sessions: any) => {
    if (sessions.length === 0) return 0
    const sectionSessionsScore = sessions?.reduce((a: number, session: any) => {
      if (Number.isFinite(session.eqScore)) return a += session.eqScore
      return a
    }, 0)
    const eqScore = parseFloat((sectionSessionsScore / sessions?.length).toString()).toFixed(3)
    return eqScore
  }


  const totalCompilations = outputs ? outputs?.reduce(((a, b) => {
    const compilations = b.activities.reduce((c, d) => c += d.compilations?.length, 0)
    return a += compilations
  }), 0) : 0

  const averageCompilations = Number.isFinite(totalCompilations) ? (totalCompilations / outputs?.reduce((a, b) => a + b.activities.length, 0)).toFixed(1) : 0

  const averageScore = useMemo(() => {
    if (outputs) {
      const total = outputs.map((item) => item.activities.map((inner) => getEqScore(inner.compilations)).reduce((a, b) => a + parseFloat(b), 0))
      if (total.length === 0) return 0
      return total.reduce((a, b) => a + b, 0) / total.length
    }
    return null
  }, [outputs])

  if (showOnlySpecificSection === "activity") return (
    <div className="flex flex-col w-full h-full p-4">
      <StudentActivityOutputView />
    </div>
  )

  return (
    <div className="relative flex w-full gap-4 p-4 overflow-hidden flex-nowrap">
      <div className="flex-shrink-0 w-3/12 min-w-[320px] overflow-y-auto">
        {
          !!user &&
          <div className="sticky top-0 p-4 overflow-y-auto rounded-md shadow bg-light-100">
            <div className="flex items-start ">
              <div className="w-16 h-16 overflow-hidden rounded-md">
                <Image className="object-contain w-full h-full rounded-md" width={50} height={50} src={user.profileUrl} alt={user.name} />
              </div>
              <div className="flex-col items-center ml-4">
                <h2 className="text-lg font-medium text-header">{user.name}</h2>
                <p className="text-sm cursor-pointer text-subHeader">{user.email}</p>
              </div>
            </div>
            {/* <div className="mt-4">
                            <h1 className="text-2xl font-medium text-blue-300">{output?.title}</h1>
                            <p className="mt-2 text-sm text-subHeader text-opacity-70">{output?.shortDescription}</p>
                            <p className="mt-6 text-xs text-subHeader text-opacity-70">last updated: {dayjs(session?.lastUpdated).fromNow()}</p>
                        </div> */}
          </div>
        }
        {
          <div className="flex items-center justify-center p-4 mt-4 rounded-md shadow bg-light-100">
            {/* <div className="flex items-center justify-center w-10 h-10 bg-blue-300 rounded-full">
                <ServerStackIcon className="w-6 h-6 text-light-100" />
            </div> */}
            <div className="flex flex-col items-center">
              <h4 className="text-4xl font-medium text-blue-300">{averageCompilations}</h4>
              <p className="mt-2 text-sm text-subHeader text-opacity-70">Avg. Compilations</p>
            </div>
          </div>
        }
        {
          averageScore !== null &&
          <div className="flex items-center p-4 mt-4 rounded-md shadow bg-light-100">
            <div className="w-full max-w-[200px] mx-auto">
              <Doughnut options={{ responsive: true, maintainAspectRatio: true }} data={{ labels: ["Avg. EQ Score"], datasets: [{ data: [averageScore.toFixed(3), 1], backgroundColor: ["#192638", "#F4F7FC"] }] }} />
            </div>
          </div>
        }
      </div>
      <div className="flex-1 w-9/12">
        <div className="flex flex-wrap items-stretch w-full -mt-4">
          {
            outputs?.map((output) => (
              <div key={output?.id} className="self-stretch w-1/2 p-4">
                <div className="items-center h-full p-4 rounded-md shadow bg-light-100">
                  <h3 className="text-xl text-blue-300">{output?.title}</h3>
                  <div className="w-full  mt-4  max-h-[300px] overflow-y-auto">
                    <table className="w-full table-fixed">
                      <thead className="sticky top-0 bg-light-100">
                        <th colSpan={3} className="pb-1 text-sm font-normal text-left text-subHeader text-opacity-70">Activity</th>
                        <th colSpan={1} className="pb-1 text-sm font-normal text-center text-subHeader text-opacity-70">Compilations</th>
                        <th colSpan={1} className="pb-1 text-sm font-normal text-center text-subHeader text-opacity-70">EQS</th>
                      </thead>
                      <tbody>
                        {
                          output?.activities?.map((activity) => (
                            <tr key={activity.id}>
                              <td colSpan={3} className="py-1 text-base font-medium text-blue-300 hover:underline text-opacity-80">
                                <Link href={`/outputs/${user.id}?activityId=${activity.id}`}>
                                  {activity.title}
                                </Link>
                              </td>
                              <td className="text-center text-blue-300 align-top" colSpan={1}>{activity.compilations?.length}</td>
                              <td className="text-center text-blue-300 align-top" colSpan={1}>{getEqScore(activity?.compilations)}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
    // <div className="flex flex-col w-full h-full p-4">
    //   {
    //     (showOnlySpecificSection === "" || showOnlySpecificSection === "section")  &&
    //     <div className="flex items-center pb-6 border-b flex-nowrap border-light-300">
    //       {
    //         !!user &&
    //         <>
    //           <div className="overflow-hidden rounded-full w-14 h-14">
    //             <Image className="object-contain w-full h-full rounded-full" width={50} height={50} src={user.profileUrl} alt={user.name} />
    //           </div>
    //           <div className="flex-col items-center ml-4">
    //             <h2 className="text-xl font-medium text-header">{user.name}</h2>
    //             <p className="text-base cursor-pointer text-subHeader">{user.email}</p>
    //           </div>
    //         </>
    //       }
    //     </div>
    //   }
    //   {
    //     showOnlySpecificSection === "activity" ?
    //       <StudentActivityOutputView />
    //       :
    //       showOnlySpecificSection === "section" ?
    //       <div className="relative flex-1 w-full overflow-y-auto">
    //         <StudentSectionOutputView user={user} revalidate={revalidate} isValidating={isValidating} />
    //         </div>
    //         :
    //         <div className="relative flex-1 w-full overflow-y-auto">
    //           <StudentAllOutputView />
    //         </div>
    //   }
    // </div>
  )
}

export default StudentOutputView