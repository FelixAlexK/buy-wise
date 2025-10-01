export default function Card({ title, value }: { title: string, value: string }) {
  return (
    <div className="border px-8 py-4 rounded-md shadow-md w-full">
      <h1 className="text-sm text-gray-500 font-semibold">{title}</h1>
      <p className="mt-4 font-bold text-4xl text-center">{value}</p>
    </div>
  )
}
