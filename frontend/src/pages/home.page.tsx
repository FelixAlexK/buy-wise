import Card from '../components/card.component'
import { useQuery, useMutation } from '@tanstack/react-query'
import { orpc } from '../utils/orpc'
import { authClient } from '../lib/auth-client'
import { useEffect } from 'react'

export default function Home() {

  const purchases = useQuery(orpc.purchase.getAll.queryOptions());
  console.log('purchases.data', purchases.data);

  const { data } = authClient.useSession();

  const purchaseDeleteMutation = useMutation(orpc.purchase.delete.mutationOptions({
    onSuccess: () => {
      purchases.refetch();
    }
  }));

  const handleDeletePurchase = (id: number) => {
    purchaseDeleteMutation.mutate({ id });
  }

  return (
    <div className="w-full max-w-md mx-auto grid gap-8 mt-18">
      <Card title="Money Saved" value="2323434€" />
     
      <Card title="Work Time Saved" value="1 Week, 4 days" />
      <ul className='space-y-4'>
        {purchases.data?.map(purchase => (
          <li className="border border-gray-300 p-4 rounded-md w-full " key={purchase.id}>
            <div className='flex justify-between items-center'>
              <time className='text-gray-500 text-sm' dateTime={purchase.createdAt?.toISOString()}>{new Date(purchase.createdAt ?? '-').toLocaleString()}</time>
              <span className="">Value:</span> {purchase.value}€ 
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
