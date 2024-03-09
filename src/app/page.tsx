'use client';
import { useEffect, useState } from 'react';
import languages, { TLang } from './lib/lang';
import useVoice from './lib/useVoice';
import UserInput from './components/UserInput';
import Sidebar from './components/Sidebar';
import sanitize from 'sanitize-html';

export default function Home() {
  const [lang, setLang] = useState<TLang>(languages[18]);
  const { matchingVoices } = useVoice(lang.id);
  const [selectedVoice, setSelectedVoice] = useState<
    SpeechSynthesisVoice | undefined
  >(undefined);
  const [pageContent, setPageContent] = useState<React.ReactElement[] | string>(
    ''
  );

  function onLangChange(language: TLang): void {
    setLang(language);
  }
  function onVoiceChange(voice: SpeechSynthesisVoice): void {
    setSelectedVoice(voice);
  }

  function pageContentFormatter(lines: string[]) {
    const pageContentToDisplay = lines.map((line, index) => (
      <p key={index}>{line}</p>
    ));
    return pageContentToDisplay;
  }

  function speak(text: string): void {
    if (text.length === 0) return;
    if ('speechSynthesis' in window) {
      const sanitizedText = sanitize(text);
      const lines = sanitizedText.split('\n').map((line) => line.trim());
      setPageContent(pageContentFormatter(lines));
      lines.forEach((line) => {
        const to_speak = new SpeechSynthesisUtterance(line);
        if (selectedVoice) {
          to_speak.voice = selectedVoice;
          to_speak.lang = lang.id;
        }
        window.speechSynthesis.speak(to_speak);
      });
    }
  }

  return (
    <main className="grid w-screen h-screen grid-cols-10">
      <div className="col-span-2">
        <Sidebar
          lang={lang}
          handleLangChange={onLangChange}
          availableVoices={matchingVoices}
          handleVoiceSelection={onVoiceChange}
        />
      </div>
      <div className="flex items-start justify-center col-span-8 bg-white">
        {!pageContent ? (
          <UserInput speak={speak} />
        ) : (
          <div className="w-full h-screen p-24 overflow-x-scroll font-normal text-slate-800">
            {pageContent}
          </div>
        )}
      </div>
    </main>
  );
}
