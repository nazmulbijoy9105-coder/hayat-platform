'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Upload, FileText, Scale, BookOpen, Network, Search } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Upload Center', href: '/upload', icon: Upload },
  { name: 'Cases', href: '/documents', icon: FileText },
  { name: 'Statutes', href: '/statutes', icon: BookOpen },
  { name: 'Citation Graph', href: '/graph', icon: Network },
  { name: 'Semantic Search', href: '/search', icon: Search },
]

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-64 bg-hayat-panel border-r border-slate-700 flex flex-col">
      <div className="h-20 flex items-center justify-center border-b border-slate-700">
        <h1 className="text-3xl font-bold text-hayat-accent tracking-wider">HAYAT</h1>
      </div>
      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href)
          return (
            <Link key={item.name} href={item.href}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-hayat-accent text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-slate-700 text-xs text-slate-500">
        HAYAT OS v1.0.0
      </div>
    </aside>
  )
}
