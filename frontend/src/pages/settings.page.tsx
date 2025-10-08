import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Card from '../components/card.component'
import InputComponent from '../components/input.component'
import { authClient } from '../lib/auth-client'
import { orpc } from '../utils/orpc'

interface FormData {
  monthlySalary: string
  weeklyHours: string
}

interface SettingData {
  salary?: number
  workingTime?: number
}

export default function Settings() {
  const { data: session } = authClient.useSession()
  const userId = session?.user?.id ?? ''

  const [formData, setFormData] = useState<FormData>({
    monthlySalary: '',
    weeklyHours: '',
  })

  // Queries and Mutations
  const settingQuery = useQuery(
    orpc.setting.getByUserId.queryOptions({
      input: { userId },
      enabled: !!userId,
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

  // Helper functions
  const formatSalary = (salary?: number): string =>
    salary ? `${salary}€` : ''

  const formatWorkingTime = (workingTime?: number): string =>
    workingTime ? `${workingTime} hours/week` : ''

  const parseSalary = (value: string): number =>
    Number(value.replace('€', '').trim())

  const parseWorkingTime = (value: string): number =>
    Number(value.replace('hours/week', '').trim())

  const hasDataChanged = (currentData: SettingData): boolean => {
    const currentSalary = parseSalary(formData.monthlySalary)
    const currentWorkingTime = parseWorkingTime(formData.weeklyHours)

    return currentData.salary !== currentSalary
      || currentData.workingTime !== currentWorkingTime
  }

  // Effects
  useEffect(() => {
    if (settingQuery.data) {
      setFormData({
        monthlySalary: formatSalary(settingQuery.data.salary),
        weeklyHours: formatWorkingTime(settingQuery.data.workingTime),
      })
    }
  }, [settingQuery.data])

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

    try {
      if (settingData) {
        await settingUpdateMutation.mutateAsync({
          workingTime,
          salary,
          userId,
        })
      }
      else {
        await settingCreateMutation.mutateAsync({
          workingTime,
          salary,
          userId,
        })
      }
    }
    catch (error) {
      console.error('Error saving settings:', error)
    }
  }

  const handleResetStats = async () => {
    if (!userId)
      return

    try {
      await statResetMutation.mutateAsync({ userId })
    }
    catch (error) {
      console.error('Error resetting stats:', error)
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

  const isLoading = settingCreateMutation.isPending
    || settingUpdateMutation.isPending
    || statResetMutation.isPending

  return (
    <div className="space-y-8 w-full max-w-md mx-auto mt-18">
      {/* Income & Work Hours Section */}
      <Card title="Income & Work Hours" value="">
        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
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
          <button
            className="bg-black text-white mt-8 px-8 py-2 rounded-md w-full disabled:opacity-50"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </Card>

      {/* Reset Statistics Section */}
      <Card title="Reset Statistics" value="">
        <div className="mt-4">
          <span className="">
            ⚠️ This action will reset your money and work time saved statistics. This cannot be undone.
          </span>
        </div>
        <button
          type="button"
          onClick={handleResetStats}
          className="bg-red-500 text-white mt-8 px-8 py-2 rounded-md mx-auto disabled:opacity-50"
          disabled={isLoading}
        >
          {statResetMutation.isPending ? 'Resetting...' : 'Reset Statistics'}
        </button>
      </Card>

      {/* Delete Account Section */}
      <Card title="Delete Account" value="">
        <div className="mt-4">
          <span className="">
            ⚠️ This action will permanently delete your account. This cannot be undone.
          </span>
        </div>
        <button
          type="button"
          onClick={handleDeleteAccount}
          className="bg-red-500 text-white mt-8 px-8 py-2 rounded-md mx-auto disabled:opacity-50"
          disabled={isLoading}
        >
          Delete Account
        </button>
      </Card>
    </div>
  )
}
