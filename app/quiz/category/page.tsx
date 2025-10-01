"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Question {
  id: number;
  text: string;
  options: string[];
  correct_index: number;
}

export default function QuizPage() {
  const params = useParams();
  const categoryParam = params.category;

  // Ensure category is a string
  const category =
    typeof categoryParam === "string"
      ? categoryParam
      : Array.isArray(categoryParam)
      ? categoryParam[0] // pick the first element if array
      : "general"; // fallback

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/questions?category=${category}`);
        if (!res.ok) throw new Error("Failed to fetch questions");
        const data: Question[] = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestions();
  }, [category]);

  const handleAnswer = (index: number) => {
    setSelected(index);
    if (index === questions[current].correct_index) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  if (questions.length === 0) {
    return <div className="p-10 text-center text-xl">Loading quiz...</div>;
  }

  if (finished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-purple-900 text-white">
        <h2 className="text-4xl font-bold">Quiz Finished 🎉</h2>
        <p className="mt-4 text-2xl">
          Your Score: {score} / {questions.length}
        </p>
        <Button className="mt-6" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-black/30 backdrop-blur-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">
          {category.toUpperCase()} Quiz
        </h2>

        <p className="text-lg font-semibold mb-4">
          Q{current + 1}. {questions[current].text}
        </p>

        <div className="space-y-3">
          {questions[current].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selected !== null}
              className={`w-full p-3 rounded-xl text-left border 
                ${
                  selected === index
                    ? index === questions[current].correct_index
                      ? "bg-green-600 border-green-400"
                      : "bg-red-600 border-red-400"
                    : "bg-white/10 hover:bg-white/20"
                }`}
            >
              {option}
            </button>
          ))}
        </div>

        {selected !== null && (
          <Button className="mt-6 w-full" onClick={handleNext}>
            {current + 1 < questions.length ? "Next" : "Finish"}
          </Button>
        )}
      </div>
    </div>
  );
}
