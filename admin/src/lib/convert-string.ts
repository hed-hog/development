export const toSnakeCase = (str: string) => {
  return str
    .replace(/-/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, '_')
    .toLowerCase()
}

export const toKebabCase = (str: string) => {
  return str
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, '-')
    .toLowerCase()
}

export const toPascalCase = (str: string) => {
  return str
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(
      /(\w)(\w*)/g,
      (_, firstChar, rest) => firstChar.toUpperCase() + rest.toLowerCase()
    )
    .replace(/\s+/g, '')
}

export const toCamelCase = (str: string) => {
  return str
    .replace(/[-_]+/g, ' ')
    .replace(
      /(\w)(\w*)/g,
      (_, firstChar, rest) => firstChar.toUpperCase() + rest.toLowerCase()
    )
    .replace(/^(\w)/, (match) => match.toLowerCase())
    .replace(/\s+/g, '')
}
export const capitalize = (str: string) => {
  if (str.length === 0) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
