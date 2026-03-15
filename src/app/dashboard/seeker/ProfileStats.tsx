"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import ResumeUploader from "@/components/ResumeUploader";

export default function ProfileStats({ initialScore, profileName, headline }: { initialScore: number, profileName: string, headline: string }) {
  const [score, setScore] = useState(initialScore);

  return (
    <section className="glass-panel" style={{ alignSelf: 'start' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--gradient-primary)', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700 }}>
          {profileName?.[0] || 'U'}
        </div>
        <h2>{profileName || "Job Seeker"}</h2>
        <p style={{ color: 'var(--text-secondary)' }}>{headline}</p>
      </div>

      <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>AI ATS Score</span>
          <span style={{ fontWeight: 600, color: score > 80 ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
            {score}/100
          </span>
        </div>
        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${score}%`, height: '100%', background: 'var(--gradient-glow)', transition: 'width 1s ease-in-out' }}></div>
        </div>
      </div>

      <ResumeUploader onScoreUpdated={setScore} />
    </section>
  );
}
