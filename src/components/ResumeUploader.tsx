"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileText, CheckCircle, Loader2 } from "lucide-react";

export default function ResumeUploader({ onScoreUpdated }: { onScoreUpdated: (score: number) => void }) {
  const [isParsing, setIsParsing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }

    try {
      setError(null);
      setSuccess(false);
      setFileName(file.name);
      
      // 1. Send PDF to Server API for local parsing
      setIsParsing(true);
      const formData = new FormData();
      formData.append("file", file);

      const parseRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!parseRes.ok) throw new Error("Could not parse PDF text");
      const { text } = await parseRes.json();
      setIsParsing(false);

      if (!text || text.trim().length < 50) {
         setError("Could not extract enough text from this PDF. Is it an image-based PDF?");
         return;
      }

      // 2. Send text to OpenAI to analyze
      setIsAnalyzing(true);
      const analyzeRes = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Compare to a generic tech role for the baseline score
        body: JSON.stringify({ 
           resumeText: text, 
           jobDescription: "Software Engineer with experience in modern web technologies, React, Node.js, and strong problem-solving skills." 
        })
      });

      if (!analyzeRes.ok) throw new Error("Analysis failed");
      const analysisData = await analyzeRes.json();
      
      const newScore = analysisData.score || 0;

      // 3. Save to Database
      const updateRes = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, atsScore: newScore })
      });

      if (!updateRes.ok) throw new Error("Failed to save profile");

      setSuccess(true);
      onScoreUpdated(newScore);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during upload.");
    } finally {
      setIsParsing(false);
      setIsAnalyzing(false);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <input 
        type="file" 
        accept=".pdf" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        style={{ display: 'none' }} 
      />
      
      {!isParsing && !isAnalyzing && !success && (
        <button 
          onClick={() => fileInputRef.current?.click()} 
          className="btn btn-primary" 
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          <UploadCloud size={16} /> Upload Real Resume
        </button>
      )}

      {isParsing && (
        <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
          <Loader2 size={16} className="spin" /> Reading PDF on Server...
        </div>
      )}

      {isAnalyzing && (
        <div style={{ padding: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#60a5fa' }}>
          <Loader2 size={16} className="spin" /> AI Analyzing Resume...
        </div>
      )}

      {success && (
        <div style={{ padding: '0.75rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#4ade80' }}>
          <CheckCircle size={16} /> Analyzed {fileName}!
        </div>
      )}

      {error && (
        <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>{error}</p>
      )}
    </div>
  );
}
