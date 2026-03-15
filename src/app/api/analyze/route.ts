import { NextResponse } from "next/server";
import { auth } from "@/auth";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'SEEKER') {
      return NextResponse.json({ message: "Only Seekers can analyze resumes." }, { status: 403 });
    }

    const { resumeText, jobDescription } = await req.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json({ message: "both resumeText and jobDescription are required" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-api-key-here') {
      // Mock response for when API key is missing
      return NextResponse.json({
         score: 75,
         feedback: [
           "Add more quantitative metrics to your experience.",
           "Highlight specific tools mentioned in the job description like React and Node.js.",
           "Your summary could be punchier."
         ],
         missingSkills: ["React", "GraphQL"]
      });
    }

    const prompt = `
      You are an expert ATS (Applicant Tracking System) and technical recruiter.
      Analyze the following resume against the provided job description.
      
      Resume:
      ${resumeText}
      
      Job Description:
      ${jobDescription}
      
      Respond STRICTLY with a JSON object in the following format:
      {
        "score": (a number between 0 and 100 representing the match),
        "feedback": (an array of 3 actionable improvement tips string),
        "missingSkills": (an array of strings representing key skills missing from the resume)
      }
    `;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "dummy-key",
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    const result = JSON.parse(content || "{}");

    return NextResponse.json(result);
  } catch (error) {
    console.error("Analyze Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
