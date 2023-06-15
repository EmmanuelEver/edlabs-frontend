import LoadingScreen from "@/components/loader/LoadingScreen";
import { IActivityFull } from "@/types/types";
import { FC } from "react"
import EditorView from "./parts/EditorView"
import TerminalView from "./parts/TerminalView"

interface IProps {
  terminalContent: string;
  handleClearTerminal: () => void;
  value: string;
  handleChange: (value:string, b:any) => void;
  handleRun: () => void;
  handleShowInstructions: () => void;
  initializingActivity: boolean;
  activityDetails: IActivityFull | undefined;
  running: boolean;
}

const StudentActivityView: FC<IProps> = ({terminalContent, handleClearTerminal, value, handleChange, handleRun, handleShowInstructions, initializingActivity, activityDetails, running}) => {
  return (
    <div className="flex w-full h-full flex-nowrap">
      <div className="w-1/2">
        <EditorView running={running} activityDetails={activityDetails} handleShowInstructions={handleShowInstructions} value={value} handleChange={handleChange} handleRun={handleRun} />
      </div>
      <div className="w-1/2">
        <TerminalView 
          terminalContent={terminalContent}
          handleClearTerminal={handleClearTerminal}
        />
      </div>
      {
        initializingActivity && <LoadingScreen text="Initializing Activity Session" />
      }
    </div>
  )
}

export default StudentActivityView