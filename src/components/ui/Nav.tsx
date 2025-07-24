'use client'
import Link from 'next/link'

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' }
]

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-indigo-800/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl hover:text-indigo-600 duration-300">
            Lillith Long
          </Link>
          
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