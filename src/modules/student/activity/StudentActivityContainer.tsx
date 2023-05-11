import { useState } from "react"
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
    const [terminalContent, setTerminalContent] = useState("")
    const [value, setValue] = useState(initialCode)
    
    function handleClearTerminal() {

    }

    function handleRun() {

    }

    function handleChange(editorValue:string, b:any) {
        setValue(editorValue)
    }

    function handleShowInstructions() {

    }
    
    return (
        <StudentActivityView 
            value={value} 
            handleChange={handleChange}
            handleRun={handleRun} 
            terminalContent={terminalContent} 
            handleClearTerminal={handleClearTerminal}
            handleShowInstructions={handleShowInstructions}
        />
    )
}

export default StudentActivityContainer