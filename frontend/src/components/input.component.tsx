import type React from 'react'

export default function wInputComponent({ label, placeholder, type = 'text', required = false, onChange, name, value }: { label?: string, placeholder?: string, type?: React.HTMLInputTypeAttribute, required?: boolean, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, name: string, value?: string }) {
  return (
    <div className="flex flex-col">
      {label && <label className="font-semibold mb-2" htmlFor={name}>{label}</label>}
      <input required={required} name={name} className="border px-8 py-2 rounded-md text-center" id={name} type={type} value={value} placeholder={placeholder} onChange={onChange} />
    </div>
  )
}
