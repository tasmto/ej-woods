export function FormatCurrency(number = 0, currency = 'ZAR') {
  return Number(number).toLocaleString('en-ZA', {
    style: 'currency',
    currency: currency,
  });
}
export function FormatDate(
  date = Date.now(),
  options: Intl.DateTimeFormatOptions
): string {
  const format = {
    day: options?.day || 'numeric',
    month: options?.month || 'short',
    year: options?.year || 'numeric',
    weekday: options?.weekday || 'short',
  };
  return new Date(date).toLocaleDateString(
    navigator.language || 'en-us',
    format
  );
}
