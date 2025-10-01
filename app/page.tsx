"use client"
import React from "react";
import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Science",
    desc: "Explore the wonders of science.",
    color: "bg-gradient-to-r from-cyan-400 to-blue-500",
    img: "https://img.freepik.com/free-vector/science-lab-objects_23-2148488312.jpg?semt=ais_incoming&amp;w=740&amp;q=80",
    href: "/quiz/science",
  },
  {
    title: "Technology",
    desc: "Dive into the latest tech.",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    img: "https://img.lovepik.com/free-png/20211111/lovepik-grey-technology-circle-png-image_400863698_wh1200.png",
    href: "/quiz/technology",
  },
  {
    title: "Mathematics",
    desc: "Master numbers & patterns.",
    color: "bg-gradient-to-r from-indigo-400 to-blue-600",
    img: "https://www.usnews.com/dims4/USNEWS/3919351/2147483647/thumbnail/970x647/quality/85/?url=https%3A%2F%2Fwww.usnews.com%2Fcmsmedia%2F16%2F8a%2F7f6cb88e4a4bae4b0dd576654aa1%2Fcomplexmathequation.jpg",
    href: "/quiz/mathematics",
  },
  {
    title: "Computer_Science",
    desc: "Understand algorithms & logic.",
    color: "bg-gradient-to-r from-green-400 to-emerald-500",
    img: "https://img.freepik.com/free-vector/creative-abstract-quantum-illustration_23-2149236239.jpg?semt=ais_hybrid&amp;w=740&amp;q=80",
    href: "/quiz/computer_science",
  },
  {
    title: "Geography",
    desc: "Explore our planet’s features.",
    color: "bg-gradient-to-r from-teal-400 to-cyan-500", 
    img: "https://ischoolconnect.com/blog/wp-content/uploads/2022/10/geography-1.jpg",
    href: "/quiz/geography",
  },
  {
    title: "Physics",
    desc: "Unravel the laws of the universe.",
    color: "bg-gradient-to-r from-red-400 to-pink-600", 
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkY8eJYCqDEfh9mDFN2csEca5ec13LG-AmPw&amp;s",
    href: "/quiz/physics",
  },
  {
    title: "History",
    desc: "Discover events that shaped us.",
    color: "bg-gradient-to-r from-yellow-400 to-amber-500",
    img: "https://pursuit.unimelb.edu.au/__data/assets/image/0022/93118/What-history-can-really-teach-us_137d0917-b311-4ca2-b117-b8750370eab0.jpg",
    href: "/quiz/history",
  },
];

export default function QuizCatalog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white">
      {/* Header */}
      <header className="w-full bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-2xl font-extrabold tracking-wide">Fact Rush</h1>
          <nav className="flex items-center gap-6">
            <button className="flex items-center gap-2 hover:text-yellow-300 transition">
              <Home size={18} /> Home
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center py-16 px-4">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-pink-400 via-yellow-400 to-cyan-400 bg-clip-text text-transparent">
          Test Your Knowledge
        </h2>
        <p className="mt-4 text-lg text-gray-200">
          Choose a category and challenge yourself with fun quizzes 🎉
        </p>
      </section>

      {/* Categories */}
      <section className="max-w-5xl mx-auto space-y-6 px-4 pb-16">
        {categories.map((cat) => (
          <Link key={cat.title} href={cat.href}>
            <div
              className={`flex items-center gap-6 p-6 rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition ${cat.color}`}
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="h-20 w-20 rounded-full bg-white/20 p-3 drop-shadow-lg"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold">{cat.title}</h3>
                <p className="text-white/90">{cat.desc}</p>
              </div>
              <ArrowRight size={28} className="text-white/80" />
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}