export default function Modal({ isOpen, children }: { isOpen: boolean, children: React.ReactNode }) {
  if (!isOpen)
    return null
  return (
    <div className="fixed inset-0 bg-black/90 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        {children}
      </div>
    </div>
  )
}
