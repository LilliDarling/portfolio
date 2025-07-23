"use client";
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      emailjs.init(process.env.NEXT_PUBLIC_PUBLIC_KEY!);

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'lillith@valkyrieremedy.com'
        }
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Email error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div 
      id="contact"
      style={{ 
        minHeight: '100vh', 
        position: 'relative', 
        zIndex: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '4rem 2rem',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        width: '100%'
      }}>
        <h2 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '1rem',
          textAlign: 'center',
          fontWeight: '400'
        }}>
          Contact
        </h2>

        <p style={{
          fontSize: '1.2rem',
          marginBottom: '3rem',
          textAlign: 'center',
          color: '#64748b'
        }}>
          Have a project in mind or just want to chat? I'd love to hear from you.
        </p>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderBottomColor = '#a5b4fc';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)';
            }}
          />
          
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderBottomColor = '#a5b4fc';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)';
            }}
          />
          
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Message"
            rows={3}
            required
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease',
              outline: 'none',
              resize: 'none',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderBottomColor = '#a5b4fc';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)';
            }}
          />
          
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '1rem 2rem',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              color: 'white',
              fontSize: '1rem',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              marginTop: '1rem',
              opacity: isSubmitting ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.borderColor = '#a5b4fc';
                e.currentTarget.style.backgroundColor = 'rgba(165, 180, 252, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </form>

        {submitStatus === 'success' && (
          <p style={{
            marginTop: '1rem',
            textAlign: 'center',
            color: '#10b981',
            fontSize: '1rem'
          }}>
            Message sent successfully! I'll get back to you soon.
          </p>
        )}

        {submitStatus === 'error' && (
          <p style={{
            marginTop: '1rem',
            textAlign: 'center',
            color: '#ef4444',
            fontSize: '1rem'
          }}>
            Failed to send message. Please try again or email me directly.
          </p>
        )}

        <div style={{
          marginTop: '4rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem'
        }}>
          <a
            href="https://x.com/LillithCodes"
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
              fontSize: '1.1rem',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#818cf8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
            }}
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com/in/lillith-long/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
              fontSize: '1.1rem',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#818cf8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
            }}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/LilliDarling"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
              fontSize: '1.1rem',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#818cf8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}