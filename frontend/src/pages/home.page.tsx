import Card from '../components/card.component'

export default function Home() {
  return (
    <div className="w-full max-w-md mx-auto grid gap-8 mt-18">

      <Card title="Money Saved" value="2323434€" />
      <Card title="Work Time Saved" value="1 Week, 4 days" />
    </div>
  )
}
