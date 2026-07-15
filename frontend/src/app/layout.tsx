import './globals.css'
import Sidebar from '@/components/layout/Sidebar'

export const metadata = {
  title: 'HAYAT | Bangladesh Legal Intelligence',
  description: 'Hierarchical AI Taxonomy for Bangladesh Law',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-hayat-bg">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8 bg-hayat-bg">
          {children}
        </main>
      </body>
    </html>
  )
}
