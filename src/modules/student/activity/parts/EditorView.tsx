import CodeMirror from '@uiw/react-codemirror';
import {StreamLanguage} from "@codemirror/language"
import {c} from "@codemirror/legacy-modes/mode/clike"
import { keymap } from "@codemirror/view";
import {insertTab, indentLess} from '@codemirror/commands'
import { FC } from 'react';
import {tokyoNightDay} from '@uiw/codemirror-theme-tokyo-night-day'
import { InformationCircleIcon } from '@heroicons/react/24/solid'


interface IProps {
  handleRun: () => void;
  value: string;
  handleChange: (value:string, b:any) => void;
  handleShowInstructions: () => void;
}

const EditorView: FC<IProps> = ({handleRun, value, handleChange, handleShowInstructions}) => {
  return (
    <div className="w-full h-full flex flex-col border-light-300">
         <div className="w-full flex-shrink-0 py-2.5 pl-2.5 pr-4 border-b border-light-300 flex justify-between items-center">
            <div>
              <button onClick={handleShowInstructions} title='Show instructions' className="w-10 h-10 flex items-center justify-center rounded-full bg-accentColor-200">
                  <InformationCircleIcon className="w-7 h-7 fill-dark-header" />
              </button>
              <h3 className="text-subHeader text-base"></h3>
            </div>
            <div className="">
                <button onClick={handleRun} className="border-light-300 text-light-100 bg-dark-header hover:bg-dark-subHeader border rounded py-1.5 px-4">
                    Run
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