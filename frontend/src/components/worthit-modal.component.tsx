import { convertHoursToReadableFormat, timeAtWork } from '../utils/calculations'
import Modal from './modal.component'
import { Button } from './ui/button'

export default function WorthItModal({ isOpen, salary, workingTime, dailyWorkingHours, value, handleDontBuy, handleBuy, onClose }: { isOpen: boolean, salary: number, workingTime: number, dailyWorkingHours: number, value: number, handleDontBuy: () => void, handleBuy: () => void, onClose: () => void }) {
  if (!isOpen)
    return null
  return (
    <Modal onClose={onClose} title="Worth it?" description="Evaluate the worth of this purchase" isOpen={isOpen}>
      <div className="flex flex-col">
        <p className="text-lg text-gray-600 mb-2">
          Time at Work (
          {dailyWorkingHours}
          h/day):
        </p>
        <p className="text-2xl font-semibold mb-8">

          {convertHoursToReadableFormat(timeAtWork(salary, workingTime, value), dailyWorkingHours)}

        </p>
        <div className="flex flex-row gap-4">
          <Button
            type="button"

            onClick={handleDontBuy}
          >
            Don't Buy
          </Button>
          <Button
            type="button"
            variant="outline"

            onClick={handleBuy}
          >
            Buy
          </Button>
        </div>
      </div>
    </Modal>
  )
}
