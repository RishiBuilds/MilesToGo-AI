"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// Type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message?: string;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    abort: () => void;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
    onstart: (() => void) | null;
}

interface SpeechRecognitionConstructor {
    new(): SpeechRecognition;
}

declare global {
    interface Window {
        SpeechRecognition?: SpeechRecognitionConstructor;
        webkitSpeechRecognition?: SpeechRecognitionConstructor;
    }
}

export type VoiceInputState = "idle" | "listening" | "processing" | "error";

export interface UseVoiceInputOptions {
    onTranscript?: (transcript: string) => void;
    onInterimTranscript?: (transcript: string) => void;
    lang?: string;
    continuous?: boolean;
}

export interface UseVoiceInputReturn {
    isListening: boolean;
    state: VoiceInputState;
    transcript: string;
    interimTranscript: string;
    error: string | null;
    isSupported: boolean;
    startListening: () => void;
    stopListening: () => void;
    toggleListening: () => void;
    clearTranscript: () => void;
}

export function useVoiceInput(options: UseVoiceInputOptions = {}): UseVoiceInputReturn {
    const {
        onTranscript,
        onInterimTranscript,
        lang = "en-US",
        continuous = false,
    } = options;

    const [state, setState] = useState<VoiceInputState>("idle");
    const [transcript, setTranscript] = useState("");
    const [interimTranscript, setInterimTranscript] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSupported, setIsSupported] = useState(false);

    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const isListeningRef = useRef(false);
    const stateRef = useRef<VoiceInputState>("idle");

    // Keep stateRef in sync
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    // Store callbacks in refs to avoid recreating recognition
    const onTranscriptRef = useRef(onTranscript);
    const onInterimTranscriptRef = useRef(onInterimTranscript);

    useEffect(() => {
        onTranscriptRef.current = onTranscript;
        onInterimTranscriptRef.current = onInterimTranscript;
    }, [onTranscript, onInterimTranscript]);

    // Initialize speech recognition
    useEffect(() => {
        // Only run on client
        if (typeof window === "undefined") return;

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognitionAPI) {
            setIsSupported(false);
            return;
        }

        setIsSupported(true);

        try {
            const recognition = new SpeechRecognitionAPI();
            recognition.continuous = continuous;
            recognition.interimResults = true;
            recognition.lang = lang;

            recognition.onstart = () => {
                isListeningRef.current = true;
                setState("listening");
                setError(null);
            };

            recognition.onresult = (event: SpeechRecognitionEvent) => {
                let finalTranscript = "";
                let currentInterim = "";

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const result = event.results[i];
                    if (result.isFinal) {
                        finalTranscript += result[0].transcript;
                    } else {
                        currentInterim += result[0].transcript;
                    }
                }

                if (finalTranscript) {
                    // Pass only the NEW final transcript to the callback, not accumulated
                    onTranscriptRef.current?.(finalTranscript.trim());
                    setTranscript((prev) => prev + finalTranscript);
                    setInterimTranscript("");
                }

                if (currentInterim) {
                    setInterimTranscript(currentInterim);
                    onInterimTranscriptRef.current?.(currentInterim);
                }
            };

            recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                const errorCode = event.error || "unknown";

                // Only log non-expected errors
                if (errorCode !== "aborted" && errorCode !== "no-speech") {
                    console.warn("Speech recognition error:", errorCode);
                    setError(getErrorMessage(errorCode));
                    setState("error");
                }

                isListeningRef.current = false;
            };

            recognition.onend = () => {
                isListeningRef.current = false;
                // Use ref to avoid stale closure
                if (stateRef.current !== "error") {
                    setState("idle");
                }
                setInterimTranscript("");
            };

            recognitionRef.current = recognition;
        } catch (err) {
            console.warn("Failed to initialize speech recognition:", err);
            setIsSupported(false);
        }

        // Cleanup on unmount
        return () => {
            if (recognitionRef.current && isListeningRef.current) {
                try {
                    recognitionRef.current.abort();
                } catch {
                    // Ignore cleanup errors
                }
            }
        };
    }, [lang, continuous]);

    const startListening = useCallback(() => {
        if (!recognitionRef.current || isListeningRef.current) return;

        setTranscript("");
        setInterimTranscript("");
        setError(null);

        try {
            recognitionRef.current.start();
        } catch (err) {
            console.warn("Failed to start speech recognition:", err);
            setError("Failed to start voice input. Please try again.");
            setState("error");
        }
    }, []);

    const stopListening = useCallback(() => {
        if (!recognitionRef.current || !isListeningRef.current) return;

        try {
            recognitionRef.current.stop();
        } catch {
            // Ignore stop errors
        }
    }, []);

    const toggleListening = useCallback(() => {
        if (isListeningRef.current) {
            stopListening();
        } else {
            startListening();
        }
    }, [startListening, stopListening]);

    const clearTranscript = useCallback(() => {
        setTranscript("");
        setInterimTranscript("");
    }, []);

    return {
        isListening: state === "listening",
        state,
        transcript,
        interimTranscript,
        error,
        isSupported,
        startListening,
        stopListening,
        toggleListening,
        clearTranscript,
    };
}

function getErrorMessage(errorCode: string): string {
    switch (errorCode) {
        case "not-allowed":
            return "Microphone access denied. Please allow microphone permissions.";
        case "no-speech":
            return "No speech detected. Please try again.";
        case "audio-capture":
            return "No microphone found. Please check your audio settings.";
        case "network":
            return "Network error. Please check your connection.";
        case "service-not-allowed":
            return "Speech service not available in your browser.";
        default:
            return "Voice input error. Please try again.";
    }
}

export default useVoiceInput;
