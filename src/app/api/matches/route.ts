import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// Mock AI Algorithm logic
function calculateMatchScore(seekerSkillsJson: string | null, jobSkillsJson: string | null) {
  if (!seekerSkillsJson || !jobSkillsJson) return 50; // default middle score
  
  try {
    const seekerSkills: string[] = JSON.parse(seekerSkillsJson).map((s: string) => s.toLowerCase());
    const jobSkills: string[] = JSON.parse(jobSkillsJson).map((s: string) => s.toLowerCase());
    
    if (jobSkills.length === 0) return 100;
    
    const overlap = seekerSkills.filter(skill => jobSkills.includes(skill)).length;
    let score = Math.round((overlap / jobSkills.length) * 100);
    
    // Add some random variation to simulate AI nuanced scoring (+/- 10 points)
    score += Math.floor(Math.random() * 20) - 10;
    return Math.max(0, Math.min(100, score)); // clamp 0-100
  } catch(e) {
    return 60; // fallback if JSON parsing fails
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('jobId'); // Only employers would pass this

    // If SEEKER requests matches
    if (session.user.role === 'SEEKER') {
      const seekerProfile = await prisma.seekerProfile.findUnique({
        where: { userId: session.user.id }
      });
      if (!seekerProfile) return NextResponse.json([], { status: 404 });
      
      const allJobs = await prisma.jobPosting.findMany({
        where: { isActive: true },
        include: { employer: { select: { companyName: true, logoUrl: true } } }
      });
      
      const matches = allJobs.map((job: any) => {
        return {
          job,
          matchScore: calculateMatchScore(seekerProfile.parsedSkills, job.requiredSkills)
        };
      }).sort((a: any, b: any) => b.matchScore - a.matchScore)
        .filter((m: any) => m.matchScore >= 40); // Only return good matches
      
      return NextResponse.json(matches);
    } 

    // If EMPLOYER requests matches for a specific job
    if (session.user.role === 'EMPLOYER' && jobId) {
      const job = await prisma.jobPosting.findUnique({
        where: { id: jobId },
        include: { employer: true }
      });
      
      if (!job || job.employer.userId !== session.user.id) {
        return NextResponse.json({ message: "Job not found or unauthorized" }, { status: 404 });
      }
      
      const allSeekers = await prisma.seekerProfile.findMany();
      
      const matches = allSeekers.map((seeker: any) => {
        return {
          seeker: {
             id: seeker.id,
             name: seeker.name,
             headline: seeker.headline,
             location: seeker.location,
          },
          matchScore: calculateMatchScore(seeker.parsedSkills, job.requiredSkills)
        };
      }).sort((a: any, b: any) => b.matchScore - a.matchScore)
        .filter((m: any) => m.matchScore >= 50); // High threshold for employers
      
      return NextResponse.json(matches);
    }
    
    return NextResponse.json({ message: "Invalid request parameters" }, { status: 400 });

  } catch (error) {
    console.error("Matches Fetch Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
