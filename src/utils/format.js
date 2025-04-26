export const isPositive = (n) => n > 0
export const formatSigned = (n) => (n > 0 ? `+${n}` : String(n))

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  const timeString = `${hours}:${minutes}:${seconds}`
  const isoString = date.toISOString()
  return { timeString, isoString }
}