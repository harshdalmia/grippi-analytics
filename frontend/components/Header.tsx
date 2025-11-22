export default function Header({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-6 pt-4">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-3 tracking-tight drop-shadow-lg leading-tight">{title}</h1>
      {subtitle && <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">{subtitle}</p>}
    </div>
  )
}
