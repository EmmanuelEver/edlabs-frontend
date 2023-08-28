import LoadingScreen from "@/components/loader/LoadingScreen";
import { IActivityFull } from "@/types/types";
import { FC } from "react"
import EditorView from "./parts/EditorView"
import TerminalContainer from "./parts/terminalContainer/TerminalContainer";

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
  handleExit: () => void;
}

const StudentActivityView: FC<IProps> = ({terminalContent, handleClearTerminal, value, handleChange, handleRun, handleShowInstructions, initializingActivity, activityDetails, running, handleExit}) => {
  return (
    <div className="flex w-full h-full flex-nowrap">
      <div className="w-7/12 ">
        <EditorView activityTitle={activityDetails?.title} running={running} activityDetails={activityDetails} handleShowInstructions={handleShowInstructions} value={value} handleChange={handleChange} handleRun={handleRun} handleExit={handleExit} />
      </div>
      <div className="w-5/12">
        <TerminalContainer
          terminalContent={terminalContent}
          handleClearTerminal={handleClearTerminal}
          details={activityDetails}
        />
      </div>
      {
        initializingActivity && <LoadingScreen text="Initializing Activity Session" />
      }
    </div>
  )
}

export default StudentActivityView