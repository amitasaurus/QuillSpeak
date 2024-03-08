import { useState } from 'react';
import languages, { TLang } from '@/app/lib/lang';
import Dropdown from '@/app/components/dropdown';
const defaultText =
  'Upon the crest of the hill, the weary traveler paused to catch his breath. The sun dipped low in the sky, casting long shadows across the landscape. In the distance, a faint whistle echoed through the valley, signaling the approach of the evening train.';

type Props = {
  lang: string;
  onLangChange: (language: TLang) => void;
  voices: SpeechSynthesisVoice[] | undefined;
  selectedVoice: SpeechSynthesisVoice | undefined;
  onVoiceSelection: (voice: SpeechSynthesisVoice) => void;
  speak: (text: string) => void;
};

export default function TTS({
  lang,
  onLangChange,
  voices,
  selectedVoice,
  onVoiceSelection,
  speak,
}: Props) {
  const [textToSpeak, updateTTS] = useState<string>(defaultText);

  return (
    <div className="flex flex-col items-center w-full md:w-3/5">
      <div className="w-full">
        <label
          htmlFor="message"
          className="flex items-center mb-2 text-sm font-medium text-slate-900 dark:text-white"
        >
          Your message{' '}
          <div className="ml-auto">
            <Dropdown
              data={languages}
              trigger={lang}
              menuOnClick={onLangChange}
            />
          </div>
        </label>
        <textarea
          id="message"
          rows={4}
          value={textToSpeak}
          className="block p-2.5 w-full text-sm text-slate-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write here"
          onChange={(e) => updateTTS(e.target.value)}
        ></textarea>
      </div>
      <div className="w-full my-8">
        <div className="mb-4 text-sm font-medium text-slate-900 dark:text-white">
          Select a voice
        </div>
        <div className="grid items-center grid-cols-2 md:grid-cols-6">
          {voices?.map((v, i) => (
            <div className="flex items-center mb-4" key={i}>
              <input
                checked={selectedVoice === v}
                onChange={() => onVoiceSelection(v)}
                id="default-radio-1"
                type="radio"
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-1"
                className="text-sm font-medium ms-2 text-slate-900 dark:text-gray-300"
              >
                {v.name.split(' ')[0]}
              </label>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => speak(textToSpeak)}
        className="mt-4 bg-primary border-slate-300 border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-slate-800 dark:text-slate-100 hover:text-white hover:bg-[#1B44C8] hover:border-[#1B44C8] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-[#1B44C8] active:border-[#1B44C8]"
      >
        Speak
      </button>
    </div>
  );
}
