import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, User, Briefcase, Zap, Compass } from "lucide-react";
import ProfileStats from "./ProfileStats";

export default async function SeekerDashboard() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'SEEKER') {
    redirect("/login");
  }

  const profile = await prisma.seekerProfile.findUnique({
    where: { userId: session.user.id }
  });

  // Mock ATS Score for the UI visual
  const atsScore = profile?.atsScore || 84; 

  return (
    <main style={{ minHeight: '100vh', padding: '2rem' }}>
      <div className="bg-glow top-right"></div>
      
      <nav style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4rem' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
          <ArrowLeft size={20} /> Back to Home
        </Link>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <User size={20} />
          <span>{profile?.name || session.user.email}</span>
        </div>
      </nav>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
        
        {/* Profile Stats Panel */}
        <ProfileStats 
          initialScore={atsScore} 
          profileName={profile?.name || session.user.email!} 
          headline={profile?.headline || "Add your headline..."} 
        />

        {/* Matches / Feed Panel */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Smart Opportunities</h2>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}><Compass size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}/> Exploring 12 Matches</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Example match card */}
            <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '50px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Briefcase size={24} color="var(--accent-primary)" />
                </div>
                <div>
                  <h3 style={{ marginBottom: '0.25rem' }}>Senior Frontend Engineer</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>TechNexus Solutions • Remote</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-primary)' }}>92%</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Match Score</div>
              </div>
            </div>

            <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '50px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Briefcase size={24} color="var(--accent-secondary)" />
                </div>
                <div>
                  <h3 style={{ marginBottom: '0.25rem' }}>React Developer</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Global Innovations • New York</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>87%</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Match Score</div>
              </div>
            </div>
            
          </div>
        </section>

      </div>
    </main>
  );
}
