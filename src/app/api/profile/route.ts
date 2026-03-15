import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// GET current user profile
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role === 'SEEKER') {
      const profile = await prisma.seekerProfile.findUnique({
        where: { userId: session.user.id }
      });
      return NextResponse.json(profile);
    } else if (session.user.role === 'EMPLOYER') {
      const profile = await prisma.employerProfile.findUnique({
        where: { userId: session.user.id },
      });
      return NextResponse.json(profile);
    }

    return NextResponse.json({ message: "Invalid role" }, { status: 400 });
  } catch (error) {
    console.error("Profile GET Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// UPDATE current user profile
export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (session.user.role === 'SEEKER') {
      const profile = await prisma.seekerProfile.update({
        where: { userId: session.user.id },
        data: {
          name: body.name,
          headline: body.headline,
          bio: body.bio,
          location: body.location,
        }
      });
      return NextResponse.json(profile);
    } else if (session.user.role === 'EMPLOYER') {
      const profile = await prisma.employerProfile.update({
        where: { userId: session.user.id },
        data: {
          companyName: body.companyName,
          industry: body.industry,
          location: body.location,
          websiteUrl: body.websiteUrl,
        }
      });
      return NextResponse.json(profile);
    }

    return NextResponse.json({ message: "Invalid role" }, { status: 400 });
  } catch (error) {
    console.error("Profile PUT Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
