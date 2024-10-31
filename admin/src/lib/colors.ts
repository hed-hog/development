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

export const getContrastColor = (hexColor: string) => {
  // Remove o "#" se estiver presente
  hexColor = hexColor.replace('#', '')

  // Converte o hex para RGB
  const r = parseInt(hexColor.slice(0, 2), 16)
  const g = parseInt(hexColor.slice(2, 4), 16)
  const b = parseInt(hexColor.slice(4, 6), 16)

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b

  return luminance > 128 ? '#000000' : '#FFFFFF'
}

export const hexToHSL = (hex: string) => {
  hex = hex && hex.includes('#') ? hex.replace(/^#/, '') : '#000'
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

export const hslToHex = (hsl: string) => {
  const regex = /^(\d{1,3})\s+(\d{1,3}%)\s+(\d{1,3}(?:\.\d+)?%)$/
  const match = hsl.match(regex)

  if (!match) {
    return
  }

  let h = parseFloat(match[1])
  let s = parseFloat(match[2])
  let l = parseFloat(match[3])

  h = h % 360
  s /= 100
  l /= 100

  let r, g, b

  if (s === 0) {
    r = g = b = Math.round(l * 255)
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = Math.round(hue2rgb(p, q, h / 360 + 1 / 3) * 255)
    g = Math.round(hue2rgb(p, q, h / 360) * 255)
    b = Math.round(hue2rgb(p, q, h / 360 - 1 / 3) * 255)
  }

  const toHex = (c: number) => {
    const hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
