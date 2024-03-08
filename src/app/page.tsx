'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import languages from './lib/lang';

export default function Home() {
  const [textToSpeak, updateTTS] = useState<string>('');
  const [lang, setLang] = useState<string>('ja-JP');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[] | undefined>(
    undefined
  );
  const [selectedVoice, setSelectedVoice] = useState<
    SpeechSynthesisVoice | undefined
  >(undefined);

  function updateVoices() {
    const matchingVoices = getVoices(lang);
    if (matchingVoices && matchingVoices.length > 0) {
      setVoices(matchingVoices);
      console.log(matchingVoices);
      setSelectedVoice(matchingVoices[0]);
    }
  }

  useEffect(() => {
    if (window.speechSynthesis) {
      updateVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        updateVoices();
      };
    } else {
      console.error('Speech Synthesis not supported');
    }
  }, [lang]);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  /** Returns all the voices available for a language */
  function getVoices(lang: string): SpeechSynthesisVoice[] | undefined {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const voice = voices.filter((v) => v.lang === lang);
    return voice;
  }

  function speak(text: string): void {
    if (text.length === 0) return;
    if ('speechSynthesis' in window) {
      const to_speak = new SpeechSynthesisUtterance(text);
      if (selectedVoice) {
        to_speak.voice = selectedVoice;
        to_speak.lang = lang;
      }
      window.speechSynthesis.speak(to_speak);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-3/5">
        <label
          htmlFor="message"
          className="flex items-center mb-2 text-sm font-medium text-slate-900 dark:text-white"
        >
          Your message <div className="ml-auto"></div>
        </label>
        <textarea
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-slate-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write here"
          onChange={(e) => updateTTS(e.target.value)}
        ></textarea>
      </div>
      <div className="my-8 w-3/5">
        <div className="text-sm font-medium text-slate-900 dark:text-white mb-4">
          Select a voice
        </div>
        <div className="items-center grid grid-cols-6">
          {voices?.map((v) => (
            <div className="flex items-center mb-4">
              <input
                checked={selectedVoice === v}
                onChange={() => setSelectedVoice(v)}
                id="default-radio-1"
                type="radio"
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-1"
                className="ms-2 text-sm font-medium text-slate-900 dark:text-gray-300"
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
        className="mt-4 bg-primary border-slate-300 border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-slate-800 hover:text-white hover:bg-[#1B44C8] hover:border-[#1B44C8] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-[#1B44C8] active:border-[#1B44C8]"
      >
        Speak
      </button>
    </main>
  );
}
