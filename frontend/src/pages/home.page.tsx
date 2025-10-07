import { useMutation, useQuery } from '@tanstack/react-query'
import Card from '../components/card.component'
import { authClient } from '../lib/auth-client'
import { orpc } from '../utils/orpc'

export default function Home() {
  const { data } = authClient.useSession()
  const purchases = useQuery(orpc.purchase.getAll.queryOptions({ enabled: !!data?.user?.id }))
  const stats = useQuery(orpc.stat.getById.queryOptions({ input: { userId: data?.user.id! }, enabled: !!data?.user?.id }))

  const purchaseDeleteMutation = useMutation(orpc.purchase.delete.mutationOptions({
    onSuccess: () => {
      purchases.refetch()
    },
  }))

  const handleDeletePurchase = (id: number) => {
    purchaseDeleteMutation.mutate({ id })
  }

  return (
    <div className="w-full max-w-md mx-auto grid gap-8 mt-18">
      <Card title="Money Saved" value={`${stats.data?.moneySaved ?? '--'} €`} />

      <Card title="Work Time Saved" value={`${stats.data?.workTimeSaved ?? '--'} hours`} />
      <ul className="space-y-4">
        {purchases.data?.map(purchase => (
          <li className="border border-gray-300 p-4 rounded-md w-full " key={purchase.id}>
            <div className="flex justify-between items-center">
              <time className="text-gray-500 text-sm" dateTime={purchase.createdAt?.toISOString()}>{new Date(purchase.createdAt ?? '-').toLocaleString()}</time>
              <span className="">Value:</span>
              {' '}
              {purchase.value}
              €
              {data?.user && (
                <button onClick={() => handleDeletePurchase(purchase.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-4">Delete</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
