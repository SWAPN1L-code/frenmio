import { FC } from 'react'
import { Monitor } from 'lucide-react'

const links = [
  { text: 'Help', href: '#' },
  { text: 'About', href: '#' },
  {
    text: 'GitHub',
    href: 'https://github.com/swapnilnegi/mooz',
  },
]

const Header: FC = () => {
  return (
    <nav className="w-full px-16 py-10 flex justify-between items-center z-20">
      <div className="flex items-center space-x-4">
        <div className="w-11 h-11 bg-accent-brown dark:bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
          F
        </div>
        <span className="text-2xl font-bold tracking-tight text-accent-brown dark:text-white">
          Frenmio
        </span>
      </div>
      <div className="flex items-center space-x-12 text-sm font-semibold opacity-60">
        {links.map(link => (
          <a
            key={link.text}
            href={link.href}
            className="hover:text-primary transition-colors hover:opacity-100"
            target={link.text === 'GitHub' ? '_blank' : undefined}
            rel={link.text === 'GitHub' ? 'noreferrer' : undefined}
          >
            {link.text}
          </a>
        ))}
        {/* Dark Mode Toggle - Simplified placeholder logic for now */}
        <button className="p-2.5 rounded-full hover:bg-muted-beige dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-2xl">dark_mode</span>
        </button>
      </div>
    </nav>
  )
}

export default Header
