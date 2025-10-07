export function timeAtWork(salary: number, hours: number, purchaseAmount: number): number {
  const monthlyWorkHours = hours * 4 // Assuming 4 weeks in a month
  const hourlyRate = salary / monthlyWorkHours
  return Number.parseFloat((purchaseAmount / hourlyRate).toFixed(1))
}
