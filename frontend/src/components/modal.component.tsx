import { Loader } from 'lucide-react'

export default function Modal({ isOpen, children, isLoading }: { isOpen: boolean, children: React.ReactNode, isLoading: boolean }) {
  if (!isOpen)
    return null

  return (
    <div className="fixed  inset-0 bg-black/90 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white lg:ml-64 p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        {isLoading
          ? (
              <Loader className="animate-spin text-center w-full" />
            )
          : (
              children
            )}
      </div>
    </div>
  )
}
