import type React from 'react'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function InputComponent({ label, placeholder, type = 'text', required = false, onChange, name, value, onBlur, min, step }: { label?: string, placeholder?: string, type?: React.HTMLInputTypeAttribute, required?: boolean, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, name: string, value?: string, onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void, min?: number, step?: number }) {
  return (
    <div className="grid gap-2">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input required={required} name={name} id={name} onBlur={onBlur} type={type} value={value} placeholder={placeholder} onChange={onChange} min={min} step={step} />
    </div>
  )
}
