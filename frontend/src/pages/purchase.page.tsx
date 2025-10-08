import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import Card from '../components/card.component'
import SettingModal from '../components/setting-modal.component'
import WorthItModal from '../components/worthit-modal.component'
import { authClient } from '../lib/auth-client'
import { timeAtWork } from '../utils/calculations'
import { orpc } from '../utils/orpc'

// Types
interface FormData {
  monthlySalary: string
  weeklyHours: string
}

interface StatData {
  moneySaved: number
  workTimeSaved: number
}

export default function PurchasePage() {
  // State
  const [newPurchase, setNewPurchase] = useState(0)
  const [showSettingModal, setShowSettingModal] = useState(false)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    monthlySalary: '',
    weeklyHours: '',
  })

  // Queries and Mutations
  const { data: session } = authClient.useSession()
  const userId = session?.user?.id ?? ''

  const settingQuery = useQuery(
    orpc.setting.getByUserId.queryOptions({
      input: { userId },
      enabled: !!userId,
    }),
  )

  const statQuery = useQuery(
    orpc.stat.getById.queryOptions({
      input: { userId },
      enabled: !!userId,
    }),
  )

  const purchaseCreateMutation = useMutation(
    orpc.purchase.create.mutationOptions({

      onSuccess: () => {
        toast.success('Purchase created successfully.')
        // eslint-disable-next-line ts/no-use-before-define
        resetPurchase()
      },

      onError: () => {
        toast.error('Failed to create purchase. Please try again.')
      },
    }),
  )

  const settingCreateMutation = useMutation(
    orpc.setting.create.mutationOptions({
      onSuccess: () => {
        toast.success('Settings created successfully.')
        // eslint-disable-next-line ts/no-use-before-define
        resetFormData()
      },
      onError: () => {
        toast.error('Failed to create settings. Please try again.')
      },
    }),

  )

  const statCreateMutation = useMutation(
    orpc.stat.create.mutationOptions({
      onSuccess: () => {
        toast.success('Stats created successfully.')
      },
      onError: () => {
        toast.error('Failed to create stats. Please try again.')
      },
    }),
  )

  const statUpdateMutation = useMutation(
    orpc.stat.update.mutationOptions({
      onError: () => {
        toast.error('Failed to update stats.')
      },
    }),
  )

  // Helper functions
  const resetPurchase = () => setNewPurchase(0)

  const resetFormData = () => setFormData({ monthlySalary: '', weeklyHours: '' })

  const closeModals = () => {
    setShowSettingModal(false)
    setShowPurchaseModal(false)
  }

  const calculateStatData = (): StatData => {
    if (!settingQuery.data)
      return { moneySaved: 0, workTimeSaved: 0 }

    const tAW = timeAtWork(
      settingQuery.data.salary,
      settingQuery.data.workingTime,
      newPurchase,
    )

    return {
      moneySaved: statQuery.data
        ? statQuery.data.moneySaved + newPurchase
        : newPurchase,
      workTimeSaved: statQuery.data
        ? statQuery.data.workTimeSaved + tAW
        : tAW,
    }
  }

  // Event handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePurchaseInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPurchase(Number(e.target.value))
  }

  const handleSettingCreation = async () => {
    if (!userId)
      return

    try {
      await settingCreateMutation.mutateAsync({
        userId,
        salary: Number(formData.monthlySalary),
        workingTime: Number(formData.weeklyHours),
      })
      resetFormData()
      setShowSettingModal(false)
    }
    catch (error) {
      console.error('Failed to create settings:', error)
    }
  }

  const handleStatUpdate = async () => {
    if (!userId || !settingQuery.data)
      return

    const statData = calculateStatData()

    try {
      if (statQuery.data) {
        await statUpdateMutation.mutateAsync({
          userId,
          ...statData,
        })
      }
      else {
        await statCreateMutation.mutateAsync({
          userId,
          moneySaved: newPurchase,
          workTimeSaved: timeAtWork(
            settingQuery.data.salary,
            settingQuery.data.workingTime,
            newPurchase,
          ),
        })
      }
    }
    catch (error) {
      console.error('Failed to update stats:', error)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (newPurchase <= 0) {
      toast.error('Please enter a valid purchase amount.')
      return
    }

    if (!settingQuery.data) {
      setShowSettingModal(true)
      return
    }

    setShowPurchaseModal(true)
  }

  const handleBuy = () => {
    resetPurchase()
    setShowPurchaseModal(false)
  }

  const handleDontBuy = async () => {
    if (!userId)
      return

    try {
      const purchase = await purchaseCreateMutation.mutateAsync({
        value: newPurchase,
        userId,
      })

      if (purchase) {
        await handleStatUpdate()
      }

      resetPurchase()
      setShowPurchaseModal(false)
    }
    catch (error) {
      console.error('Failed to create purchase:', error)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <SettingModal
        isLoading={settingCreateMutation.isPending}
        isOpen={showSettingModal}
        onClose={() => setShowSettingModal(false)}
        formData={formData}
        handleChange={handleInputChange}
        handleSettingCreation={handleSettingCreation}
      />

      <WorthItModal
        isLoading={purchaseCreateMutation.isPending}
        isOpen={showPurchaseModal}
        salary={settingQuery.data?.salary ?? 0}
        workingTime={settingQuery.data?.workingTime ?? 0}
        value={newPurchase}
        handleDontBuy={handleDontBuy}
        handleBuy={handleBuy}
      />

      <Card>
        <form onSubmit={handleFormSubmit} className="flex flex-col max-w-md mx-auto">
          <label
            className="mx-auto mb-10 text-2xl font-bold"
            htmlFor="purchase-input"
          >
            PURCHASE PRICE
          </label>

          <input
            id="purchase-input"
            type="number"
            placeholder="50€"
            value={newPurchase === 0 ? '' : newPurchase}
            onChange={handlePurchaseInputChange}
            className="border px-8 py-2 mb-8 rounded-md text-center"
            min="0"
            step="0.1"
          />

          <button
            type="submit"
            className="bg-black text-white px-8 py-2 rounded-md max-w-1/2 mx-auto hover:bg-gray-800 transition-colors"
          >
            Submit
          </button>
        </form>
      </Card>
    </div>
  )
}
