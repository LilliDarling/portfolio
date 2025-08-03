'use client'
import Link from 'next/link'
import { useLoading } from '@/contexts/LoadingContext'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navItems = [
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Contact', href: '/#contact' }
]

export default function Nav() {
  const { startNavigation } = useLoading();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavigation = (href: string) => {
    if (href.startsWith('/#')) {
      setIsMenuOpen(false);
      return;
    }
    
    if (pathname === href) {
      setIsMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    startNavigation();
    router.push(href);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="fixed top-4 left-4 right-4 lg:left-[70px] lg:right-[70px] z-50 bg-neutral-950/30 backdrop-blur-md border border-indigo-800/50 rounded-3xl lg:rounded-[4rem] shadow-lg hover:shadow-xl hover:bg-indigo-950/30 hover:border-indigo-600/60 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-12 lg:h-12">
            <button 
              onClick={() => handleNavigation('/')}
              className="text-xl sm:text-2xl hover:text-indigo-600 duration-300"
            >
              Lillith Long
            </button>

            <ul className="hidden md:flex items-center gap-4 lg:gap-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-base lg:text-lg hover:text-indigo-600 duration-300 focus:text-indigo-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              onClick={toggleMenu}
              className="hamburger md:hidden"
              aria-label="Toggle menu"
            >
              <span className={isMenuOpen ? 'active' : ''}></span>
              <span className={isMenuOpen ? 'active' : ''}></span>
              <span className={isMenuOpen ? 'active' : ''}></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''} md:hidden`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl hover:text-indigo-600 duration-300 focus:text-indigo-400"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}