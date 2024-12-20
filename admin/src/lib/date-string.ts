export const isValidDateString = (value: any) => {
  if (typeof value !== 'string') return false
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
  if (!dateRegex.test(value) && !dateTimeRegex.test(value)) return false

  const date = new Date(value)
  return !isNaN(date.getTime())
}

export const formatDate = (value: string) => {
  const [year, month, day] = value.split('T')[0].split('-')
  return `${day}/${month}/${year}`
}
