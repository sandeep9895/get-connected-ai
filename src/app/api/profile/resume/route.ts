import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// POST handle resume submission (text, JSON or file eventually)
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== 'SEEKER') {
      return NextResponse.json({ message: "Only Seekers can upload a resume" }, { status: 403 });
    }

    const { resumeText, parsedSkills } = await req.json();

    // Optionally: Here we would trigger the AI ATS Parsing Engine
    // For now, we will save the raw data or mock score

    const profile = await prisma.seekerProfile.update({
      where: { userId: session.user.id },
      data: {
        // Here we could save resumeUrl if we uploaded a file to S3 first
        // We'll store parsedSkills in the DB directly
        parsedSkills: parsedSkills || null
      }
    });

    return NextResponse.json({ message: "Resume saved", profile });
  } catch (error) {
    console.error("Resume POST Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
