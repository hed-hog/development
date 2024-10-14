type HSL = {
  h: number
  s: number
  l: number
}

export const adjustHSL = (
  hsl: HSL,
  hueOffset: number,
  satOffset: number,
  lightOffset: number
) => {
  let h = (hsl.h + hueOffset) % 360
  let s = Math.min(Math.max(hsl.s + satOffset, 0), 100)
  let l = Math.min(Math.max(hsl.l + lightOffset, 0), 100)
  return { h, s, l }
}

export const hexToHSL = (hex: string) => {
  hex = hex.replace(/^#/, '')
  let r = parseInt(hex.substring(0, 2), 16) / 255
  let g = parseInt(hex.substring(2, 4), 16) / 255
  let b = parseInt(hex.substring(4, 6), 16) / 255

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h = (max + min) / 2
  let s = (max + min) / 2
  let l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    let d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  h = Math.round(h * 360)
  s = Math.round(s * 100)
  l = Math.round(l * 100)

  return { h, s, l }
}
