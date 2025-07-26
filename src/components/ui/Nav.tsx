'use client'
import Link from 'next/link'
import { useLoading } from '@/contexts/LoadingContext'
import { useRouter } from 'next/navigation'

const navItems = [
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Contact', href: '/#contact' }
]

export default function Nav() {
  const { startNavigation } = useLoading();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    if (href.startsWith('/#')) {
      return;
    }
    
    startNavigation();
    router.push(href);
  };

  return (
    <nav className="fixed top-4 left-70 right-70 z-50 bg-neutral-950/30 backdrop-blur-md border border-indigo-800/50 rounded-4xl shadow-lg hover:shadow-xl hover:bg-indigo-950/30 hover:border-indigo-600/60 transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-12">
          <button 
            onClick={() => handleNavigation('/')}
            className="text-2xl hover:text-indigo-600 duration-300"
          >
            Lillith Long
          </button>
          
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  className="text-lg hover:text-indigo-600 duration-300 focus:text-indigo-400"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}