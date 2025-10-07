export default function Card({ title, value, children }: { title?: string, value?: string, children?: React.ReactNode }) {
  return (
    <div className="border px-8 py-4 rounded-md shadow-md max-w-md w-full">
      {title && <h1 className="text-sm text-gray-500 font-semibold">{title}</h1>}
      {value && <p className="mt-4 font-bold text-4xl text-center">{value}</p>}
      {children}
    </div>
  )
}
