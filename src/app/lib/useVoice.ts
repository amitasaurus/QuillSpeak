import { useState, useEffect } from 'react';
const useVoice = (lang: string) => {
  const [matchingVoices, setMatchingVoices] = useState<
    SpeechSynthesisVoice[] | undefined
  >(undefined);

  useEffect(() => {
    getVoices().then((voiceData) => {
      setMatchingVoices(voiceData.filter((v) => v.lang === lang));
    });
  }, [lang]);

  function getVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve, reject) => {
      if (window.speechSynthesis) {
        const synth = window.speechSynthesis;
        const interval = setInterval(() => {
          const allVoices = synth.getVoices();
          if (Array.isArray(allVoices) && allVoices.length > 0) {
            clearInterval(interval);
            resolve(allVoices);
          }
        }, 10);
      } else {
        reject(new Error('Speech Synthesis not supported'));
      }
    });
  }
  return { matchingVoices };
};
export default useVoice;