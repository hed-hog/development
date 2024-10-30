export const useSetProperties = () => {
  const setText = (textSize: number) => {
    document.documentElement.style.setProperty(
      '--text-size-xs',
      `${textSize * 0.75}rem`
    )
    document.documentElement.style.setProperty(
      '--text-size-sm',
      `${textSize * 0.875}rem`
    )
    document.documentElement.style.setProperty(
      '--text-size-md',
      `${textSize}rem`
    )
    document.documentElement.style.setProperty(
      '--text-size-base',
      `${textSize}rem`
    )
    document.documentElement.style.setProperty(
      '--text-size-lg',
      `${textSize * 1.125}rem`
    )
    document.documentElement.style.setProperty(
      '--text-size-xl',
      `${textSize * 1.25}rem`
    )
    document.documentElement.style.setProperty(
      '--text-size-2xl',
      `${textSize * 1.5}rem`
    )

    document.documentElement.style.setProperty(
      '--text-size-3xl',
      `${textSize * 1.875}rem`
    )
  }

  const setFont = (fontFamily: string) => {
    document.documentElement.style.setProperty('--font-family', fontFamily)
  }

  const setBorderRadius = (radius: number) => {
    document.documentElement.style.setProperty('--radius', `${radius}rem`)
  }

  return {
    setText,
    setFont,
    setBorderRadius,
  }
}
