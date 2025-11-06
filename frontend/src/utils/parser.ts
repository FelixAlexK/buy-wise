export function parseSalary(value: string): number {
  return Number(value.replace('€', '').trim())
}

export function parseWorkingTime(value: string): number {
  return Number(value.replace('hours/week', '').trim())
}

export function parseDailyHours(value: string): number {
  return Number(value.replace('hours/day', '').trim())
}
