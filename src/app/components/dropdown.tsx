import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { TLang } from '../lib/lang';

type Props = {
  data: TLang[];
  menuOnClick: (item: TLang) => void;
  trigger: string;
};

const Dropdown = (props: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="px-3 py-1.5 font-sans text-xs font-bold text-center text-slate-900 dark:text-slate-100 align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none flex items-center">
          {props.trigger}{' '}
          <img
            src="https://www.svgrepo.com/show/9249/down-chevron.svg"
            width={12}
            height={12}
            className="ml-2"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 h-96 overflow-y-scroll origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          {props.data.map((l, i) => (
            <Menu.Item key={i}>
              <button
                onClick={() => props.menuOnClick(l)}
                className={`group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-slate-900`}
              >
                {l.name}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default Dropdown;
