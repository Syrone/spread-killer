export const isPositive = (n) => n > 0
export const formatSigned = (n) => (n > 0 ? `+${n} %` : `${String(n)} %`)

export const formatTimeSecond = (seconds) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  const parts = []
  if (h > 0) parts.push(`${h}h`)
  if (m > 0 || h > 0) parts.push(`${m}m`)
  parts.push(`${s}s`)

  return parts.join(' ')
}

export function formatRemainingTime(seconds) {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  const timeString = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  return { timeString }
}

export function formatPrice(value) {
  if (value == null) return ''
  const [intPart, fracPart] = String(value).split('.')
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return fracPart != null ? `${formattedInt}.${fracPart}` : formattedInt
}