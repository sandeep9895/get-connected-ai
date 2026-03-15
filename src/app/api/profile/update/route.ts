import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'SEEKER') {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { text, atsScore } = await req.json();

    if (!text || typeof atsScore !== 'number') {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const updatedProfile = await prisma.seekerProfile.update({
      where: { userId: session.user.id },
      data: {
        resumeText: text,
        atsScore: atsScore
      }
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
