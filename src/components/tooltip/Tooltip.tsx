import { FC, Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';

interface ITooltipProps {
  content: string;
  children: React.ReactElement;
  size?: string;
}

const Tooltip:FC<ITooltipProps> = ({ content, children, size="w-20" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}
      </div>

      <Transition
        as={Fragment}
        show={isOpen}
        enter="transition-opacity duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute translate-y-2 z-modal">
          <div className={clsx("p-2 text-white text-sm bg-gray-800 rounded-md", size)}>
            {content}
          </div>
          <div className="absolute -top-0.5 w-4 h-4 transform rotate-45 translate-x-1 bg-gray-800 -z-10"></div>
        </div>
      </Transition>
    </div>
  );
};

export default Tooltip;
