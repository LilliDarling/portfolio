"use client";

export default function About() {
  return (
    <div 
      id="about"
      style={{ 
      minHeight: '100vh', 
      position: 'relative', 
      zIndex: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: '4rem 2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', color: 'white' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>About Me</h2>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
          About section
        </p>
      </div>
    </div>
  )
}