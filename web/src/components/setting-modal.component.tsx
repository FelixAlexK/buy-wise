import InputComponent from './input.component'
import Modal from './modal.component'
import { Button } from './ui/button'
import { Spinner } from './ui/spinner'

export default function SettingModal({ isOpen, onClose, formData, handleChange, handleSettingCreation, isLoading }: { isOpen: boolean, onClose: () => void, formData: any, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleSettingCreation: () => Promise<void>, isLoading: boolean }) {
  if (!isOpen)
    return null
  return (
    <Modal onClose={onClose} title="Settings" description="Configure your settings" isOpen={isOpen}>
      <form
        onSubmit={async (e) => {
          e.preventDefault()

          handleSettingCreation()
          onClose()
        }}
      >
        <div className="flex flex-col gap-6">

          <InputComponent value={formData.monthlySalary} onChange={handleChange} name="monthlySalary" required label="Monatliches Gehalt" placeholder="50€" />
          <InputComponent value={formData.weeklyHours} onChange={handleChange} name="weeklyHours" required label="Wöchentliches Arbeitsstunden" placeholder="40 hours/week" />
          <Button type="submit">{isLoading ? <Spinner /> : 'Save'}</Button>
        </div>
      </form>

    </Modal>
  )
}
