import { NextResponse } from "next/server";
import { runAgent } from "@/lib/agent";

export async function POST(req: Request) {
  const { question } = await req.json();
  if (!question) return NextResponse.json({ error: "No question provided" }, { status: 400 });

  try {
    const answer = await runAgent(question);
    return NextResponse.json({ answer });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to process" }, { status: 500 });
  }
}
