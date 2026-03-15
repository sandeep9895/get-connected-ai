import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: jobId } = await params;
    const job = await prisma.jobPosting.findUnique({
      where: { id: jobId },
      include: {
        employer: {
          select: { companyName: true, logoUrl: true, location: true, industry: true, websiteUrl: true }
        }
      }
    });

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("Job Fetch Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'EMPLOYER') {
      return NextResponse.json({ message: "Only Employers can update jobs." }, { status: 403 });
    }

    const { id: jobId } = await params;
    const body = await req.json();

    // Verify ownership
    const job = await prisma.jobPosting.findUnique({
      where: { id: jobId },
      include: { employer: true }
    });

    if (!job || job.employer.userId !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized or Job not found" }, { status: 404 });
    }

    const updatedJob = await prisma.jobPosting.update({
      where: { id: jobId },
      data: {
        title: body.title !== undefined ? body.title : job.title,
        description: body.description !== undefined ? body.description : job.description,
        requiredSkills: body.requiredSkills ? JSON.stringify(body.requiredSkills) : job.requiredSkills,
        location: body.location !== undefined ? body.location : job.location,
        isActive: body.isActive !== undefined ? body.isActive : job.isActive,
      }
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Job Update Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'EMPLOYER') {
      return NextResponse.json({ message: "Only Employers can delete jobs." }, { status: 403 });
    }

    const { id: jobId } = await params;

    // Verify ownership
    const job = await prisma.jobPosting.findUnique({
      where: { id: jobId },
      include: { employer: true }
    });

    if (!job || job.employer.userId !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized or Job not found" }, { status: 404 });
    }

    await prisma.jobPosting.delete({
      where: { id: jobId }
    });

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Job Delete Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
