import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import InputComponent from '../components/input.component'
import Modal from '../components/modal.component'
import { authClient } from '../lib/auth-client'
import { timeAtWork } from '../utils/calculations'
import { orpc } from '../utils/orpc'
import Card from '../components/card.component'
import WorthItModal from '../components/worthit-modal.component'
import SettingModal from '../components/setting-modal.component'

export default function PurchasePage() {
  const [newPurchase, setNewPurchase] = useState(0)
  const [showSettingModal, setShowSettingModal] = useState(false)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [formData, setFormData] = useState({
    monthlySalary: '',
    weeklyHours: '',
  })

  const { data } = authClient.useSession()

  const purchaseCreateMutation = useMutation(orpc.purchase.create.mutationOptions({
    onSuccess: () => {
      handleStat()
      statGetQuery.refetch()
      setNewPurchase(0)
    },
  }))

  const statGetQuery = useQuery(
    orpc.stat.getById.queryOptions({
      input: { userId: data?.user?.id! },
      enabled: !!data?.user?.id && purchaseCreateMutation.isSuccess,
    }),
  )

  const settingGetQuery = useQuery(orpc.setting.getByUserId.queryOptions({ input: { userId: data?.user.id! }, enabled: !!data?.user?.id! }))


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

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDontBuy = async () => {
    if (!data?.user)
      return

    if (settingGetQuery.data === undefined) {
      setShowSettingModal(true)
      return
    }

      purchaseCreateMutation.mutate({
        value: newPurchase,
        userId: data.user.id,
      })
      setNewPurchase(0)
    setShowPurchaseModal(false)

    
  }

  const handleBuy = () => {
    setNewPurchase(0)
    setShowPurchaseModal(false)
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

  const handleSettingCreation = async () => {
    if (!data?.user)
      return

    await settingCreateMutation.mutateAsync({
      userId: data.user.id,
      salary: Number(formData.monthlySalary),
      workingTime: Number(formData.weeklyHours),
    })
    setFormData({ monthlySalary: '', weeklyHours: '' })
    setShowSettingModal(false)
  }

  return (
    <>
      <div className='w-full max-w-md mx-auto'>
        <SettingModal isOpen={showSettingModal} onClose={() => setShowSettingModal(false)} formData={formData} handleChange={handleChange} handleSettingCreation={async () => { await handleSettingCreation()}} />
        <WorthItModal isOpen={showPurchaseModal} salary={settingGetQuery.data?.salary!} workingTime={settingGetQuery.data?.workingTime!} value={newPurchase} handleDontBuy={handleDontBuy} handleBuy={handleBuy} />
      <Card>

          <form onSubmit={(e) => { e.preventDefault(); setShowPurchaseModal(true); }} className="flex flex-col   max-w-md mx-auto">
        <label className="mx-auto mb-10 text-2xl font-bold" htmlFor="purchase-input">PURCHASE PRICE</label>
        <input onChange={e => setNewPurchase(Number(e.target.value))} value={newPurchase}  className="border px-8 py-2 mb-8 rounded-md text-center" id="purchase-input" type="text" placeholder="50$" />
        <button className="bg-black text-white px-8 py-2 rounded-md max-w-1/2 mx-auto" type="submit">Submit</button>
        </form>
      </Card>
      </div>
      
    </>
  )
}
