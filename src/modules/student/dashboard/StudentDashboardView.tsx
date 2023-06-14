import LoadingComponent from "@/components/loader/LoadingComponent";
import { User } from "@/types/types";
import { FC } from "react"

interface IProps {
    isLoading: boolean;
    data: any;
    user: User | null;
}

const StudentDashboardView: FC<IProps> = ({ isLoading, data, user }) => {
    return (
        <div className="w-full h-full px-6 py-4">
            <div className="w-full">
                <h2 className="text-xl font-normal text-header">
                    Hi {user?.name?.split(" ")[0]}!
                </h2>
            </div>
            <div className="flex flex-wrap gap-4 mt-10">
                <div className="relative flex flex-col items-center justify-center h-32 px-4 rounded-lg basis-1/4 bg-light-300">
                    {
                        isLoading ?
                            <LoadingComponent />
                            :
                            <>
                                <h3 className="text-3xl text-header">
                                    {data.teachers}
                                </h3>
                                <p className="mt-2 text-xs font-light text-body">Instructors</p>
                            </>
                    }
                </div>
                <div className="relative flex flex-col items-center justify-center h-32 px-4 rounded-lg basis-1/4 bg-light-300">

                    {
                        isLoading ?
                            <LoadingComponent />
                            :
                            <>
                                <h3 className="text-3xl text-header">
                                    {data.sections}
                                </h3>
                                <p className="mt-2 text-xs font-light text-body">Joined Sections</p>
                            </>
                    }
                </div>
                <div className="relative flex flex-col items-center justify-center h-32 px-4 rounded-lg basis-1/4 bg-light-300">

                    {
                        isLoading ?
                            <LoadingComponent />
                            :
                            <>
                                <h3 className="text-3xl text-header">
                                    {data.activities}
                                </h3>
                                <p className="mt-2 text-xs font-light text-body">Activities</p>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default StudentDashboardView