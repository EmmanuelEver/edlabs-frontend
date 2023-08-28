import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from "@codemirror/language"
import { c } from "@codemirror/legacy-modes/mode/clike"
import { python } from "@codemirror/legacy-modes/mode/python"
import { keymap } from "@codemirror/view";
import { insertTab, indentLess } from '@codemirror/commands'
import { FC } from 'react';
import { tokyoNightDay } from '@uiw/codemirror-theme-tokyo-night-day'
import { IActivityFull } from '@/types/types';
import ActivityDetails from '@/components/activityDetails/ActivityDetails';
import { aura } from "@uiw/codemirror-theme-aura"
import Link from 'next/link';


interface IProps {
  handleRun: () => void;
  value: string;
  handleChange: (value: string, b: any) => void;
  handleShowInstructions: () => void;
  activityDetails: IActivityFull | undefined;
  running: boolean;
  activityTitle: string;
  handleExit: () => void;
}

const EditorView: FC<IProps> = ({ handleRun, value, handleChange, activityDetails, running, activityTitle, handleExit}) => {
  return (
    <div className="flex flex-col w-full h-full bg-[#1A183D] border-r border-blue-300">
      <div className='pt-4 pb-2.5 bg-dark-200 px-4 min-h-[70px] flex justify-between'>
        <h1 className='text-lg font-medium text-light-300'>{activityTitle}</h1>
        <button onClick={handleExit} className='flex items-center text-base opacity-50 fill-light-300 text-light-300 hover:opacity-100 transition-opacity px-2.5 py-2'>
          <span className='mr-4'>Exit</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fillRule="inherit"
            clipRule="evenodd"
          >
            <path d="M11 21h8.033v-2l1-1v4H11v2L1 21V3l10-3v2h9.033v5l-1-1V3H11v18zm-1 1.656V1.344l-8 2.4v16.512l8 2.4zM21.086 12l-3.293-3.293L18.5 8l4.5 4.5-4.5 4.5-.707-.707L21.086 13h-9.053v-1h9.053z"></path>
          </svg>
        </button>
      </div>
      <div className='flex-1 pl-4 overflow-y-auto' >
        <CodeMirror className='h-full' theme={aura} height='100%' extensions={[StreamLanguage.define(activityDetails?.lang === "c" ? c : activityDetails?.lang === "python" ? python : c),
        keymap.of([{ key: 'Tab', preventDefault: true, run: insertTab }, { key: 'Shift-Tab', preventDefault: true, run: indentLess }]),
        ]} value={value} onChange={handleChange} />
      </div>
      <div className='flex items-center justify-between px-4 py-2.5 border-t border-blue-200 border-opacity-70'>
        <div>
          {
            running && <svg
              className="origin-center translate-x-5 translate-y-1/2"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 100 100"
              width="40px"
              height="40px"
              overflow="visible"
            >
              <g transform="translate(50 50)">
                <animateTransform
                  attributeName="transform"
                  dur="0.2s"
                  keyTimes="0;1"
                  repeatCount="indefinite"
                  type="rotate"
                  values="0;45"
                ></animateTransform>
                <path
                  fill="#e9e5dd"
                  d="M29.492-5.5h8v11h-8a30 30 0 01-4.75 11.465L30.4 22.62 22.62 30.4l-5.656-5.657A30 30 0 015.5 29.492v8h-11v-8a30 30 0 01-11.465-4.75L-22.62 30.4-30.4 22.62l5.657-5.656A30 30 0 01-29.492 5.5h-8v-11h8a30 30 0 014.75-11.465L-30.4-22.62l7.779-7.779 5.656 5.657A30 30 0 01-5.5-29.492v-8h11v8a30 30 0 0111.465 4.75L22.62-30.4 30.4-22.62l-5.657 5.656A30 30 0 0129.492-5.5M0-20a20 20 0 100 40 20 20 0 100-40"
                ></path>
              </g>
            </svg>
          }
        </div>
        <button disabled={running} onClick={handleRun} className="border-dark-header self-end text-light-100 bg-[#4631C5] rounded py-1.5 px-4">
          {
            running ? "loading..." : "Run"
          }
        </button>
      </div>
    </div>
  )
}

export default EditorView