'use client';
import { useEffect, useState } from 'react';
import languages, { TLang } from './lib/lang';
import useVoice from './lib/useVoice';
import UserInput from './components/UserInput';
import Sidebar from './components/Sidebar';

export default function Home() {
  const [lang, setLang] = useState<TLang>(languages[18]);
  const { matchingVoices } = useVoice(lang.id);
  const [selectedVoice, setSelectedVoice] = useState<
    SpeechSynthesisVoice | undefined
  >(undefined);
  const [pageContent, setPageContent] = useState('');

  function onLangChange(language: TLang): void {
    setLang(language);
  }
  function onVoiceChange(voice: SpeechSynthesisVoice): void {
    setSelectedVoice(voice);
  }

  useEffect(() => {
    if (Array.isArray(matchingVoices) && matchingVoices.length > 0) {
      {
        setSelectedVoice(matchingVoices[matchingVoices.length - 1]);
      }
    }
  }, [matchingVoices]);

  function speak(text: string): void {
    if (text.length === 0) return;
    if ('speechSynthesis' in window) {
      setPageContent(text);
      const to_speak = new SpeechSynthesisUtterance(text);
      if (selectedVoice) {
        to_speak.voice = selectedVoice;
        to_speak.lang = lang.id;
      }
      window.speechSynthesis.speak(to_speak);
    }
  }

  return (
    <main className="grid w-screen h-screen grid-cols-12">
      <div className="col-span-3">
        <Sidebar
          lang={lang}
          handleLangChange={onLangChange}
          availableVoices={matchingVoices}
          handleVoiceSelection={onVoiceChange}
        />
      </div>
      <div className="flex items-start justify-center col-span-9 bg-white">
        {pageContent.length === 0 ? (
          <UserInput speak={speak} />
        ) : (
          <div className="p-24 font-normal text-slate-800">{pageContent}</div>
        )}
      </div>
    </main>
  );
}
