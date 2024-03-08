'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [textToSpeak, updateTTS] = useState('');
  function speak(text: string): void {
    if (text.length === 0) return;
    if ('speechSynthesis' in window) {
      const to_speak = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(to_speak);
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-2/5">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your message
        </label>
        <textarea
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write here"
          onChange={(e) => updateTTS(e.target.value)}
        ></textarea>
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
