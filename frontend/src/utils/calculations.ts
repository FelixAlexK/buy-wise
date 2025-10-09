export function timeAtWork(salary: number, hours: number, purchaseAmount: number): number {
  const monthlyWorkHours = hours * 4 // Assuming 4 weeks in a month
  const hourlyRate = salary / monthlyWorkHours
  return Number.parseFloat((purchaseAmount / hourlyRate).toFixed(1))
}

export function convertHoursToReadableFormat(totalHours: number, workHoursPerDay: number = 8): string {
  const days = Math.floor(totalHours / workHoursPerDay)
  const hours = Math.round(totalHours % workHoursPerDay)

  const dayPart = days > 0 ? `${days} day${days > 1 ? 's' : ''}` : ''
  const hourPart = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : ''

  if (dayPart && hourPart)
    return `${dayPart} and ${hourPart}`

  return dayPart || hourPart || '0 hours'
}

interface StatData {
  moneySaved: number
  workTimeSaved: number
}

export function calculateStatData(salary: number, workingTime: number, value: number, moneySaved: number, workTimeSaved: number): StatData {
  const tAW = timeAtWork(
    salary,
    workingTime,
    value,
  )

  return {
    moneySaved: moneySaved + value,
    workTimeSaved: workTimeSaved + tAW,
  }
}
