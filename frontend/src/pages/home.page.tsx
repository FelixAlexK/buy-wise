import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { calculateStatData, convertHoursToReadableFormat, timeAtWork } from '@/utils/calculations'
import { authClient } from '../lib/auth-client'
import { orpc } from '../utils/orpc'

export default function Home() {
  const navigate = useNavigate()
  const { data } = authClient.useSession()
  const settings = useQuery(orpc.setting.getByUserId.queryOptions({ input: { userId: data?.user.id ?? '' }, enabled: !!data?.user?.id }))
  const purchases = useQuery(orpc.purchase.getAll.queryOptions({ input: { userId: data?.user.id ?? '' }, enabled: !!data?.user?.id }))

  const stats = useQuery(orpc.stat.getById.queryOptions({ input: { userId: data?.user.id ?? '' }, enabled: !!data?.user?.id }))
  const statUpdateMutation = useMutation(orpc.stat.update.mutationOptions({
    onSuccess: () => {
      stats.refetch()
    },
  }))

  const purchaseDeleteMutation = useMutation(orpc.purchase.delete.mutationOptions({
    onSuccess: (data) => {
      const tWA = timeAtWork(
        settings.data?.salary ?? 0,
        settings.data?.workingTime ?? 0,
        data[0].value,
      )

      const statData = {
        moneySaved: (stats.data?.moneySaved ?? 0) - data[0].value,
        workTimeSaved: (stats.data?.workTimeSaved ?? 0) - tWA,
      }

      statUpdateMutation.mutate({ userId: data[0].userId, ...statData })
      stats.refetch()
      purchases.refetch()
    },
  }))

  const handleDeletePurchase = async (id: number) => {
    purchaseDeleteMutation.mutate({ id })
  }

  const workTimeSaved = convertHoursToReadableFormat((stats.data?.workTimeSaved ?? 0), settings.data?.dailyHours ?? 8)

  return (
    <div className="w-full max-w-sm mx-auto grid gap-8">

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
          <CardDescription>

            {`Based on a ${settings.data?.dailyHours ?? 8}h workday.`}

          </CardDescription>
        </CardHeader>
        <CardContent>
          {stats.isLoading
            ? <Skeleton className="h-12 rounded-xl" />

            : (
                <span className="text-4xl font-bold">

                  {`${workTimeSaved ?? '--'}`}
                </span>
              )}
        </CardContent>
      </Card>

      <Card className="h-full">
        <CardHeader>
          <CardTitle>
            Last Purchases (
            {purchases.data?.length ?? 0}
            )
          </CardTitle>
          <CardDescription>Most recent purchases are shown first</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex flex-col items-center space-y-4 py-4" hidden={!!purchases.data?.length}>
            <span className="text-muted-foreground">No purchases found yet.</span>
            <Button variant="default" onClick={() => navigate('/')}>
              Add your first purchase
            </Button>
          </div>
          <ScrollArea className="h-72">
            <div>
              {purchases.isLoading
                ? <Skeleton className="h-72 rounded-xl" />
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
