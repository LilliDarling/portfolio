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
      className="min-h-screen relative z-20 bg-black/80 py-14 px-4 sm:px-6 lg:px-8 flex items-center"
    >
      <div className="max-w-2xl mx-auto w-full">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-6 lg:mb-8 bg-gradient-to-br from-white to-purple-500 bg-clip-text text-transparent tracking-tight text-center">
          Contact
        </h2>

        <p className="text-lg sm:text-xl mb-8 lg:mb-12 text-center text-slate-500">
          Have a project in mind or just want to chat? I&apos;d love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
            className="w-full p-4 bg-transparent border-0 border-b border-white/20 text-white text-base transition-colors duration-300 outline-none focus:border-indigo-300 placeholder:text-slate-500"
          />
          
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            className="w-full p-4 bg-transparent border-0 border-b border-white/20 text-white text-base transition-colors duration-300 outline-none focus:border-indigo-300 placeholder:text-slate-500"
          />
          
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Message"
            rows={3}
            required
            className="w-full p-4 bg-transparent border-0 border-b border-white/20 text-white text-base transition-colors duration-300 outline-none focus:border-indigo-300 resize-none font-inherit placeholder:text-slate-500"
          />
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              mt-4 px-6 py-3 sm:px-8 sm:py-4
              bg-transparent 
              border border-purple-500/50 
              rounded 
              text-white text-base 
              transition-all duration-300 
              hover:border-indigo-300 hover:bg-indigo-300/10
              disabled:opacity-60 disabled:cursor-not-allowed
              ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </form>

        {submitStatus === 'success' && (
          <p className="mt-4 text-center text-green-500 text-base">
            Message sent successfully! I&apos;ll get back to you soon.
          </p>
        )}

        {submitStatus === 'error' && (
          <p className="mt-4 text-center text-red-500 text-base">
            Failed to send message. Please try again or email me directly.
          </p>
        )}

        <div className="mt-12 lg:mt-16 flex flex-wrap justify-center gap-6 sm:gap-8">
          <a
            href="https://x.com/LillithCodes"
            className="text-white/60 no-underline text-base sm:text-lg transition-colors duration-300 hover:text-indigo-400"
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com/in/lillith-long/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 no-underline text-base sm:text-lg transition-colors duration-300 hover:text-indigo-400"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/LilliDarling"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 no-underline text-base sm:text-lg transition-colors duration-300 hover:text-indigo-400"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}