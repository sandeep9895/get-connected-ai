import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'EMPLOYER') {
      return NextResponse.json({ message: "Only Employers can post jobs." }, { status: 403 });
    }

    // Get this employer's profile
    const profile = await prisma.employerProfile.findUnique({
      where: { userId: session.user.id }
    });

    if (!profile) {
      return NextResponse.json({ message: "Employer profile not found." }, { status: 404 });
    }

    const body = await req.json();

    const job = await prisma.jobPosting.create({
      data: {
        employerId: profile.id,
        title: body.title,
        description: body.description,
        requiredSkills: body.requiredSkills ? JSON.stringify(body.requiredSkills) : null,
        location: body.location,
        isActive: body.isActive !== undefined ? body.isActive : true,
      }
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Job Creation Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const employerId = searchParams.get('employerId');

    const filter: any = { isActive: true };
    if (employerId) {
      filter.employerId = employerId;
    }

    const jobs = await prisma.jobPosting.findMany({
      where: filter,
      include: {
        employer: {
          select: { companyName: true, logoUrl: true, location: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Jobs Fetch Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
