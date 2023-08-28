import { IActivityFull } from "@/types/types";
import { FC, useState } from "react";
import TerminalView from "./TerminalView";

interface IProps {
    terminalContent: string;
    handleClearTerminal?: () => void;
    details: IActivityFull;
}

const TerminalContainer:FC<IProps> = ({terminalContent, details}) => {
    const [showInstructions, setShowInstructions] = useState(true)
  return (
    <TerminalView details={details} terminalContent={terminalContent} showInstructions={showInstructions} handleShowInstruction={setShowInstructions} />
  )
}

export default TerminalContainer