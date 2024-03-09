import React, { Fragment, useState } from 'react';
import { Switch } from '@headlessui/react';
type Props = {
  speak: (text: string) => void;
};

export default function UserInput({ speak }: Props) {
  const [inputText, updateInputText] = useState('');
  const [isTTS, updateTTS] = useState<boolean>(true);

  function handleSpeakAction() {
    speak(inputText);
  }

  return (
    <div className="w-3/5 mt-[25%]">
      <div className="flex items-center mb-4">
        <div className="text-sm font-medium text-slate-900 dark:text-white">
          Web Link
        </div>
        <Switch
          checked={isTTS}
          onChange={() => updateTTS(!isTTS)}
          className={`${
            isTTS ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full mx-2`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              isTTS ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
        <div className="text-sm font-medium text-slate-900 dark:text-white">
          Text
        </div>
      </div>
      {isTTS ? (
        <Fragment>
          <textarea
            onChange={(e) => updateInputText(e.target.value)}
            id="tts"
            name="tts"
            rows={4}
            className="block p-2.5 w-full text-sm text-slate-900 bg-[#f3f5f8] rounded-lg border border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600"
            placeholder="Write here"
          ></textarea>
        </Fragment>
      ) : (
        <div className="flex flex-col">
          <input
            type="url"
            name="web"
            id="web"
            placeholder="https://"
            className="p-2.5 w-full text-sm text-slate-900 bg-[#f3f5f8] rounded-lg border border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600"
          />
          <label htmlFor="web" className="mt-1 text-xs text-slate-500">
            Paste a link. We'll fetch the text.
          </label>
        </div>
      )}
      <button
        onClick={handleSpeakAction}
        type="button"
        className="mt-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Speak
      </button>
    </div>
  );
}
