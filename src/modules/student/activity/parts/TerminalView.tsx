import { FC } from "react";

interface IProps {
    terminalContent: string;
    handleClearTerminal: () => void;
}

const TerminalView: FC <IProps> = ({terminalContent, handleClearTerminal}) => {
  return (
    <div className="w-full h-full flex flex-col  border-l border-light-300">
        <div className="w-full flex-shrink-0 py-2.5 pl-2.5 pr-4 border-b border-light-300 flex justify-between items-center">
            <h3 className="text-subHeader text-base">Terminal</h3>
            <div className="">
                <button onClick={handleClearTerminal} className="border-light-300 text-opacity-70 text-body hover:text-opacity-100 border rounded py-1.5 px-4">
                    Clear
                </button>
            </div>
        </div>
        <div className="flex-1 w-full p-2.5 text-base text-body">
            {terminalContent}
        </div>
    </div>
  )
}

export default TerminalView