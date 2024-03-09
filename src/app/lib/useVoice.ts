/**
 * Custom React Hook for retrieving and managing speech synthesis voices.
 * @param lang The language code to filter voices by.
 * @returns An object containing the list of matching voices and the total available voices.
 */
import { useState, useEffect } from 'react';
const useVoice = (lang: string) => {
  // store matching voices and total voices
  const [matchingVoices, setMatchingVoices] = useState<
    SpeechSynthesisVoice[] | undefined
  >(undefined);
  const [totalVoices, setTotalVoices] = useState<
    SpeechSynthesisVoice[] | undefined
  >(undefined);

  /**
   * fetch system voices and filter them based on the provided language code.
   */
  useEffect(() => {
    getSystemVoices().then((voiceData) => {
      setTotalVoices(voiceData);
      setMatchingVoices(voiceData.filter((v) => v.lang === lang));
    });
  }, [lang]);

  /**
   * Function to asynchronously retrieve system voices.
   * @returns A Promise that resolves to an array of SpeechSynthesisVoice objects.
   */
  function getSystemVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve, reject) => {
      // Check if window.speechSynthesis is available
      if (window.speechSynthesis) {
        const synth = window.speechSynthesis;
        // Set an interval to check every 10ms if available voices have been loaded
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
  return { matchingVoices, totalVoices };
};
export default useVoice;
