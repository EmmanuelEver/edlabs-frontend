import CodeMirror from '@uiw/react-codemirror';
import {StreamLanguage} from "@codemirror/language"
import {c} from "@codemirror/legacy-modes/mode/clike"
import { keymap } from "@codemirror/view";
import {insertTab, indentLess} from '@codemirror/commands'
import { FC } from 'react';
import {tokyoNightDay} from '@uiw/codemirror-theme-tokyo-night-day'
import { IActivityFull } from '@/types/types';
import ActivityDetails from '@/components/activityDetails/ActivityDetails';


interface IProps {
  handleRun: () => void;
  value: string;
  handleChange: (value:string, b:any) => void;
  handleShowInstructions: () => void;
  activityDetails: IActivityFull | undefined;
  running: boolean;
}

const EditorView: FC<IProps> = ({handleRun, value, handleChange, handleShowInstructions, activityDetails, running}) => {
  return (
    <div className="flex flex-col w-full h-full border-light-300">
         <div className="w-full flex-shrink-0 py-2.5 pl-6 pr-4 border-b border-light-300 flex justify-between items-center">
            <div className='flex-1'>
              <h3 title={activityDetails?.title} className="mr-4 text-base truncate text-subHeader">{activityDetails?.title}</h3>
            </div>
            <div className="flex items-center flex-shrink-0 gap-2">
                <ActivityDetails details={activityDetails} />
                <button disabled={running} onClick={handleRun} className="border-dark-header text-light-100 bg-dark-header relative hover:bg-dark-subHeader border rounded py-1.5 px-4">
                    {
                      running ? "loading..." : "Run"
                    }
                </button>
            </div>
        </div>
        <CodeMirror className='h-full' theme={tokyoNightDay} height='100%' extensions={[StreamLanguage.define(c),
         keymap.of([{key: 'Tab', preventDefault: true, run: insertTab}, {key: 'Shift-Tab', preventDefault: true, run: indentLess}]),
        ]} value={value} onChange={handleChange} />
    </div>
  )
}

export default EditorView