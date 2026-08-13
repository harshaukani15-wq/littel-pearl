import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden w-full">
        {/* Desktop header */}
        <header className="hidden md:flex h-16 border-b border-outline-variant/30 bg-surface/50 backdrop-blur-md items-center px-8 shrink-0">
          <h2 className="font-display text-lg text-on-surface">Admin Portal</h2>
        </header>
        {/* Content area - add top padding on mobile for fixed header */}
        <div className="flex-1 overflow-auto p-4 pt-[72px] md:pt-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
