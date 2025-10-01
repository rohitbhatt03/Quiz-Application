import { NextResponse } from "next/server";
import db from "@/lib/db";

// Define row type
interface QuestionRow {
  id: number;
  category: string;
  text: string;
  options: string; 
  correct_index: number;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  if (!category) {
    return NextResponse.json({ error: "Category required" }, { status: 400 });
  }

  try {
    const stmt = db.prepare("SELECT * FROM questions WHERE category = ?");
    const rows = stmt.all(category) as QuestionRow[];

    const questions = rows.map((row) => {
      let options: string[] = [];
      try {
        options = JSON.parse(row.options);
      } catch (err) {
        console.error("Failed to parse options for question id:", row.id, err);
        options = [];
      }
      return {
        id: row.id,
        text: row.text,
        options,
        correct_index: row.correct_index,
      };
    });

    return NextResponse.json(questions);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
