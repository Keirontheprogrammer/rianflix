export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center px-4 py-12">
      <a href="/" className="mb-8 text-3xl font-bold tracking-tight">
        <span className="text-brand-orange">Rian</span>
        <span className="text-brand-yellow">Flix</span>
      </a>
      {children}
    </div>
  )
}