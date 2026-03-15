import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Building, Users, Search, PlusCircle } from "lucide-react";

export default async function EmployerDashboard() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'EMPLOYER') {
    redirect("/login");
  }

  const profile = await prisma.employerProfile.findUnique({
    where: { userId: session.user.id }
  });

  return (
    <main style={{ minHeight: '100vh', padding: '2rem' }}>
      <div className="bg-glow top-right"></div>
      
      <nav style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4rem' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
          <ArrowLeft size={20} /> Back to Home
        </Link>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Building size={20} />
          <span>{profile?.companyName || "Employer"}</span>
        </div>
      </nav>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
        
        {/* Company Panel */}
        <section className="glass-panel" style={{ alignSelf: 'start' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
              <Building size={32} />
            </div>
            <h2>{profile?.companyName || "Your Company"}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>{profile?.industry || "Add industry..."}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Active Roles</span>
              <span style={{ fontWeight: 600 }}>3</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total Candidates</span>
              <span style={{ fontWeight: 600 }}>24</span>
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: '100%' }}>
            <PlusCircle size={16} /> Post New Job
          </button>
        </section>

        {/* Talent Pipeline Panel */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Talent Pipeline</h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-glass)', borderRadius: '99px', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Search size={16} color="var(--text-secondary)" />
                <input type="text" placeholder="Search skills..." style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '0.875rem' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Example Candidate Card */}
            <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--gradient-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  JS
                </div>
                <div>
                  <h3 style={{ marginBottom: '0.25rem' }}>John Smith <span style={{ fontSize: '0.75rem', background: 'rgba(59, 130, 246, 0.2)', color: 'var(--accent-primary)', padding: '0.1rem 0.5rem', borderRadius: '1rem', marginLeft: '0.5rem' }}>Top 5%</span></h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Senior React Developer</p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.5rem', borderRadius: '4px' }}>React</span>
                    <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.5rem', borderRadius: '4px' }}>TypeScript</span>
                    <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.5rem', borderRadius: '4px' }}>Node.js</span>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-primary)' }}>94%</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Skill Match</div>
                <button className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', marginTop: '0.5rem' }}>View Profile</button>
              </div>
            </div>

            <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  AW
                </div>
                <div>
                  <h3 style={{ marginBottom: '0.25rem' }}>Alice Wong <span style={{ fontSize: '0.75rem', background: 'rgba(139, 92, 246, 0.2)', color: 'var(--accent-secondary)', padding: '0.1rem 0.5rem', borderRadius: '1rem', marginLeft: '0.5rem' }}>Top 10%</span></h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Frontend Specialist</p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.5rem', borderRadius: '4px' }}>Vue.js</span>
                    <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.5rem', borderRadius: '4px' }}>React</span>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>88%</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Skill Match</div>
                <button className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', marginTop: '0.5rem' }}>View Profile</button>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
