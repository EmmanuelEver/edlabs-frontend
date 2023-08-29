import Avatar from "@/components/avatar/Avatar"
import LoadingComponent from "@/components/loader/LoadingComponent";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link"
import { FC, Fragment } from "react"

interface IProps {
    data: any;
    isLoading: boolean;
}

const OutputsAllView: FC<IProps> = ({ data, isLoading }) => {
    function getEqScore(sessions: any, sectionId: string) {
        const sectionSessions = sessions?.filter((session: any) => session.activity.sectionId === sectionId)

        const sectionSessionsSocre = sectionSessions.reduce((a: number, session: any) => {
            if (!isNaN(session.eqScore)) {
                return a + session.eqScore
            }
            return a
        }, 0)
        const eqScore = parseFloat((sectionSessionsSocre / sectionSessions.length).toString()).toFixed(3)
        return eqScore
    }
    function getGeqs(sessions: any) {
        const sectionSessionsSocre = sessions.reduce((a: number, session: any) => {
            if (!isNaN(session.eqScore)) {
                return a + session.eqScore
            }
            return a
        }, 0)
        const eqScore = parseFloat((sectionSessionsSocre / sessions.length).toString()).toFixed(3)

        return eqScore
    }

    function getSectionAverageEqs(section: any) {
        const sessions = section?.students?.map(student => student?.activitySessions?.reduce((a,b) => {
            if(Number.isFinite(b.eqScore)) return a += b.eqScore
            return a
        } , 0) / student?.activitySessions?.length)
        return (sessions.reduce((a, b) => a += b, 0) / sessions.length)
    }

    function getGreenToRed(percent){
        let r = percent<50 ? 255 : Math.floor(255-(percent*2-100)*255/100);
        let g = percent>50 ? 255 : Math.floor((percent*2)*255/100);
        return 'rgb('+g+','+r+',0)';
    }

    function sortStudents(students: any[], sectionId: string) {
        try {
            return students.sort((a: any, b: any) => {
                return parseFloat(getEqScore(b.activitySessions, sectionId)) - parseFloat(getEqScore(a.activitySessions, sectionId))
            })
        } catch (error) {
            return students
        }
    }
    return (
        <div className="flex flex-col flex-shrink-0 w-5/12 h-full px-6 py-6">
            {
                isLoading && <LoadingComponent />
            }
            <div className="flex-shrink-0">
                <h1 className="text-2xl font-semibold text-header">Sections</h1>
            </div>

            <div className="flex-1 w-full mt-6 overflow-y-auto ">
                <ul className="flex flex-col w-full gap-4 list-none">
                    {
                        data?.map((section: any, idx: number) => (
                            <Fragment key={section.shortcode + idx}>
                                <li role="button" key={section.id} className="cursor-pointer">
                                    <Link href={`/outputs/?sectionId=${section.id}`} className="rounded pl-4 pb-4 w-full min-h-[100px] flex flex-nowrap bg-light-100 pt-4 shadow-md hover:shadow-lg transition-shadow">
                                        <div className="flex-shrink-0 max-w-[150px] bg-accentColor-200 max-h-[150px]">
                                            <Image style={{ objectFit: "cover", width: "100%", height: "100%" }} alt="" src={section?.coverImage} width={360} height={240} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="p-4 ">
                                                <h3 className="text-base font-semibold text-blue-300 ">{section.title}</h3>
                                                <p className="mt-4 text-sm font-medium text-subHeader text-opacity-70">{section.description}</p>
                                            </div>
                                            <div className="inline-block float-right p-2 mx-4 text-xs rounded bg-opacity-30 bg-slate-300 text-subHeader text-opacity-70">
                                                <span style={{color: getGreenToRed(getSectionAverageEqs(section))}}>{getSectionAverageEqs(section)?.toFixed(3)}</span> <span className="mx-1 font-bold">&#183;</span>{section?.activities?.length} Activities
                                            </div>
                                        </div>
                                    </Link>

                                    {/* <div className="flex-shrink-0 w-full max-w-xs">
                                <h3 className="font-medium leading-none text-md text-header">{section?.title} <span className="ml-2">({section.shortcode})</span></h3>
                                <p className="mt-2 text-sm text-subHeader">{section.description}</p>
                                {
                                    section?.errorTypes?.length >= 1 &&
                                    <div className="mt-2 text-subHeader">
                                        Most common errors: <span className="text-sm font-semibold text-red-600">{section?.errorTypes?.filter((val) => val !== "null").join(", ")}</span>
                                    </div>
                                }
                                <ul className="mt-4 list-disc list-inside">
                                    {
                                        section?.activities.map((activity: any) => (
                                            <li className="text-sm text-body" key={activity.title}>
                                                <Link className="hover:underline" href={`/outputs?activityId=${activity.id}`}>
                                                    {activity.title}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="flex-1 h-full pl-10 overflow-y-auto max-h-80">
                                <table className="w-full h-full overflow-y-auto table-fixed">
                                    <thead>
                                        <tr className="border-b border-light-300">
                                            <th colSpan={4} className='pb-2 pl-6 text-xs font-light text-left text-subHeader'>NAME</th>
                                            <th colSpan={2} className='pb-2 text-xs font-light text-left text-subHeader'>OUTPUTS</th>
                                            <th colSpan={2} className='pb-2 text-xs font-light text-left text-subHeader'>EQ SCORE</th>
                                            <th colSpan={2} className='pb-2 text-xs font-light text-left text-subHeader'>GEQS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            sortStudents(section?.students, section?.id).map((student: any) => (
                                                <tr key={student.user.id} className="border-b boder-light-400 last-of-type:border-none">
                                                    <td colSpan={4} className="py-2 pl-6">
                                                        <div className="flex items-center">
                                                            <Avatar wrapperClassName="w-5 h-5 flex-shrink-0" image={student.user.profileUrl} name={student.user.name} />
                                                            <div className="flex flex-col items-start ml-2">
                                                                <Link href={`/outputs/${student.user.id}?sectionId=${section.id}`}  className="text-sm font-medium text-header hover:underline">{student.user.name}</Link>
                                                                <p className="text-xs font-normal text-subHeader">{student.user.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td colSpan={2}>
                                                        <p className="text-sm font-normal text-subHeader">{student?.activitySessions?.length}</p>
                                                    </td>
                                                    <td colSpan={2}>
                                                        <p className="text-sm font-normal text-subHeader">{getEqScore(student?.activitySessions, section.id)}</p>
                                                    </td>
                                                    <td colSpan={2}>
                                                        <p className="text-sm font-normal text-subHeader">{getGeqs(student?.activitySessions)}</p>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div> */}
                                </li>
                            </Fragment>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default OutputsAllView