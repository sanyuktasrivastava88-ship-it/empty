"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLetters } from "@/context/LetterContext";

export default function CreatePage() {
  const router = useRouter();
  const { letterCount, setLetterCount, titles } = useLetters();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const increment = () => {
    if (letterCount < 20) setLetterCount(letterCount + 1);
  };

  const decrement = () => {
    if (letterCount > 1) setLetterCount(letterCount - 1);
  };

  const handleNext = () => {
    router.push("/titles");
  };

  const chosenCount = titles.filter((t) => t && t.trim() !== "").length;

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-12"
        >
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center text-gray-500 hover:text-primary-500 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
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
              Back to Home
            </Link>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-gray-800"
            >
              How many letters do you want to create?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-600"
            >
              Each letter will be sealed with a special &ldquo;read when&rdquo; moment
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center space-y-8"
          >
            <div className="flex items-center gap-6">
              <motion.button
                onClick={decrement}
                disabled={letterCount === 1}
                whileHover={letterCount > 1 ? { scale: 1.1 } : {}}
                whileTap={letterCount > 1 ? { scale: 0.9 } : {}}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold transition-all ${
                  letterCount === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-br from-primary-400 to-primary-500 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                -
              </motion.button>

              <motion.div
                key={letterCount}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-32 h-20 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl flex items-center justify-center shadow-md"
              >
                <span className="text-4xl font-bold text-secondary-700">
                  {letterCount}
                </span>
              </motion.div>

              <motion.button
                onClick={increment}
                disabled={letterCount === 20}
                whileHover={letterCount < 20 ? { scale: 1.1 } : {}}
                whileTap={letterCount < 20 ? { scale: 0.9 } : {}}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold transition-all ${
                  letterCount === 20
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-br from-secondary-400 to-secondary-500 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                +
              </motion.button>
            </div>

            <div className="text-sm text-gray-500">
              {letterCount === 1 ? "1 letter" : `${letterCount} letters`} will be
              created
              {chosenCount > 0 && (
                <span className="ml-2 text-primary-500">
                  ({chosenCount} titled)
                </span>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12"
          >
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto p-6 bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm">
              <AnimatePresence mode="popLayout">
                {Array.from({ length: letterCount }).map((_, index) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, scale: 0, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0, rotate: 10 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="relative w-20 h-14 cursor-pointer"
                  >
                    <EnvelopeIcon
                      index={index}
                      hasTitle={!!(titles[index] && titles[index].trim() !== "")}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pt-8 flex flex-col items-center gap-4"
          >
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-400 to-secondary-400 text-white text-lg font-semibold px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              Choose Your Titles
            </motion.button>
            {chosenCount > 0 && (
              <p className="text-sm text-gray-500">
                You have {chosenCount} of {letterCount} titles set
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

function EnvelopeIcon({
  index,
  hasTitle,
}: {
  index: number;
  hasTitle?: boolean;
}) {
  const colors = [
    "from-pink-200 to-pink-300",
    "from-purple-200 to-purple-300",
    "from-rose-200 to-rose-300",
    "from-violet-200 to-violet-300",
    "from-fuchsia-200 to-fuchsia-300",
  ];

  const colorClass = colors[index % colors.length];

  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${colorClass} rounded-lg shadow-md flex items-center justify-center relative overflow-hidden`}
    >
      {hasTitle && (
        <div className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full z-20" />
      )}
      <div className="absolute inset-0 bg-white/30" />
      <svg
        className="w-10 h-8 text-white/80 relative z-10"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
      <div className="absolute bottom-1 right-1 text-xs text-white/60 font-medium">
        #{index + 1}
      </div>
    </div>
  );
}
