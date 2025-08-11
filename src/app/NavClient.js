'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function NavClient() {
  const pathname = usePathname()
  
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' }
  ]

  return (
    <div className="hidden md:flex space-x-6">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
            pathname === link.href
              ? 'bg-blue-500 text-white'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}