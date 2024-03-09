import { Fragment, useEffect, useState } from 'react';
import languages, { TLang } from '@/app/lib/lang';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { RadioGroup } from '@headlessui/react';

type Props = {
  lang: TLang;
  handleLangChange: (language: TLang) => void;
  availableVoices: SpeechSynthesisVoice[] | undefined;
  handleVoiceSelection: (voice: SpeechSynthesisVoice) => void;
};

export default function Sidebar({
  lang,
  handleLangChange,
  availableVoices,
  handleVoiceSelection,
}: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState<TLang>(lang);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[] | undefined>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  function onLangChange(language: TLang) {
    setSelectedLanguage(language);
    handleLangChange(language);
  }

  function onVoiceChange(voice: SpeechSynthesisVoice) {
    setSelectedVoice(voice);
    handleVoiceSelection(voice);
  }

  useEffect(() => {
    if (Array.isArray(availableVoices) && availableVoices.length > 0) {
      const last = availableVoices.pop();
      if (last) availableVoices.unshift(last);
      setVoices(availableVoices);
      onVoiceChange(availableVoices[0]);
    }
  }, [availableVoices]);
  return (
    <div className="flex flex-col w-full h-screen px-2 py-4 overflow-y-scroll">
      <div className="mt-2">
        <div className="mb-2 text-sm font-semibold text-slate-800">
          Select Language
        </div>
        <Listbox value={selectedLanguage} onChange={onLangChange}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selectedLanguage.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronUpDownIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {languages.map((language) => (
                  <Listbox.Option
                    key={language.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={language}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {language.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      <div className="mt-8">
        <div className="mb-2 text-sm font-semibold text-slate-800">
          Select Voice
        </div>
        <RadioGroup value={selectedVoice} onChange={onVoiceChange}>
          <RadioGroup.Label className="sr-only">Select Voice</RadioGroup.Label>
          <div className="space-y-2">
            {Array.isArray(voices) &&
              voices.length > 0 &&
              voices.reverse().map((voice) => (
                <RadioGroup.Option
                  key={voice.voiceURI}
                  value={voice}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
                        : ''
                    }
                  ${checked ? 'bg-sky-900/75 text-white' : 'bg-white'}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${
                                checked ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {voice.name}
                            </RadioGroup.Label>
                          </div>
                        </div>
                        {checked && (
                          <div className="text-white shrink-0">
                            <CheckIcon className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
