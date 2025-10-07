import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import InputComponent from '../components/input.component'
import Modal from '../components/modal.component'
import { authClient } from '../lib/auth-client'
import { timeAtWork } from '../utils/calculations'
import { orpc } from '../utils/orpc'
import Card from '../components/card.component'

export default function PurchasePage() {
  const [newPurchase, setNewPurchase] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    monthlySalary: '',
    weeklyHours: '',
  })

  const { data } = authClient.useSession()

  const settingGetQuery = useQuery(orpc.setting.getByUserId.queryOptions({ input: { userId: data?.user.id! }, enabled: !!data?.user?.id! }))

  const purchaseCreateMutation = useMutation(orpc.purchase.create.mutationOptions({
    onSuccess: () => {
      handleStat()
      statGetQuery.refetch()
      setNewPurchase(0)
    },
  }))

  const settingCreateMutation = useMutation(orpc.setting.create.mutationOptions({
    onSuccess: () => {
      settingGetQuery.refetch()
      
    },

  }))

  const statCreateMutation = useMutation(orpc.stat.create.mutationOptions({
    onSuccess: () => {

    },
  }))

  const statUpdateMutation = useMutation(orpc.stat.update.mutationOptions({
    onSuccess: () => {

    },
  }))

  const statGetQuery = useQuery(
    orpc.stat.getById.queryOptions({
      input: { userId: data?.user?.id! },
      enabled: !!data?.user?.id && purchaseCreateMutation.isSuccess,
    }),
  )

  const close = () => {
    setShowModal(false)
    localStorage.setItem('showModal', '1')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!data?.user)
      return

    if (settingGetQuery.data === undefined) {
      setShowModal(true)
      return
    }

    purchaseCreateMutation.mutate({
      value: newPurchase,
      userId: data.user.id,
    })
  }

  const handleStat = async () => {
    if (!data?.user || !settingGetQuery.data)
      return

    const tAW = timeAtWork(settingGetQuery.data.salary, settingGetQuery.data.workingTime, newPurchase)

    const statData = {
      moneySaved: statGetQuery.data ? (statGetQuery.data.moneySaved + newPurchase) : newPurchase,
      workTimeSaved: statGetQuery.data ? (statGetQuery.data.workTimeSaved + tAW) : tAW,
    }

    if (statGetQuery.isSuccess) {
      statUpdateMutation.mutate({
        userId: data.user.id,
        ...statData,
      })
    }
    else {
      statCreateMutation.mutate({
        userId: data.user.id,
        moneySaved: newPurchase,
        workTimeSaved: tAW,
      })
    }
  }

  return (
    <>
      <div className='w-full max-w-md mx-auto'>
        <Modal onClose={() => close()} isOpen={showModal}>
        <form
          onSubmit={async (e) => {
            e.preventDefault()

            await settingCreateMutation.mutateAsync({
              workingTime: Number(formData.weeklyHours),
              salary: Number(formData.monthlySalary),
              userId: data?.user.id!,
            })
            setShowModal(false)
          }}
          className="space-y-4 "
        >

          <InputComponent value={formData.monthlySalary} onChange={handleChange} name="monthlySalary" required label="Monatliches Gehalt" placeholder="50€" />
          <InputComponent value={formData.weeklyHours} onChange={handleChange} name="weeklyHours" required label="Wöchentliches Arbeitsstunden" placeholder="40 hours/week" />
          <button className="bg-black text-white mt-8 px-8 py-2 rounded-md w-full" type="submit">Save</button>
        </form>
      </Modal>
      <Card>

        <form onSubmit={handlePurchase} className="flex flex-col   max-w-md mx-auto">
        <label className="mx-auto mb-10 text-2xl font-bold" htmlFor="purchase-input">PURCHASE PRICE</label>
        <input onChange={e => setNewPurchase(Number(e.target.value))}  className="border px-8 py-2 mb-8 rounded-md text-center" id="purchase-input" type="text" placeholder="50$" />
        <button className="bg-black text-white px-8 py-2 rounded-md max-w-1/2 mx-auto" type="submit">Submit</button>
        </form>
      </Card>
      </div>
      
    </>
  )
}
