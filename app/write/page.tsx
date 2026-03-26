"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLetters } from "@/context/LetterContext";

const WRITING_SUGGESTIONS: Record<string, string[]> = {
  "When you miss me": [
    "Remember the time we stayed up all night talking about everything and nothing? The way you laughed at my terrible jokes, how the conversation flowed so effortlessly, and how I wished that night would never end.\n\nI miss those moments, but I know we'll create even more beautiful memories together soon.",
    "One of my favorite memories with you is when we spent that entire afternoon doing absolutely nothing but being together. No agenda, no rush, just us.\n\nThose simple moments are the ones I treasure most, and I can't wait for the next one.",
    "Even when we're miles apart, I carry a piece of you in my heart. You're with me in my thoughts every single day.\n\nThis letter is my way of being close to you until we can be together again.",
  ],
  "When you need encouragement": [
    "Believe in yourself as much as I believe in you. I have seen you overcome so many challenges, and each time you came out stronger.\n\nYou have an incredible strength within you that I know will carry you through whatever you're facing right now. Trust yourself!",
    "Remember all those times people told you that you couldn't do something? Look at you now, proving them wrong every single time.\n\nYou're stronger and more capable than you know. Keep going, because I believe in you completely.",
    "Whatever challenge you're facing right now, I want you to know that it's okay to feel overwhelmed. But please remember that every storm passes.\n\nTake it one step at a time, and know that I'm cheering for you from wherever I am.",
  ],
  "On a bad day": [
    "Hey, it's okay to have bad days. They're a part of life, and they make the good days so much sweeter when they come.\n\nBe gentle with yourself today. Take things slow, breathe deeply, and know that tomorrow is a fresh start.",
    "If you're having a rough day, just know that I understand, and it's completely valid to feel the way you do.\n\nYou don't have to pretend to be okay all the time. Let yourself feel, rest, and heal. I'm proud of you.",
    "Today's struggles are tomorrow's strength. You're going through something hard right now, but I know you'll come out the other side.\n\nHere's a virtual hug and all my love to get you through this moment.",
  ],
  "When you feel alone": [
    "Even when you can't see me, please know that I'm right here with you, cheering you on every step of the way.\n\nYou are never truly alone. I'm just a thought away, and this letter is proof of that.",
    "Close your eyes and imagine my arms wrapped around you in the warmest hug. I'm sending you all my love right now.\n\nYou are so loved, and even when you can't feel it, I'm always here thinking of you.",
    "Sometimes life gets quiet and we feel isolated, but that feeling is temporary. This moment will pass, and brighter days are coming.\n\nUntil then, hold onto this letter as a reminder that someone out there cares deeply about you.",
  ],
  "When you need a laugh": [
    "You know what's hilarious? Thinking about that time you tried to be cool and it completely backfired. You know exactly which moment I'm talking about!\n\nI still laugh about it to this day. Thanks for always being so wonderfully awkward and human.",
    "Here's a funny memory to cheer you up: Remember when we were doing something completely normal and suddenly we both burst out laughing for no reason?\n\nThose random moments of joy are the best. I hope this brings a smile to your face!",
    "You have the most amazing laugh I've ever heard. It's contagious and always brightens my day.\n\nI hope this letter brings even a fraction of that happiness back to you. You deserve to smile today!",
  ],
  "On your birthday": [
    "Happy Birthday to the most extraordinary person! Today the world celebrates the day you came into it, and honestly, the world became so much better.\n\nI hope this year brings you endless joy, countless adventures, and all the love your heart can hold.",
    "Another year of you being in this world means another year of me being grateful that I get to know you.\n\nThank you for being you. Thank you for every smile, every laugh, every moment. Here's to celebrating you today!",
    "Make a wish! Close your eyes, think of something you really want, and believe with all your heart that it will come true.\n\nI hope all your dreams unfold this year. You deserve every beautiful thing coming your way.",
  ],
  "When you're stressed": [
    "Take a deep breath. Just one. Inhale... and exhale. Feel that? That's your body reminding you to slow down.\n\nThe world won't end if you take a break. In fact, you'll come back stronger and clearer after some rest.",
    "I know things feel overwhelming right now, but let's break it down together. What if you just focus on the very next small step?\n\nOne thing at a time. You've handled hard things before, and you'll handle this too. I'm rooting for you.",
    "Here's your permission slip: You are allowed to rest. You are allowed to say no. You are allowed to put yourself first.\n\nDon't forget to breathe. Don't forget to be kind to yourself. You've got this.",
  ],
  "When you need motivation": [
    "You have everything it takes to accomplish your dreams. I have seen your dedication, your passion, and your incredible work ethic.\n\nThe only limit is the one you set for yourself. Dream big, work hard, and watch yourself soar!",
    "Remember when that goal seemed impossible and you thought you could never achieve it? Look at you now, proving everyone wrong.\n\nYou're capable of amazing things. The only thing standing between you and success is consistency. Keep going!",
    "Every expert was once a beginner. Every master was once a mess. Don't compare your chapter one to someone else's chapter twenty.\n\nYour journey is unique, and as long as you keep moving forward, you're winning. Never give up!",
  ],
  "When you can't sleep": [
    "I know nights can feel long and lonely, especially when your mind won't quiet down. But morning will come, and with it, a new day full of possibilities.\n\nClose your eyes and think of peaceful things. Waves on a beach, leaves rustling in the wind, my voice saying 'everything will be okay.'",
    "Sometimes our minds race at night with worries, plans, and thoughts that won't stop. It's exhausting, I know.\n\nBut right now, in this moment, everything is okay. You're safe, you're loved, and tomorrow will take care of itself.",
    "If you can't sleep, don't force it. Get up, do something gentle, and come back to bed when you feel ready.\n\nI hope these words bring you some comfort. You're not alone in this sleepless night. I'm right here with you.",
  ],
  "When you need love": [
    "You are loved beyond measure. Please never forget that. My love for you is like the sun - constant, warm, and always there.\n\nEven on your worst days, when you feel unlovable, remember that someone somewhere thinks you're absolutely wonderful.",
    "If I could wrap you in the warmest, coziest hug right now, I would. Consider this letter my virtual embrace.\n\nYou deserve all the love in the world, and I hope you never settle for anything less. You are worthy of everything good.",
    "Love isn't just about the big gestures - it's in the small moments, the daily thoughts, and the quiet wishes.\n\nHere's my quiet wish for you tonight: May you feel loved, valued, and cherished exactly as you are.",
  ],
  "On our anniversary": [
    "Another year together, and I still can't imagine my life without you in it. You've become such an essential part of who I am.\n\nThank you for every laugh, every tear, every adventure, and every ordinary moment we've shared together.",
    "Looking back at our journey, I'm overwhelmed with gratitude. We've grown together, learned together, and loved together.\n\nHere's to many more years of creating beautiful memories. You're my favorite person to do life with.",
    "Celebrating us today feels like celebrating the best decision I ever made. Choosing you was easy. Loving you was natural.\n\nHappy Anniversary to the love of my life. Here's to us, today and always.",
  ],
  "When you're proud of yourself": [
    "I KNEW you could do it! From the moment you set your mind to this goal, I knew you'd achieve it.\n\nYour hard work has truly paid off, and I hope you're taking time to celebrate this incredible accomplishment. You deserve all the credit!",
    "Celebrate this moment! Seriously, stop and recognize what you just did. Not everyone could have done what you did.\n\nI'm bursting with pride. You worked so hard for this, and now you're here. Enjoy every bit of this success.",
    "Do you remember when this seemed so far away? Look at you now, having actually done it. That's incredible!\n\nBe proud of yourself today. This achievement is a testament to your dedication, and I couldn't be more impressed.",
  ],
  "When you doubt yourself": [
    "You are capable of amazing things that you can't even imagine right now. Don't let doubt stand in your way.\n\nI see your potential even when you can't see it yourself. You're so much more than you think you are.",
    "Doubt is just fear wearing a disguise, trying to make you second-guess yourself. But here's the thing - you've got backup.\n\nI'm in your corner, believing in you when you can't believe in yourself. You've got this!",
    "When your inner critic gets loud, remember all the evidence of how amazing you are. Think of every time you succeeded.\n\nYou're stronger than your doubts, braver than your fears, and more capable than you realize. Trust me.",
  ],
  "On a rainy day": [
    "Rainy days are perfect for cozy thoughts, warm drinks, and quiet reflection. Stay dry, stay warm, and think of me.\n\nThere's something magical about the rain - it washes everything away and gives us a chance to start fresh.",
    "Even on the grayest days, there's beauty to be found. The sound of rain on the roof, the smell of wet earth, the feeling of being indoors and safe.\n\nEmbrace this cozy moment. Sometimes doing nothing is exactly what we need.",
    "On days like today, when the sky is gray and the world feels a little heavy, know that better days are coming.\n\nAfter every rain comes a rainbow. Hold on, stay warm, and let the storm pass. I'll be here when it's over.",
  ],
  "When you need strength": [
    "You are stronger than you think. I have seen you face incredibly hard things, and every single time, you came out brave.\n\nWhen you feel weak, remember those moments. You can draw strength from knowing who you really are.",
    "Here's a truth I want you to remember: tough times don't last, but tough people do. And you, my friend, are incredibly tough.\n\nI'm sending you all my strength right now. You are never alone in this battle.",
    "If you're feeling depleted, it's okay to rest and recharge. Taking care of yourself isn't weakness - it's wisdom.\n\nBut when you're ready to keep going, know that I believe in your ability to overcome anything.",
  ],
  "When you need hope": [
    "After every storm comes a rainbow. The dark clouds you're seeing now are temporary, and brighter days are absolutely on their way.\n\nHold on to hope. It's the little light that keeps us going when everything feels impossible.",
    "Hope is a powerful thing. It keeps us moving forward even when we can't see the path ahead.\n\nI hope this letter serves as a reminder that good things are coming. The universe has so much more in store for you.",
    "Even in the darkest moments, there's always a spark of light waiting for you. Sometimes you just have to look a little harder to find it.\n\nI'm holding onto hope for you right now. Let my hope carry you through until you can find your own again.",
  ],
  "When you're homesick": [
    "Home isn't always a place - it's also a feeling. It's the feeling of being loved, safe, and exactly where you belong.\n\nYou carry that feeling with you everywhere you go. Home is in your heart, and it travels with you.",
    "Missing home means you have a beautiful place and wonderful memories to look back on. That's truly a gift.\n\nSomeday soon, you'll be back where your heart feels most at peace. Until then, carry those warm memories with you.",
    "I know being away from home can feel lonely sometimes. But distance is temporary, and reunions are sweet.\n\nThis letter is a little piece of home that you can open anytime you need to feel connected.",
  ],
  "When you need courage": [
    "Be brave. I know you're scared, but courage isn't the absence of fear - it's doing what matters despite it.\n\nOne small step in the right direction can change everything. Take that step, and know that I'm cheering for you.",
    "I've seen your brave heart in action, and it's truly remarkable. You have an inner strength that inspires me.\n\nWhen you need courage, just remember all the brave things you've already done. You've got this.",
    "Courage doesn't mean you're not afraid. It means you move forward even when your knees are shaking.\n\nI'm so proud of you for being willing to try, to risk, to step into the unknown. That's true bravery.",
  ],
  "On your graduation day": [
    "Congratulations on this incredible achievement! This milestone is a testament to all your hard work, dedication, and perseverance.\n\nYou did it! The countless hours of studying, the sacrifices, the late nights - it all paid off. You should be so proud.",
    "The world is now your canvas, and I can't wait to see all the beautiful things you'll create.\n\nGo out there and show the world what you're capable of. The best chapters of your life are just beginning.",
    "I'm overflowing with pride. Everything you've worked for has led to this moment, and you absolutely deserve to celebrate.\n\nHere's to your bright future and all the amazing adventures ahead. Congratulations, graduate!",
  ],
  "When you need a smile": [
    "Did you know that just thinking about you makes me smile right now? You're one of my absolute favorite people.\n\nI hope this letter brings even a fraction of the joy you bring to my life. You make the world a better place.",
    "Here's a little reminder: You're pretty wonderful, you know that? Not just ordinary - truly, genuinely wonderful.\n\nWhen life gets you down, remember all the people whose lives you've touched. You matter more than you realize.",
    "I believe in the power of small joys. A warm cup of tea, a funny memory, a moment of peace - these things matter.\n\nI hope this letter brings you a smile today. You deserve all the happiness in the world.",
  ],
};

export default function WritePage() {
  const router = useRouter();
  const { letterCount, titles, letterContents, updateLetterContent, letterImages, updateLetterImage, removeLetterImage, polaroidCaptions, updatePolaroidCaption } = useLetters();
  const [mounted, setMounted] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        updateLetterImage(index, e.target!.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!mounted) return null;

  const getSuggestions = (title: string): string[] => {
    return WRITING_SUGGESTIONS[title] || [
      "Start with what's in your heart right now...",
      "Remember the moments that matter most.",
      "Write what you wish you could say out loud.",
    ];
  };

  const handleSelectLetter = (index: number) => {
    setSelectedLetter(index);
    setShowSuggestions(false);
  };

  const handleContentChange = (content: string) => {
    if (selectedLetter !== null) {
      updateLetterContent(selectedLetter, content);
    }
  };

  const handleBack = () => {
    if (selectedLetter !== null) {
      setSelectedLetter(null);
    } else {
      router.push("/titles");
    }
  };

  const filledCount = Object.keys(letterContents).filter(
    (k) => letterContents[parseInt(k)]?.trim()
  ).length;

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
              onClick={handleBack}
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
              <span className="font-medium">
                {selectedLetter !== null ? "Back to Letters" : "Back to Titles"}
              </span>
            </button>

            <span className="text-sm text-gray-500">
              {filledCount} of {letterCount} written
            </span>
          </div>

          {selectedLetter === null ? (
            <>
              <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                  Write Your Letters
                </h1>
                <p className="text-xl text-gray-600">
                  Click on a letter to start writing
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: letterCount }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelectLetter(index)}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                      letterContents[index]?.trim()
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 bg-white hover:border-primary-300"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Letter {index + 1}</p>
                        <p className="font-semibold text-gray-800">
                          {titles[index] || "Untitled"}
                        </p>
                      </div>
                      <div className="ml-auto">
                        {letterContents[index]?.trim() && (
                          <svg
                            className="w-6 h-6 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    {letterContents[index]?.trim() && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {letterContents[index]}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              key={selectedLetter}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                  <svg
                    className="w-5 h-5 text-pink-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span className="text-gray-600">Letter {selectedLetter + 1}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {titles[selectedLetter]}
                </h2>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <textarea
                  value={letterContents[selectedLetter] || ""}
                  onChange={(e) => handleContentChange(e.target.value)}
                  placeholder="Start writing your letter here..."
                  className="w-full h-80 resize-none border-0 focus:outline-none text-gray-700 text-lg leading-relaxed"
                />
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                    Add a Photo
                  </h3>
                  {letterImages[selectedLetter] && (
                    <button
                      onClick={() => removeLetterImage(selectedLetter)}
                      className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  )}
                </div>
                
                {letterImages[selectedLetter] ? (
                  <div className="space-y-3">
                    <img
                      src={letterImages[selectedLetter]}
                      alt="Letter photo"
                      className="w-full max-w-xs mx-auto rounded-lg shadow-md"
                    />
                    <input
                      type="text"
                      value={polaroidCaptions[selectedLetter] || ""}
                      onChange={(e) => updatePolaroidCaption(selectedLetter, e.target.value)}
                      placeholder="Caption for this photo (optional)"
                      className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:border-amber-400 focus:outline-none text-gray-700 text-center italic"
                    />
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-amber-300 rounded-xl cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-colors">
                    <svg className="w-10 h-10 text-amber-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-amber-600 text-sm">Click to upload a photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(selectedLetter, file);
                      }}
                    />
                  </label>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className="flex-1 py-3 px-6 rounded-xl border-2 border-primary-200 text-primary-600 hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
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
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  {showSuggestions ? "Hide Suggestions" : "Show Suggestions"}
                </button>

                <button
                  onClick={() => setSelectedLetter(null)}
                  className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-primary-400 to-secondary-400 text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save & Close
                </button>
              </div>

              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 overflow-hidden"
                  >
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      Writing Suggestions
                    </h3>
                    <div className="grid gap-3">
                      {getSuggestions(titles[selectedLetter]).map((suggestion, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          onClick={() => {
                            const current = letterContents[selectedLetter] || "";
                            const newContent = current
                              ? `${current}\n\n${suggestion}`
                              : suggestion;
                            handleContentChange(newContent);
                          }}
                          className="p-5 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl cursor-pointer hover:from-yellow-100 hover:to-amber-100 transition-all border border-yellow-200 hover:border-yellow-300 hover:shadow-md"
                        >
                          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{suggestion}</p>
                          <div className="flex items-center gap-1 mt-4 text-yellow-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span className="text-sm font-medium">Click to add</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {selectedLetter === null && letterCount > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="fixed bottom-8 right-8"
            >
              <motion.button
                onClick={() => router.push("/preview")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-400 to-secondary-400 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center gap-2"
              >
                Continue
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
