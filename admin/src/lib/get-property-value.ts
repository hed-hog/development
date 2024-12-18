const rootStyle = getComputedStyle(document.documentElement)

export const getValue = (property: string) =>
  rootStyle.getPropertyValue(property).trim().replace(/['"]/g, '')
