export function formatSalary(salary?: number): string {
  return salary ? `${salary}€` : ''
}

export function formatWorkingTime(workingTime?: number): string {
  return workingTime ? `${workingTime} hours/week` : ''
}

export function formatDailyHours(dailyHours?: number): string {
  return dailyHours ? `${dailyHours} hours/day` : ''
}
