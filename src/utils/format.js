export const isPositive = (n) => n > 0
export const formatSigned = (n) => (n > 0 ? `+${n} %` : `${String(n)} %`)

export const formatTimeSecond = (seconds) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}m ${s}s`
}

export function formatRemainingTime(seconds) {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  const timeString = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  return { timeString }
}