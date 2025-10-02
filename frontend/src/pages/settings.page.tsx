import { useState } from 'react'
import InputComponent from '../components/input.component'

export default function Settings() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    monthlySalary: '',
    weeklyHours: '',
  })

  const handleSubmit = () => {
    setIsSubmitting(true)
    // Handle form submission logic here
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className="w-full max-w-md mx-auto grid gap-8 mt-18"
      >

        <InputComponent onChange={handleChange} name="monthlySalary" required label="Monatliches Gehalt" placeholder="50$" />
        <InputComponent onChange={handleChange} name="weeklyHours" required label="Wöchentliches Arbeitsstunden" placeholder="40" />
        <button className="bg-black text-white mt-8 px-8 py-2 rounded-md max-w-1/2 mx-auto" type="submit">Save</button>
      </form>
    </>

  )
}
