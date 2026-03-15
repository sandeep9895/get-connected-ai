import Link from "next/link";
import { ArrowRight, BrainCircuit, Network, Briefcase, Zap } from "lucide-react";

export default function Home() {
  return (
    <main>
      <div className="bg-glow top-right"></div>
      <div className="bg-glow bottom-left"></div>

      {/* Navigation */}
      <nav className="container" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.5rem', fontFamily: 'Outfit' }}>
          <Zap size={28} color="var(--accent-primary)" />
          <span>GetConnected<span className="text-gradient">.ai</span></span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/login" className="btn btn-outline">Log In</Link>
          <Link href="/register" className="btn btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container" style={{ textAlign: 'center', paddingTop: '6rem', paddingBottom: '4rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '0.5rem 1rem', borderRadius: '2rem', marginBottom: '2rem', color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 600 }}>
          <Zap size={16} /> Bridging the gap between talent and opportunity
        </div>
        
        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
          Make professional growth <br />
          <span className="text-gradient animate-glow" style={{ display: 'inline-block' }}>smarter</span> and hiring <span className="text-gradient" style={{ display: 'inline-block' }}>more human</span>.
        </h1>
        
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          The operating system for career and business networking. Replacing fragmented tools with one unified, AI-driven platform.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/register?role=SEEKER" className="btn btn-primary animate-float" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            I am a Job Seeker
          </Link>
          <Link href="/register?role=EMPLOYER" className="btn btn-outline animate-float" style={{ padding: '1rem 2rem', fontSize: '1.125rem', animationDelay: '0.2s' }}>
            I am Hiring
          </Link>
        </div>
      </section>

      {/* The 3 Pillars Section */}
      <section className="container" style={{ padding: '6rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Three Pillars</h2>
          <p style={{ color: 'var(--text-secondary)' }}>A dual-sided ecosystem powered by proprietary AI.</p>
        </div>

        <div className="pillar-grid">
          
          {/* Pillar 1 */}
          <div className="glass-panel">
            <div style={{ background: 'rgba(139, 92, 246, 0.1)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <BrainCircuit size={24} color="var(--accent-secondary)" />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AI-Powered Resume Optimization</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Escape the ATS black hole. Receive real-time scoring and actionable improvement tips to perfectly align your profile with specific job descriptions.
            </p>
            <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={14} color="var(--accent-secondary)"/> Real-Time ATS Scoring</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={14} color="var(--accent-secondary)"/> Actionable Recommendations</li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="glass-panel">
            <div style={{ background: 'rgba(236, 72, 153, 0.1)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Network size={24} color="var(--accent-tertiary)" />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Intelligent Networking Engine</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Stop guessing who to contact. Our AI identifies ideal connections based on your career goals and generates personalized outreach templates automatically.
            </p>
            <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={14} color="var(--accent-tertiary)"/> Smart Match algorithm</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={14} color="var(--accent-tertiary)"/> Direct Access to Founders</li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="glass-panel">
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Briefcase size={24} color="var(--accent-primary)" />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Employer Talent Pipeline</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Reduce time-to-hire by 50%+. Identify passive candidates matching exact skill criteria without posting generic job boards.
            </p>
            <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={14} color="var(--accent-primary)"/> Skills-Based Matching</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={14} color="var(--accent-primary)"/> Automated Screening</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-glass)', padding: '2rem 0', marginTop: '4rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          <p>© 2026 GetConnected AI. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
