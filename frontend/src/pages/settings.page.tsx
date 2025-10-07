import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Card from '../components/card.component'
import InputComponent from '../components/input.component'
import { authClient } from '../lib/auth-client'
import { orpc } from '../utils/orpc'

export default function Settings() {
  const { data } = authClient.useSession()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    monthlySalary: '',
    weeklyHours: '',
  })

  const settingGetQuery = useQuery(orpc.setting.getByUserId.queryOptions({ input: { userId: data?.user.id! }, enabled: !!data?.user?.id }))
  useEffect(() => {
    if (settingGetQuery.data) {
      setFormData({
        monthlySalary: settingGetQuery.data?.salary?.toString() || '--',
        weeklyHours: settingGetQuery.data?.workingTime?.toString() || '--',
      })
    }
  }, [settingGetQuery.data])

  const settingCreateMutation = useMutation(orpc.setting.create.mutationOptions({
    onSuccess: () => {
      settingGetQuery.refetch()
    },

  }))

  const settingUpdateMutation = useMutation(orpc.setting.update.mutationOptions({
    onSuccess: () => {
      settingGetQuery.refetch()
    },
  }))

  const statResetMutation = useMutation(orpc.stat.reset.mutationOptions({
    onSuccess: () => {
      // Optionally refetch any queries related to stats here
    },
  }))

  const handleSubmit = async () => {
    setIsSubmitting(true)

    if (!data?.user) {
      setIsSubmitting(false)
      return
    }

    if (settingGetQuery.data) {
      await settingUpdateMutation.mutateAsync({
        workingTime: Number(formData.weeklyHours),
        salary: Number(formData.monthlySalary),
        userId: data?.user.id,
      })
    }
    else {
      await settingCreateMutation.mutateAsync({
        workingTime: Number(formData.weeklyHours),
        salary: Number(formData.monthlySalary),
        userId: data?.user.id,
      })
    }
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleResetStats = async () => {
    if (!data?.user) {
      return
    }

    try {
      await statResetMutation.mutateAsync({ userId: data?.user.id })
      // Optionally, you can show a success message or refetch related queries here
    }
    catch (error) {
      console.error('Error resetting stats:', error)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await authClient.deleteUser()
      // Optionally, you can show a success message or redirect the user here
    }
    catch (error) {
      console.error('Error deleting account:', error)
    }
  }

  return (
    <>
      <div className="space-y-8 w-full max-w-md mx-auto mt-18">
        <Card title="Income & Work Hours" value="">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            className="space-y-4 mt-8"
          >

            <InputComponent value={formData.monthlySalary + '€'} onChange={handleChange} name="monthlySalary" required label="Monatliches Gehalt" placeholder="50€" />
            <InputComponent value={formData.weeklyHours + ' hours/week'} onChange={handleChange} name="weeklyHours" required label="Wöchentliches Arbeitsstunden" placeholder="40 hours/week" />
            <button className="bg-black text-white mt-8 px-8 py-2 rounded-md w-full" type="submit">Save</button>
          </form>
        </Card>
        <Card title="Reset Statistics" value="">
          <div className='mt-4'>
            <span>⚠️ This action will reset your money and work time saved statistics. This cannot be undone.</span>
          </div>
          ️

          <button onClick={handleResetStats} className="bg-red-500 text-white mt-8 px-8 py-2 rounded-md mx-auto ">Reset Statistics</button>

        </Card>
        <Card title="Delete Account" value="">
          <div className='mt-4'>
            <span>⚠️ This action will permanently delete your account. This cannot be undone.</span>
          </div>
          ️

          <button onClick={handleDeleteAccount} className="bg-red-500 text-white mt-8 px-8 py-2 rounded-md mx-auto ">Delete Account</button>

        </Card>
      </div>

    </>

  )
}
