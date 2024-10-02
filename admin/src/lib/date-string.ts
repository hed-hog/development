export const isValidDateString = (value: any) => {
  const date = new Date(value)
  return !isNaN(date.getTime())
}

export const formatDate = (value: string) => {
  const date = new Date(value)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}
