'use client'
import Link from 'next/link'

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com', icon: 'github' },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  { name: 'Twitter', href: 'https://twitter.com', icon: 'twitter' }
]

const quickLinks = [
  { name: 'About Me', href: '#about-me' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
  { name: 'Resume', href: '/resume' }
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="z-50 bg-background/50 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Lillith Long</h3>
            <p className="text-sm text-foreground/70">
              Full-stack developer
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-foreground">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-colors duration-200"
                  aria-label={link.name}
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full border border-border hover:border-foreground/50 transition-colors">
                    <span className="text-xs">{link.name[0]}</span>
                  </div>
                </Link>
              ))}
            </div>
            <p className="text-sm text-foreground/70">
              <a href="mailto:lillith@example.com" className="hover:text-foreground transition-colors duration-200">
                lillith@example.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-sm text-foreground/60">
            © {currentYear} Lillith Long. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}