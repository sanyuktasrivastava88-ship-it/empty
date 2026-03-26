"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLetters } from "@/context/LetterContext";

export default function CompletePage() {
  const router = useRouter();
  const { letterCount, titles, letterContents, letterImages, polaroidCaptions, mailboxText } = useLetters();
  const [mounted, setMounted] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4 md:p-8 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8 max-w-2xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Your Box of Love Letters
        </h1>
        <p className="text-xl text-gray-600">
          {`${letterCount} ${letterCount === 1 ? "letter" : "letters"} prepared with care, ready to be opened "when the moment is right"`}
        </p>

        <div className="relative w-64 h-64 mx-auto mt-12">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <img
              src="/gift.png"
              alt="Gift Box"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>

        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Your Letters:</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {titles.map((title, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full text-sm text-gray-700"
                  >
                    {title}
                  </span>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/")}
              className="bg-gradient-to-r from-primary-400 to-secondary-400 text-white text-lg font-semibold px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              Start Over
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const shareData = {
                  titles,
                  letterCount,
                  letterContents,
                  letterImages,
                  polaroidCaptions,
                  mailboxText
                };
                const jsonStr = JSON.stringify(shareData);
                const encoded = btoa(unescape(encodeURIComponent(jsonStr)));
                const shareUrl = `${window.location.origin}/share?d=${encodeURIComponent(encoded)}`;
                navigator.clipboard.writeText(shareUrl).then(() => {
                  alert("Link copied! Share it with someone special.");
                }).catch(() => {
                  prompt("Copy this link:", shareUrl);
                });
              }}
              className="bg-gradient-to-r from-green-400 to-teal-400 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              Share Link
            </motion.button>

            <p className="text-gray-500 text-sm">
              Your letters are ready to be packaged and sent!
            </p>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
