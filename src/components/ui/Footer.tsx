'use client'
import Link from 'next/link'

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/LilliDarling', icon: 'github' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/lillith-long/', icon: 'linkedin' },
  { name: 'X', href: 'https://x.com/LillithCodes', icon: 'x' }
]

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="z-50 bg-background/50 backdrop-blur-sm border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Lillith Long</h3>
            <p className="text-md">
              Full-stack Engineer
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200"
                  aria-label={link.name}
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full border transition-colors">
                    <span className="text-xs">{link.name[0]}</span>
                  </div>
                </Link>
              ))}
            </div>
            <p className="text-md">
              <a href="mailto:lillith@valkyrieremedy.com" className="transition-colors duration-200">
                lillith@valkyrieremedy.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-sm">
            © {currentYear} Lillith Long. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}