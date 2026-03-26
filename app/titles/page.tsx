"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLetters } from "@/context/LetterContext";

const PRESET_TITLES = [
  "When you miss me",
  "When you need encouragement",
  "On a bad day",
  "When you feel alone",
  "When you need a laugh",
  "On your birthday",
  "When you're stressed",
  "When you need motivation",
  "When you can't sleep",
  "When you need love",
  "On our anniversary",
  "When you're proud of yourself",
  "When you doubt yourself",
  "On a rainy day",
  "When you need strength",
  "When you need hope",
  "When you're homesick",
  "When you need courage",
  "On your graduation day",
  "When you need a smile",
];

export default function TitlesPage() {
  const router = useRouter();
  const { letterCount, titles, setTitles, updateTitle, clearAllTitles } =
    useLetters();
  const [mounted, setMounted] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [selectedLetterIndex, setSelectedLetterIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    setMounted(true);
    if (titles.length === 0) {
      setTitles(Array(letterCount).fill(""));
    }
  }, [letterCount, titles.length, setTitles]);

  if (!mounted) return null;

  const handleSelectPreset = (title: string) => {
    if (selectedLetterIndex !== null) {
      updateTitle(selectedLetterIndex, title);
      setSelectedLetterIndex(null);
    }
  };

  const handleCustomSubmit = () => {
    if (customInput.trim() && selectedLetterIndex !== null) {
      updateTitle(selectedLetterIndex, customInput.trim());
      setCustomInput("");
      setShowCustomInput(false);
      setSelectedLetterIndex(null);
    }
  };

  const handleClearAll = () => {
    clearAllTitles();
    setSelectedLetterIndex(null);
  };

  const handleRandomSelect = () => {
    const shuffled = [...PRESET_TITLES].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, letterCount);
    setTitles(selected);
  };

  const filledCount = titles.filter((t) => t && t.trim() !== "").length;
  const allFilled = filledCount === letterCount;

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/create")}
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

            <div className="flex items-center gap-3">
              <button
                onClick={handleRandomSelect}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-primary-50"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Select Random
              </button>

              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear All
              </button>
            </div>
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Choose &ldquo;Read When&rdquo; Titles
            </h1>
            <p className="text-xl text-gray-600">
              Pick or create titles for each letter ({filledCount}/{letterCount})
            </p>

            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(filledCount / letterCount) * 100}%` }}
                className="bg-gradient-to-r from-primary-400 to-secondary-400 h-2 rounded-full"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {Array.from({ length: letterCount }).map((_, index) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedLetterIndex === index
                        ? "border-primary-500 bg-primary-50"
                        : titles[index] && titles[index].trim() !== ""
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 bg-white hover:border-primary-300"
                    }`}
                    onClick={() => setSelectedLetterIndex(index)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-8 h-8 flex items-center justify-center ${
                          titles[index] && titles[index].trim() !== ""
                            ? "text-green-400"
                            : "text-pink-300"
                        }`}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-500">
                        Letter {index + 1}
                      </span>
                    </div>
                    <p className="text-gray-800 font-medium min-h-[24px]">
                      {titles[index] || "Tap to add title"}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {selectedLetterIndex !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg md:relative md:shadow-none md:border md:rounded-2xl md:p-6"
              >
                <div className="max-w-4xl mx-auto space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">
                      Choose title for Letter {selectedLetterIndex + 1}
                    </h3>
                    <button
                      onClick={() => {
                        setSelectedLetterIndex(null);
                        setShowCustomInput(false);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {!showCustomInput ? (
                    <>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                        {PRESET_TITLES.map((title) => {
                          const isUsed = titles.includes(title);
                          return (
                            <button
                              key={title}
                              onClick={() => handleSelectPreset(title)}
                              disabled={isUsed}
                              className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
                                isUsed
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-gray-50 hover:bg-primary-100 text-gray-700 hover:text-primary-700"
                              }`}
                            >
                              {title}
                              {isUsed && (
                                <span className="ml-1 text-xs">(used)</span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => setShowCustomInput(true)}
                        className="w-full py-3 border-2 border-dashed border-primary-300 rounded-xl text-primary-500 hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
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
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Create Custom Title
                      </button>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        placeholder="Enter your custom title..."
                        className="w-full px-4 py-3 border-2 border-primary-300 rounded-xl focus:border-primary-500 focus:outline-none text-gray-800"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleCustomSubmit();
                          if (e.key === "Escape") setShowCustomInput(false);
                        }}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowCustomInput(false)}
                          className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleCustomSubmit}
                          disabled={!customInput.trim()}
                          className="flex-1 py-2 rounded-xl bg-gradient-to-r from-primary-400 to-secondary-400 text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Add Title
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {allFilled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center pt-8"
            >
              <motion.button
                onClick={() => router.push("/write")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-400 to-secondary-400 text-white text-lg font-semibold px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Continue
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
