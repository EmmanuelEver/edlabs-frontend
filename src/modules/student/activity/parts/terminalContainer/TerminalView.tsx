import { FC } from "react";
import { CommandLineIcon } from '@heroicons/react/24/outline'
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { CopyBlock, atomOneDark } from "react-code-blocks";
import { IActivityFull } from '@/types/types'

interface IProps {
    terminalContent: string;
    showInstructions: boolean;
    handleShowInstruction: (val: boolean) => void;
    details: IActivityFull;
}

const TerminalView: FC<IProps> = ({ terminalContent, handleShowInstruction, showInstructions, details }) => {
    return (
        <div className="flex flex-col w-full h-full bg-dark-200">
            <div className="w-full flex-shrink-0 pt-4 pb-2.5 pl-2.5 pr-4  flex justify-start gap-4 items-center">
                <button onClick={() => handleShowInstruction(false)} className={clsx("flex items-center gap-2 px-4 py-2.5 rounded transition-colors", showInstructions ? "bg-transparent text-light-300 text-opacity-50" : "bg-slate-300 bg-opacity-10 text-light-300")}>
                    <DocumentTextIcon className={clsx("w-5 h-5 text-light-300 transition-opacity", !showInstructions ? "text-opacity-100" : "text-opacity-50")} />
                    Instructions
                </button>
                <button onClick={() => handleShowInstruction(true)} className={clsx("flex items-center gap-2 px-4 py-2.5 rounded transition-colors", !showInstructions ? "bg-transparent text-light-300 text-opacity-50" : "bg-slate-300 bg-opacity-10 text-light-300")}>
                    <CommandLineIcon className={clsx("w-5 h-5 translate-y-0.5 text-light-300", showInstructions ? "text-opacity-100" : "text-opacity-50")} />
                    Console
                </button>
            </div>
            <div className="flex-1 w-full mt-4 overflow-hidden">
                {
                    showInstructions ?
                        <pre className="p-2.5 text-base text-light-200 whitespace-pre-wrap  overflow-auto w-full h-full">
                            {terminalContent}
                        </pre>
                        :
                        <>
                            <div className='h-full px-3 pb-4 overflow-y-auto'>
                                <h2 className='text-3xl font-medium text-light-200'>{details?.title}</h2>
                                <p className='text-base text-light-200'>
                                    {details?.section.title} ({details?.section.shortcode})
                                </p>
                                <div className='mt-4 text-light-200' dangerouslySetInnerHTML={{ __html: details?.description || "" }} />
                                {
                                    !!details?.starterCode &&
                                    <div className='mt-4'>
                                        <h3 className='mb-2 font-medium text-md text-light-200'>Starter code:</h3>
                                        <CopyBlock
                                            text={details.starterCode}
                                            theme={atomOneDark}
                                            showLineNumbers={true}
                                            language={details?.lang || "c"}
                                            wrapLines
                                        />
                                    </div>
                                }
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

export default TerminalView