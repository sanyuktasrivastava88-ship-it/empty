"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SharedData {
  titles: string[];
  letterCount: number;
  letterContents: Record<number, string>;
  letterImages: Record<number, string>;
  polaroidCaptions: Record<number, string>;
  mailboxText?: string;
  mailboxImage?: string;
}

export default function SharePage() {
  const [data, setData] = useState<SharedData | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get("d");
    if (dataParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(dataParam)))));
        setData(decoded);
      } catch (e) {
        console.error("Parse error:", e);
        setError(true);
      }
    } else {
      setError(true);
    }
  }, []);

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops!</h1>
          <p className="text-gray-600 mb-4">This shared link is invalid or has expired.</p>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="animate-pulse text-pink-400">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4 md:p-8 pb-24">
      <div className="max-w-6xl mx-auto">
        {!opened ? (
          <motion.div
            className="flex flex-col items-center justify-center min-h-[80vh] gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="cursor-pointer"
              onClick={() => setOpened(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                src="/mailbox.jpg"
                alt="Mailbox"
                className="w-80 md:w-[28rem] h-auto drop-shadow-2xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.div
              className="text-center cursor-pointer"
              onClick={() => setOpened(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {data.mailboxText || "You have mail!"}
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Tap anywhere to open your letters
              </motion.p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {data.titles.map((title, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-sm text-gray-700 shadow-sm"
                  >
                    {title}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Your Letters
              </h1>
              <p className="text-gray-600">Tap a letter to read it</p>
            </div>

            {selectedLetter === null ? (
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {Array.from({ length: data.letterCount }).map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                      whileHover={{ y: -10, scale: 1.05 }}
                      onClick={() => setSelectedLetter(index)}
                      className="relative cursor-pointer"
                    >
                      <EnvelopeCard
                        title={data.titles[index] || "Untitled"}
                        letterNumber={index + 1}
                        hasImage={!!data.letterImages[index]}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-[60vh]">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full max-w-5xl"
                >
                  <button
                    onClick={() => setSelectedLetter(null)}
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-medium">Back to all letters</span>
                  </button>

                  <div className="flex items-center justify-center gap-4 md:gap-8">
                    {data.letterContents[selectedLetter]?.trim() && (
                      <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                        className={data.letterImages[selectedLetter] ? "flex-1 max-w-md" : "w-full max-w-2xl"}
                      >
                        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center">
                              <span className="text-white text-sm font-bold">{selectedLetter + 1}</span>
                            </div>
                            <span className="text-gray-500 text-sm">Letter {selectedLetter + 1}</span>
                          </div>
                          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                            {data.titles[selectedLetter]}
                          </h2>
                          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {data.letterContents[selectedLetter]}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {data.letterImages[selectedLetter] && (
                      <motion.div
                        initial={{ x: data.letterContents[selectedLetter]?.trim() ? 100 : 0, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: data.letterContents[selectedLetter]?.trim() ? 0.3 : 0.2, type: "spring", stiffness: 150 }}
                        className={data.letterContents[selectedLetter]?.trim() ? "flex-1 max-w-xs" : "w-full max-w-sm"}
                      >
                        <div className="bg-white p-3 rounded-lg shadow-xl transform rotate-3">
                          <img
                            src={data.letterImages[selectedLetter]}
                            alt="Letter photo"
                            className="w-full h-auto"
                          />
                          <div className="mt-2 text-center text-sm text-gray-500 italic">
                            {data.polaroidCaptions[selectedLetter] || "A memory for you"}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {!data.letterContents[selectedLetter]?.trim() && !data.letterImages[selectedLetter] && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center text-gray-500"
                      >
                        <p>This letter is empty.</p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function EnvelopeCard({
  title,
  letterNumber,
  hasImage,
}: {
  title: string;
  letterNumber: number;
  hasImage: boolean;
}) {
  return (
    <div className="w-36 h-52 md:w-44 md:h-60 flex flex-col items-center">
      <img
        src="/encelope.png"
        alt="Envelope"
        className="w-full h-44 md:h-52 object-contain"
      />
      <p className="text-sm font-bold text-gray-800 text-center -mt-0.5">
        {title}
      </p>
    </div>
  );
}
