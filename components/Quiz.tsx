"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Question {
  id: number;
  text: string;
  options: string[];
  correct_index: number;
}

interface QuizProps {
  category: string;
}

const Quiz: React.FC<QuizProps> = ({ category }) => {
  // Client-only rendering
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Setup State
  const [setupDone, setSetupDone] = useState(false);
  const totalQuestions = 10; // Fixed to 10
  const [timeLimit, setTimeLimit] = useState(5); // minutes

  // Quiz State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  // Fetch questions after setup
  useEffect(() => {
    if (!setupDone) return;

    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/questions?category=${category}`);
        if (!res.ok) throw new Error("Failed to fetch questions");
        const data: Question[] = await res.json();
        const limitedQuestions = data.slice(0, totalQuestions);
        setQuestions(limitedQuestions);
        setAnswers(Array(limitedQuestions.length).fill(null));
        setTimeLeft(timeLimit * 60);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuestions();
  }, [setupDone, category, timeLimit]);

  // Timer
  useEffect(() => {
    if (submitted || questions.length === 0) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted, questions.length]);

  // Handlers
  const handleSelect = (index: number) => {
    const updated = [...answers];
    updated[current] = index;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (current + 1 < questions.length) setCurrent(current + 1);
  };

  const handlePrevious = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleSubmit = () => {
    let total = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct_index) total++;
    });
    setScore(total);
    setSubmitted(true);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Client-only check
  if (!mounted) return null;

  // Setup Screen
  if (!setupDone) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-pink-900 p-6">
        <div className="max-w-md w-full bg-black/40 backdrop-blur-lg p-10 rounded-3xl shadow-2xl text-white text-center border border-white/20">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400 animate-pulse">
            🚀 Quiz Setup
          </h1>

          {/* Fixed Number of Questions */}
          <div className="mb-6 text-left">
            <label className="block mb-2 text-lg font-semibold">Number of Questions:</label>
            <input
              type="number"
              value={totalQuestions}
              disabled
              className="w-full p-3 rounded-xl text-white font-bold text-lg border-2 border-gradient-to-r from-green-400 to-blue-500 bg-black/20 cursor-not-allowed"
            />
          </div>

          {/* Time Limit */}
          <div className="mb-8 text-left">
            <label className="block mb-2 text-lg font-semibold">Time Limit (minutes):</label>
            <input
              type="number"
              min={1}
              max={60}
              defaultValue={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
              className="w-full p-3 rounded-xl text-white font-bold text-lg border-2 border-gradient-to-r from-purple-400 to-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-400 transition-transform hover:scale-105 bg-black/20"
            />
          </div>

          {/* Start Button */}
          <button
            onClick={() => setSetupDone(true)}
            className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xl font-bold rounded-2xl hover:scale-105 hover:brightness-110 transition transform shadow-lg"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Loading questions after setup
  if (setupDone && questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading questions...
      </div>
    );
  }

  // Submitted Screen
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-pink-900 p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-lg w-full bg-black/30 backdrop-blur-md p-8 rounded-3xl shadow-2xl text-center border border-white/20"
        >
          <h2 className="text-4xl font-extrabold mb-4 animate-bounce">
            🎉 Quiz Submitted! 🎉
          </h2>

          <p className="text-2xl mb-6 font-semibold">
            Your Score:{" "}
            <span className="text-green-400">
              {score} / {questions.length} (
              {((score / questions.length) * 100).toFixed(2)}%)
            </span>
          </p>

          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl font-bold hover:scale-105 hover:brightness-110 transition transform"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  //Quiz Screen
  const selected = answers[current];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-pink-900 p-6">
      <div className="max-w-2xl w-full bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 p-8 rounded-3xl shadow-2xl text-white">

        {/* Timer with pill background */}
        <div className="text-right font-semibold mb-4 text-lg">
          <span className="bg-white/20 px-4 py-1 rounded-full font-mono">
             {formatTime(timeLeft)}
          </span>
        </div>

        {/* Question */}
        {questions[current] && (
          <h2 className="text-2xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white">
            Q{current + 1}. {questions[current].text}
          </h2>
        )}

        {/* Options */}
        {questions[current] && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {questions[current].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`p-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg transform hover:scale-105 ${
                  selected === idx
                    ? "bg-green-500 text-white"
                    : "bg-white/20 hover:bg-white/40 text-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={current === 0}
            className="px-6 py-3 bg-gray-400 rounded-xl text-white font-semibold disabled:opacity-50 hover:bg-gray-500 transition"
          >
            Previous
          </button>

          {current + 1 === questions.length ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-purple-600 rounded-xl text-white font-semibold hover:bg-purple-700 transition"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-700 transition"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
