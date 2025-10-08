import { timeAtWork } from '../utils/calculations'
import Modal from './modal.component'

export default function WorthItModal({ isOpen, salary, workingTime, value, handleDontBuy, handleBuy, isLoading }: { isOpen: boolean, salary: number, workingTime: number, value: number, handleDontBuy: () => void, handleBuy: () => void, isLoading: boolean }) {
  if (!isOpen)
    return null
  return (
    <Modal isLoading={isLoading} isOpen={isOpen}>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Worth it?</h2>
        <p className="mb-4">Time at Work</p>
        <p className="text-lg font-semibold">
          {timeAtWork(salary, workingTime, value)}
          {' '}
          hours
        </p>
        <div className="gap-4 flex justify-center">
          <button
            type="button"
            className="bg-black text-white mt-8 px-8 py-2 rounded-md"
            onClick={handleDontBuy}
          >
            Don't Buy
          </button>
          <button
            type="button"
            className="bg-black text-white mt-8 px-8 py-2 rounded-md"
            onClick={handleBuy}
          >
            Buy
          </button>
        </div>
      </div>
    </Modal>
  )
}
