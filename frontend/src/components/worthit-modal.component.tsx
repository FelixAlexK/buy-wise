import { timeAtWork } from '../utils/calculations'
import Modal from './modal.component'
import { Button } from './ui/button'

export default function WorthItModal({ isOpen, salary, workingTime, value, handleDontBuy, handleBuy, onClose }: { isOpen: boolean, salary: number, workingTime: number, value: number, handleDontBuy: () => void, handleBuy: () => void, onClose: () => void }) {
  if (!isOpen)
    return null
  return (
    <Modal onClose={onClose} title="Worth it?" description="Evaluate the worth of this purchase" isOpen={isOpen}>
      <div className="flex flex-col">
        <p className="text-lg text-gray-600 mb-2">Time at Work</p>
        <p className="text-2xl font-semibold mb-8">
          {timeAtWork(salary, workingTime, value)}
          {' '}
          hours
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
