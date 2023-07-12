import useFetch from "@/hooks/useFetch"
import useToast from "@/hooks/useToast"
import { apiPrivate } from "@/services/axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import StudentActivityView from "./StudentActivityView"

const initialCode = `
#include <stdio.h>
    int main() {
        int rows = 10;
        int i, j, space;
        for (i = rows; i >= 1; --i) {
            for (space = 0; space < rows - i; ++space)
                printf("  ");
            for (j = i; j <= 2 * i - 1; ++j)
                printf("* ");
            for (j = 0; j < i - 1; ++j)
                printf("* ");
            printf("\\n");
        }
        return 0;
    }
`

const StudentActivityContainer = () => {
    const router = useRouter()
    const {data, isLoading} = useFetch(router.isReady && router.query.activityId ? `/activity-session?activityId=${router.query.activityId}` : null)
    const {data:activity, isLoading: loadingActivity} = useFetch(router.isReady && router.query.activityId ? `/activities/${router.query.activityId}` : null)
    const [terminalContent, setTerminalContent] = useState("")
    const [value, setValue] = useState("")
    const [running, setRunning] = useState(false)
    const {toast} = useToast()
    
    function handleClearTerminal() {
        setTerminalContent("")
    }

    async function handleRun() {
        if(activity && "id" in activity) {
            setRunning(true)
            try {
                const resp = await apiPrivate.post("/compilations/student", JSON.stringify({codeValue: value, activitySessionId: data.id}))
                setTerminalContent(resp?.data?.result || resp?.data?.message)
                setRunning(false)
            } catch (error: any) {
                console.log(error)
                toast("DANGER", error?.response?.data.message || "Unkown error occured while running your code")
                setRunning(false)
            }
        }
    }

    function handleChange(editorValue:string, b:any) {
        setValue(editorValue)
    }

    function handleShowInstructions() {

    }
    
    useEffect(() => {
        if(data && data?.answerValue) {
            setValue(data.answerValue)
        }
    }, [data])

    return (
        <StudentActivityView
            activityDetails={activity}
            value={value} 
            handleChange={handleChange}
            handleRun={handleRun} 
            terminalContent={terminalContent} 
            handleClearTerminal={handleClearTerminal}
            handleShowInstructions={handleShowInstructions}
            initializingActivity={isLoading || loadingActivity}
            running={running}
        />
    )
}

export default StudentActivityContainer