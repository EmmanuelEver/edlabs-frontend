import LoadingComponent from "@/components/loader/LoadingComponent";
import { User } from "@/types/types";
import { FC } from "react"

interface IProps {
    isLoading: boolean;
    data: any;
    user: User | null;
}

const TeacherDashboardView: FC<IProps> = ({ isLoading, data, user }) => {
    return (
        <div className="w-full h-full px-6 py-4">
            <div className="w-full">
                <h2 className="text-xl font-normal text-header">
                    Hi {user?.name?.split(" ")[0]}!
                </h2>
            </div>
            <div className="flex flex-wrap mt-10">
                <div className="px-2 pb-4 basis-1/2 lg:basis-1/4 md:basis-1/3">
                    <div className="relative flex flex-col items-center justify-center h-32 px-4 rounded-lg bg-light-300">
                        {
                            isLoading ?
                                <LoadingComponent />
                                :
                                <>
                                    <h3 className="text-3xl text-header">
                                        {data.sections}
                                    </h3>
                                    <p className="mt-2 text-xs font-light text-body">Created Sections</p>
                                </>
                        }
                    </div>
                </div>
                <div className="px-2 pb-4 basis-1/2 lg:basis-1/4 md:basis-1/3">
                    <div className="relative flex flex-col items-center justify-center h-32 px-4 rounded-lg bg-light-300">
                        {
                            isLoading ?
                                <LoadingComponent />
                                :
                                <>
                                    <h3 className="text-3xl text-header">
                                        {data.activities}
                                    </h3>
                                    <p className="mt-2 text-xs font-light text-body">Created Activities</p>
                                </>
                        }
                    </div>
                </div>
                <div className="px-2 pb-4 basis-1/2 lg:basis-1/4 md:basis-1/3">
                    <div className="relative flex flex-col items-center justify-center h-32 px-4 rounded-lg bg-light-300">
                        {
                            isLoading ?
                                <LoadingComponent />
                                :
                                <>
                                    <h3 className="text-3xl text-header">
                                        {data.students}
                                    </h3>
                                    <p className="mt-2 text-xs font-light text-body">Total Students</p>
                                </>
                        }
                    </div>
                </div>
                <div className="px-2 pb-4 basis-1/2 lg:basis-1/4 md:basis-1/3">

                    <div className="relative flex flex-col items-center justify-center h-32 px-4 rounded-lg bg-light-300">

                        {
                            isLoading ?
                                <LoadingComponent />
                                :
                                <>
                                    <h3 className="text-3xl text-header">
                                        {data.pendingStudents}
                                    </h3>
                                    <p className="mt-2 text-xs font-light text-body">Pending Students</p>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherDashboardView