export function FormatCurrency(number = 0, currency = 'ZAR') {
  return Number(number).toLocaleString('en-ZA', {
    style: 'currency',
    currency: currency,
  })
}
export const FormatDate = (
  date: Date | string | number = Date.now(),
  options: {
    day: 'numeric' | '2-digit'
    month: 'long' | 'short' | 'numeric' | '2-digit'
    year: 'numeric' | '2-digit'
    hour?: 'numeric' | '2-digit'
    minute?: 'numeric' | '2-digit'
    weekday?: 'long' | 'short' | 'narrow'
  }
) => {
  const format = {
    day: options?.day || 'numeric',
    month: options?.month || 'short',
    year: options?.year || 'numeric',
    weekday: options?.weekday,
    hour: options?.hour,
    minute: options?.minute,
  }
  return new Date(date).toLocaleDateString(
     'en-za',
    format
  )
}
