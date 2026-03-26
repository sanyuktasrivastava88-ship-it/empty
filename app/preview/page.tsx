"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLetters } from "@/context/LetterContext";

export default function PreviewPage() {
  const router = useRouter();
  const { letterCount, titles, letterContents, letterImages, polaroidCaptions, mailboxText, setMailboxText } = useLetters();
  const [mounted, setMounted] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleEnvelopeClick = (index: number) => {
    setSelectedLetter(index);
  };

  const handleClose = () => {
    setSelectedLetter(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4 md:p-8 pb-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/write")}
              className="flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="font-medium">Back to Letters</span>
            </button>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Your Letters
            </h1>

            <div className="w-32"></div>
          </div>
        </motion.div>

        {selectedLetter === null ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {Array.from({ length: letterCount }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  onClick={() => handleEnvelopeClick(index)}
                  className="relative cursor-pointer"
                >
                  <EnvelopeCard
                    title={titles[index] || "Untitled"}
                    letterNumber={index + 1}
                    hasImage={!!letterImages[index]}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-5xl"
            >
              <button
                onClick={handleClose}
                className="mb-6 flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium">Back to all letters</span>
              </button>

              <div className="flex items-center justify-center gap-4 md:gap-8">
                {letterContents[selectedLetter]?.trim() && (
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                    className={letterImages[selectedLetter] ? "flex-1 max-w-md" : "w-full max-w-2xl"}
                  >
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{selectedLetter + 1}</span>
                        </div>
                        <span className="text-gray-500 text-sm">Letter {selectedLetter + 1}</span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                        {titles[selectedLetter]}
                      </h2>
                      <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {letterContents[selectedLetter]}
                      </div>
                    </div>
                  </motion.div>
                )}

                {letterImages[selectedLetter] && (
                  <motion.div
                    initial={{ x: letterContents[selectedLetter]?.trim() ? 100 : 0, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: letterContents[selectedLetter]?.trim() ? 0.3 : 0.2, type: "spring", stiffness: 150 }}
                    className={letterContents[selectedLetter]?.trim() ? "flex-1 max-w-xs" : "w-full max-w-sm"}
                  >
                    <div className="bg-white p-3 rounded-lg shadow-xl transform rotate-3">
                      <img
                        src={letterImages[selectedLetter]}
                        alt="Letter photo"
                        className="w-full h-auto"
                      />
                      <div className="mt-2 text-center text-sm text-gray-500 italic">
                        {polaroidCaptions[selectedLetter] || "A memory for you"}
                      </div>
                    </div>
                  </motion.div>
                )}

                {!letterContents[selectedLetter]?.trim() && !letterImages[selectedLetter] && (
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
      </div>

      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => router.push("/complete")}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-primary-400 to-secondary-400 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
      >
        Continue
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs"
      >
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mailbox text:
        </label>
        <input
          type="text"
          value={mailboxText}
          onChange={(e) => setMailboxText(e.target.value)}
          placeholder="You have mail!"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
        />
      </motion.div>
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
