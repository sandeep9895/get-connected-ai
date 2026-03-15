"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Zap } from "lucide-react";

function RegisterForm() {
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") === "EMPLOYER" ? "EMPLOYER" : "SEEKER";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(defaultRole);
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role, name, companyName })
      });
      
      if (res.ok) {
        // Automatically route to login
        router.push("/login?registered=true");
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ width: '100%', maxWidth: '450px', margin: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
         <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem', fontFamily: 'Outfit' }}>
           <Zap size={24} color="var(--accent-primary)" />
           <span>GetConnected<span className="text-gradient">.ai</span></span>
         </Link>
         <h1 style={{ marginTop: '1rem', fontSize: '1.5rem' }}>Create an Account</h1>
      </div>

      {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button 
          type="button" 
          onClick={() => setRole("SEEKER")} 
          style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: role === "SEEKER" ? '1px solid var(--accent-primary)' : '1px solid var(--border-glass)', background: role === "SEEKER" ? 'rgba(59, 130, 246, 0.1)' : 'transparent', color: 'white', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          Job Seeker
        </button>
        <button 
          type="button" 
          onClick={() => setRole("EMPLOYER")} 
          style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: role === "EMPLOYER" ? '1px solid var(--accent-secondary)' : '1px solid var(--border-glass)', background: role === "EMPLOYER" ? 'rgba(139, 92, 246, 0.1)' : 'transparent', color: 'white', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          Employer
        </button>
      </div>

      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {role === "SEEKER" ? (
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Full Name</label>
            <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-glass)', color: 'white', outline: 'none' }} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        ) : (
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Company Name</label>
            <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-glass)', color: 'white', outline: 'none' }} value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>
        )}
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Email</label>
          <input type="email" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-glass)', color: 'white', outline: 'none' }} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Password</label>
          <input type="password" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-glass)', color: 'white', outline: 'none' }} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        
        <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        Already have an account? <Link href="/login" style={{ color: 'var(--accent-primary)' }}>Log in</Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="bg-glow"></div>
      <Suspense fallback={<div className="glass-panel" style={{ padding: '2rem' }}>Loading registration...</div>}>
         <RegisterForm />
      </Suspense>
    </main>
  );
}
