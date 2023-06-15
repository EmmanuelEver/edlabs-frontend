// components/alert/AlertDialog.tsx
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, ReactNode } from "react";

type AlertComponentProps = {
  open: boolean;
  message: ReactNode;
  title: ReactNode;
  onClose(): void;
  onConfirm(): Promise<void> | void;
  confirming?: boolean;
};

const AlertDialog = (props: AlertComponentProps) => {
  return (
    <Transition appear show={props.open} as={Fragment}>

      <Dialog
        as="div"
        className="relative z-10"
        onClose={props.onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {props.title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{props.message}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md text-header bg-accentColor-200 hover:bg-opacity-80"
                    onClick={props.onClose}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md text-light-100 bg-dark-header hover:bg-opacity-90"
                    onClick={props.onConfirm}
                  >
                    {props.confirming ? "Loading..." : "Yes"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default AlertDialog;
