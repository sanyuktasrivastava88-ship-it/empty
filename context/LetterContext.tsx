"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LetterState {
  letterCount: number;
  setLetterCount: (count: number) => void;
  titles: string[];
  setTitles: (titles: string[]) => void;
  updateTitle: (index: number, title: string) => void;
  clearAllTitles: () => void;
  letterContents: Record<number, string>;
  setLetterContents: (contents: Record<number, string>) => void;
  updateLetterContent: (index: number, content: string) => void;
  letterImages: Record<number, string>;
  setLetterImages: (images: Record<number, string>) => void;
  updateLetterImage: (index: number, image: string) => void;
  removeLetterImage: (index: number) => void;
  polaroidCaptions: Record<number, string>;
  updatePolaroidCaption: (index: number, caption: string) => void;
  mailboxText: string;
  setMailboxText: (text: string) => void;
}

const LetterContext = createContext<LetterState | undefined>(undefined);

export function LetterProvider({ children }: { children: ReactNode }) {
  const [letterCount, setLetterCount] = useState(1);
  const [titles, setTitles] = useState<string[]>([]);
  const [letterContents, setLetterContents] = useState<Record<number, string>>({});
  const [letterImages, setLetterImages] = useState<Record<number, string>>({});
  const [polaroidCaptions, setPolaroidCaptions] = useState<Record<number, string>>({});
  const [mailboxText, setMailboxText] = useState("You have mail!");

  const updateTitle = (index: number, title: string) => {
    setTitles((prev) => {
      const updated = [...prev];
      updated[index] = title;
      return updated;
    });
  };

  const clearAllTitles = () => {
    setTitles([]);
  };

  const updateLetterContent = (index: number, content: string) => {
    setLetterContents((prev) => ({
      ...prev,
      [index]: content,
    }));
  };

  const updateLetterImage = (index: number, image: string) => {
    setLetterImages((prev) => ({
      ...prev,
      [index]: image,
    }));
  };

  const removeLetterImage = (index: number) => {
    setLetterImages((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  const updatePolaroidCaption = (index: number, caption: string) => {
    setPolaroidCaptions((prev) => ({
      ...prev,
      [index]: caption,
    }));
  };

return (
      <LetterContext.Provider
        value={{
          letterCount,
          setLetterCount,
          titles,
          setTitles,
          updateTitle,
          clearAllTitles,
          letterContents,
          setLetterContents,
          updateLetterContent,
          letterImages,
          setLetterImages,
          updateLetterImage,
          removeLetterImage,
          polaroidCaptions,
          updatePolaroidCaption,
          mailboxText,
          setMailboxText,
        }}
      >
      {children}
    </LetterContext.Provider>
  );
}

export function useLetters() {
  const context = useContext(LetterContext);
  if (!context) {
    throw new Error("useLetters must be used within a LetterProvider");
  }
  return context;
}
