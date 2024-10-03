export default function timeSince(providedDateStr: string): string {
  const providedDate = new Date(providedDateStr)
  const currentTime = new Date()
  const timeDifference = (currentTime.getTime() - providedDate.getTime()) / 1000

  const days = Math.floor(timeDifference / (3600 * 24))

  if (!days) {
    return 'hoje'
  }

  return `há ${days} dias`
}
