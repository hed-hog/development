export const toPascalCase = (str: string) => {
  const pascalCase = str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
  console.log({
    pascalCase,
    str,
  })
  return pascalCase
}
