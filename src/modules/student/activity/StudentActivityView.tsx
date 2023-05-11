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
}

const StudentActivityView: FC<IProps> = ({terminalContent, handleClearTerminal, value, handleChange, handleRun, handleShowInstructions}) => {
  return (
    <div className="flex flex-nowrap w-full h-full">
      <div className="w-1/2">
        <EditorView handleShowInstructions={handleShowInstructions} value={value} handleChange={handleChange} handleRun={handleRun} />
      </div>
      <div className="w-1/2">
        <TerminalView 
          terminalContent={terminalContent}
          handleClearTerminal={handleClearTerminal}
        />
      </div>
    </div>
  )
}

export default StudentActivityView