export const isValidDateString = (value: any) => {
  const date = new Date(value)
  return !isNaN(date.getTime())
}

export const formatDate = (value: string) => {
  const [year, month, day] = value.split('T')[0].split('-')
  return `${day}/${month}/${year}`
}
