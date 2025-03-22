export function secondsToHuman(seconds: number, short = false) {
  const d = Number(Math.floor(seconds / (3600 * 24)).toFixed(0))
  const h = Number(Math.floor((seconds % (3600 * 24)) / 3600).toFixed(0))
  const m = Number(Math.floor((seconds % 3600) / 60).toFixed(0))
  const s = Number(Number(seconds % 60).toFixed(0))

  if (short) {
    const dDisplay = d > 0 ? d + 'd ' : ''
    const hDisplay = h > 0 ? h + 'h ' : ''
    const mDisplay = m > 0 ? m + 'm ' : ''
    const sDisplay = s > 0 ? s + 's' : ''
    return dDisplay + hDisplay + mDisplay + sDisplay
  } else {
    const dDisplay = d > 0 ? d + (d === 1 ? ' day, ' : ' days, ') : ''
    const hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : ''
    const mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : ''
    const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : ''
    return dDisplay + hDisplay + mDisplay + sDisplay
  }
}
