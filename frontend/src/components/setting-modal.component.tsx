import InputComponent from "./input.component"
import Modal from "./modal.component"

export default function SettingModal({ isOpen, onClose, formData, handleChange, handleSettingCreation }: { isOpen: boolean, onClose: () => void, formData: any, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleSettingCreation: () => Promise<void> }) {
    if (!isOpen) return null
    return (
        <Modal isOpen={isOpen}>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault()
        
                    handleSettingCreation()
                    onClose()
                    
                  }}
                  className="space-y-4 "
                >
        
                  <InputComponent value={formData.monthlySalary} onChange={handleChange} name="monthlySalary" required label="Monatliches Gehalt" placeholder="50€" />
                  <InputComponent value={formData.weeklyHours} onChange={handleChange} name="weeklyHours" required label="Wöchentliches Arbeitsstunden" placeholder="40 hours/week" />
                  <button className="bg-black text-white mt-8 px-8 py-2 rounded-md w-full" type="submit">Save</button>
                </form>
                </Modal>
    )
}