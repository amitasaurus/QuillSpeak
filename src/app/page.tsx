'use client';
import { useEffect, useState } from 'react';
import { TLang } from './lib/lang';
import useVoice from './lib/useVoice';
import TTS from './components/TTS';

export default function Home() {
  const [lang, setLang] = useState<string>('ja-JP');
  const { matchingVoices } = useVoice(lang);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[] | undefined>(
    undefined
  );
  const [selectedVoice, setSelectedVoice] = useState<
    SpeechSynthesisVoice | undefined
  >(undefined);

  function onLangChange(language: TLang): void {
    setLang(language.id);
  }

  useEffect(() => {
    if (Array.isArray(matchingVoices) && matchingVoices.length > 0) {
      {
        setVoices(matchingVoices);
        setSelectedVoice(matchingVoices[matchingVoices.length - 1]);
      }
    }
  }, [matchingVoices]);

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
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <TTS
        lang={lang}
        onLangChange={onLangChange}
        onVoiceSelection={setSelectedVoice}
        selectedVoice={selectedVoice}
        speak={speak}
        voices={voices}
      />
    </main>
  );
}
