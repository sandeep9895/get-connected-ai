import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, User, Briefcase, Zap, Compass } from "lucide-react";

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
        <section className="glass-panel" style={{ alignSelf: 'start' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--gradient-primary)', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700 }}>
              {profile?.name?.[0] || 'U'}
            </div>
            <h2>{profile?.name || "Job Seeker"}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>{profile?.headline || "Add your headline..."}</p>
          </div>

          <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>AI ATS Score</span>
              <span style={{ fontWeight: 600, color: atsScore > 80 ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                {atsScore}/100
              </span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${atsScore}%`, height: '100%', background: 'var(--gradient-glow)' }}></div>
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: '100%' }}>
            <Zap size={16} /> Optimize Resume with AI
          </button>
        </section>

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
