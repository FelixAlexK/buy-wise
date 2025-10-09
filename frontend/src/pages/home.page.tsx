import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { authClient } from '../lib/auth-client'
import { orpc } from '../utils/orpc'

export default function Home() {
  const { data } = authClient.useSession()
  const purchases = useQuery(orpc.purchase.getAll.queryOptions({ input: { userId: data?.user.id ?? '' }, enabled: !!data?.user?.id }))
  const stats = useQuery(orpc.stat.getById.queryOptions({ input: { userId: data?.user.id ?? '' }, enabled: !!data?.user?.id }))

  const purchaseDeleteMutation = useMutation(orpc.purchase.delete.mutationOptions({
    onSuccess: () => {
      purchases.refetch()
    },
  }))

  const handleDeletePurchase = (id: number) => {
    purchaseDeleteMutation.mutate({ id })
  }

  return (
    <div className="w-full max-w-sm mx-auto grid gap-8 mt-18">

      <Card>
        <CardHeader>
          <CardTitle>Money Saved</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.isLoading
            ? <Skeleton className="h-12 rounded-xl" />

            : (
                <span className="text-4xl font-bold">
                  {`${stats.data?.moneySaved ?? '--'} €`}
                </span>
              )}

        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Work Time Saved</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.isLoading
            ? <Skeleton className="h-12 rounded-xl" />

            : (
                <span className="text-4xl font-bold">

                  {`${stats.data?.workTimeSaved ?? '--'} hours`}
                </span>
              )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Last Purchases (
            {purchases.data?.length ?? 0}
            )
          </CardTitle>
          <CardDescription>Most recent purchases are shown first</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-full max-h-80">
            <div>
              {purchases.isLoading
                ? <Skeleton className="h-80 rounded-xl" />
                : purchases.data?.map(purchase => (
                    <React.Fragment key={purchase.id}>
                      <Item variant="outline" className="mb-4">
                        <ItemContent>
                          <ItemTitle>
                            {purchase.value}
                            €
                          </ItemTitle>
                          <ItemDescription>{new Date(purchase.createdAt!).toLocaleString()}</ItemDescription>
                        </ItemContent>
                        <ItemActions>
                          <Button variant="destructive" onClick={() => handleDeletePurchase(purchase.id)}>Delete</Button>
                        </ItemActions>

                      </Item>
                    </React.Fragment>

                  ))}
            </div>

          </ScrollArea>
        </CardContent>
      </Card>

    </div>
  )
}
