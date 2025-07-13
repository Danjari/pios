import { NextResponse } from "next/server";
import { callAgent } from "@/lib/agent";

export async function POST(req: Request) {
  const { question } = await req.json();
  if (!question) {
    return NextResponse.json({ error: "No question provided" }, { status: 400 });
  }

  try {
    const answer = await callAgent(question, "default-thread");
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json({ error: "Agent failed" }, { status: 500 });
  }
}
