# 🎯 Fact Rush (Online Quiz Application)

An interactive quiz application built with **Next.js**, **SQLite**, and **Framer Motion** for animations.  
This project demonstrates a **full-stack setup** where the frontend and backend live together inside a single Next.js app.  
All quiz questions are stored in a **lightweight SQLite database**, and the UI is enhanced with **smooth animations** for a modern experience.  

The idea behind this project is to create a **fun, educational platform** that can test knowledge across different subjects like Science, Technology, Math, History, and more.  
With **dynamic page transitions, responsive design, and a simple database structure**, this app is a great starting point for anyone learning how to combine **Next.js** with **databases** and **animations**.  

It’s designed to be:  
- **Fast** ⚡ – thanks to server-side rendering and SQLite’s speed.  
- **Lightweight** 🪶 – no heavy backend, just one small `.db` file.  
- **Scalable** 🚀 – you can easily add more categories, questions, or even turn it into a multiplayer quiz.  
- **Beautiful** 🎨 – Framer Motion makes interactions smooth and engaging.  

## 🚀 Quick Start

Follow these steps to set up the project on your local machine:

### 1️⃣ Create a new Next.js project
   ```bash
   npx create-next-app@latest
   ```
### 2️⃣ Add SQLite support
   ```bash
   npm install better-sqlite3
   ```
### 3️⃣ Add animations with Framer Motion
   ```bash
   npm install framer-motion
   ```
### 4️⃣ Seed the database with questions
   ```bash
   npx tsx scripts/seed.ts
   ```
### 5️⃣ Start the development server
  ```bash
  npm run dev
  ```