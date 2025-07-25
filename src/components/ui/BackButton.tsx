"use client";
import Link from 'next/link';

export default function BackButton() {
  return (
    <Link 
      href="/#projects"
      style={{
        color: 'rgba(147, 51, 234, 0.8)',
        textDecoration: 'none',
        fontSize: '1.3rem',
        marginBottom: '1rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 0',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#a855f7';
        e.currentTarget.style.transform = 'translateX(-5px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'rgba(147, 51, 234, 0.8)';
        e.currentTarget.style.transform = 'translateX(0)';
      }}
    >
      <span style={{ fontSize: '1.2rem' }}>←</span>
      <span>Back to Projects</span>
    </Link>
  );
}