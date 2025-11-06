import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { formatDailyHours, formatSalary, formatWorkingTime } from '@/utils/formatter'
import { parseDailyHours, parseSalary, parseWorkingTime } from '@/utils/parser'
import InputComponent from '../components/input.component'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { authClient } from '../lib/auth-client'
import { orpc } from '../utils/orpc'

interface FormData {
  monthlySalary: string
  weeklyHours: string
  dailyHours: string
}

interface SettingData {
  salary?: number
  workingTime?: number
  dailyHours?: number
}

export default function Settings() {
  const { data: session } = authClient.useSession()
  const userId = session?.user?.id ?? ''

  const [formData, setFormData] = useState<FormData>({
    monthlySalary: '',
    weeklyHours: '',
    dailyHours: '',
  })

  const updateFormData = () => {
    if (!settingQuery.data)
      return

    const data = settingQuery.data

    setFormData((prev) => {
      const newData = {
        monthlySalary: data.salary ? formatSalary(data.salary) : '',
        weeklyHours: data.workingTime ? formatWorkingTime(data.workingTime) : '',
        dailyHours: data.dailyHours ? formatDailyHours(data.dailyHours) : '',
      }

      if (
        prev.monthlySalary === newData.monthlySalary
        && prev.weeklyHours === newData.weeklyHours
        && prev.dailyHours === newData.dailyHours
      ) {
        return prev
      }

      return newData
    })
  }

  // Queries and Mutations
  const settingQuery = useQuery(
    orpc.setting.getByUserId.queryOptions({
      input: { userId },
      enabled: !!userId,
      // Move the state sync out of a useEffect and into the query's onSuccess callback.
      onSuccess: () => {
        updateFormData()
      },
    }),
  )

  const settingCreateMutation = useMutation(
    orpc.setting.create.mutationOptions({
      onSuccess: () => {
        toast.success('Settings have been created.')
        settingQuery.refetch()
      },
      onError: () => {
        toast.error('Failed to create settings. Please try again.')
      },
    }),
  )

  const settingUpdateMutation = useMutation(
    orpc.setting.update.mutationOptions({
      onSuccess: () => {
        toast.info('Settings have been updated.')
        settingQuery.refetch()
      },
      onError: () => {
        toast.error('Failed to update settings. Please try again.')
      },
    }),
  )

  const statResetMutation = useMutation(
    orpc.stat.reset.mutationOptions({
      onSuccess: () => {
        toast.info('Statistics have been reset.')
      },
      onError: () => {
        toast.error('Failed to reset statistics. Please try again.')
      },
    }),
  )

  const purchaseDeleteByUserIdMutation = useMutation(
    orpc.purchase.deleteByUserId.mutationOptions({
      onSuccess: () => {
        toast.info('All purchases have been deleted.')
      },
      onError: () => {
        toast.error('Failed to delete purchases. Please try again.')
      },
    }),
  )

  // Helper functions

  const hasDataChanged = (currentData: SettingData): boolean => {
    const currentSalary = parseSalary(formData.monthlySalary)
    const currentWorkingTime = parseWorkingTime(formData.weeklyHours)
    const currentDailyHours = parseDailyHours(formData.dailyHours)

    return currentData.salary !== currentSalary
      || currentData.workingTime !== currentWorkingTime
      || currentData.dailyHours !== currentDailyHours
  }

  // Event handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userId)
      return

    const settingData = settingQuery.data
    if (settingData && !hasDataChanged(settingData))
      return

    const salary = parseSalary(formData.monthlySalary)
    const workingTime = parseWorkingTime(formData.weeklyHours)
    const dailyHours = parseDailyHours(formData.dailyHours)

    try {
      if (settingData) {
        await settingUpdateMutation.mutateAsync({
          workingTime,
          salary,
          dailyHours,
          userId,
        })
      }
      else {
        await settingCreateMutation.mutateAsync({
          workingTime,
          salary,
          dailyHours,
          userId,
        })
      }
    }
    catch (error) {
      console.error('Error saving settings:', error)
    }
  }

  const handleDeleteData = async () => {
    if (!userId)
      return

    try {
      await Promise.all([
        statResetMutation.mutateAsync({ userId }),
        purchaseDeleteByUserIdMutation.mutateAsync({ userId }),
      ])
    }
    catch (error) {
      console.error('Error deleting data:', error)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await authClient.deleteUser()
      toast.info('Account deleted successfully.')
    }
    catch (error) {
      toast.error('Failed to delete account. Please try again.')
      console.error('Error deleting account:', error)
    }
  }

  const isLoadingSettings = settingCreateMutation.isPending || settingUpdateMutation.isPending

  return (
    <div className="space-y-8 w-full max-w-sm mx-auto">
      {/* Income & Work Hours Section */}
      <Card>
        <CardHeader>
          <CardTitle>Income & Work Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="">
            <div className="flex flex-col gap-6">
              <InputComponent
                value={formData.monthlySalary}
                onChange={handleChange}
                name="monthlySalary"
                required
                label="Monatliches Gehalt"
                placeholder="50€"
              />
              <InputComponent
                value={formData.weeklyHours}
                onChange={handleChange}
                name="weeklyHours"
                required
                label="Wöchentliches Arbeitsstunden"
                placeholder="40 hours/week"
              />
              <InputComponent
                value={formData.dailyHours}
                onChange={handleChange}
                name="dailyHours"
                label="Tägliche Arbeitsstunden"
                placeholder="8 hours/day"
              />

              <Button

                type="submit"
                variant="default"
                disabled={isLoadingSettings}
              >

                {isLoadingSettings ? <Spinner /> : 'Save'}
              </Button>
            </div>

          </form>
        </CardContent>

      </Card>

      {/* Reset Statistics Section */}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Delete Data</CardTitle>
          <CardDescription>⚠️ This action will permanently delete your data. This cannot be undone.</CardDescription>
        </CardHeader>
        <CardContent>
          <CardAction>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button
                  type="button"
                  variant="destructive"
                  disabled={statResetMutation.isPending}
                >
                  {statResetMutation.isPending ? <Spinner /> : 'Delete Data'}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="lg:ml-24">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Data</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete your data? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={handleDeleteData} disabled={statResetMutation.isPending}>
                    {statResetMutation.isPending || purchaseDeleteByUserIdMutation.isPending ? <Spinner /> : 'Delete Data'}
                  </AlertDialogAction>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </CardAction>
        </CardContent>

      </Card>

      {/* Delete Account Section */}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>⚠️ This action will permanently delete your account. This cannot be undone.</CardDescription>
        </CardHeader>
        <CardContent>
          <CardAction>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button
                  type="button"

                  variant="destructive"

                  disabled={statResetMutation.isPending}
                >
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="lg:ml-24">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Account</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete your account? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={handleDeleteAccount} disabled={statResetMutation.isPending}>
                    {statResetMutation.isPending ? 'Deleting...' : 'Delete Account'}
                  </AlertDialogAction>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </CardAction>
        </CardContent>
      </Card>
    </div>
  )
}
