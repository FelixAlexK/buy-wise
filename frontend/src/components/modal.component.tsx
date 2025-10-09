import { Loader } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function Modal({ isOpen, children, title, description, onClose }: { isOpen: boolean, children: React.ReactNode, title?: string, description?: string, onClose: () => void }) {
  if (!isOpen)
    return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md lg:ml-24">
        <DialogHeader>

          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}

      </DialogContent>
    </Dialog>
  )
}
