import { useTheme } from '@/components/app/theme-provider'
import { Slider } from '@/components/ui/slider'
import { adjustHSL, hexToHSL } from '@/lib/colors'
import { useEffect, useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import CalendarDemo from '@/components/examples/calendar'
import { CardsChat } from '@/components/examples/chat'
import Stats from '@/components/examples/stats'

interface IProps {
  onChange?: (values: any) => void
  onSubmit?: (values: any) => void
}

export default function ColorTheme({ onChange }: IProps) {
  const { theme } = useTheme()
  const [color, setColor] = useState('#bfaa40')
  const [saturation, setSaturation] = useState(50)
  const [lightness, setLightness] = useState(50)
  const [hue, setHue] = useState(50)
  const hsl = hexToHSL(color)

  useEffect(() => {
    setHue(hsl.h)
    setSaturation(hsl.s)
    setLightness(hsl.l)
  }, [color])

  useEffect(() => {
    const backgroundHSL = adjustHSL(hsl, 0, 15, -30)
    const secondaryHSL = adjustHSL(hsl, -20, -10, 10)
    const accentHSL = adjustHSL(hsl, 0, -10, 20)
    const mutedHSL = {
      h: hue,
      s: saturation,
      l: lightness,
    }

    document.documentElement.style.setProperty(
      '--primary',
      `${hue} ${saturation}% ${lightness}%`
    )

    document.documentElement.style.setProperty(
      '--primary-foreground',
      `${hue} ${saturation}% ${lightness > 50 ? 20 : 80}%`
    )

    theme === 'dark' &&
      document.documentElement.style.setProperty(
        '--background',
        `${backgroundHSL.h} ${saturation}% ${lightness / 10}%`
      )

    theme === 'dark' &&
      document.documentElement.style.setProperty(
        '--background-foreground',
        `${backgroundHSL.h} ${saturation}% ${lightness > 50 ? 20 : 80}%`
      )

    theme === 'dark' &&
      document.documentElement.style.setProperty(
        '--secondary',
        `${secondaryHSL.h} ${saturation}% ${lightness / 10}%`
      )

    theme === 'dark' &&
      document.documentElement.style.setProperty(
        '--secondary-foreground',
        `${secondaryHSL.h} ${saturation}% ${lightness > 50 ? 20 : 80}%`
      )

    document.documentElement.style.setProperty(
      '--accent',
      `${accentHSL.h} ${saturation}% ${lightness / 10}%`
    )

    document.documentElement.style.setProperty(
      '--accent-foreground',
      `${accentHSL.h} ${saturation}% ${lightness > 50 ? 20 : 80}%`
    )

    document.documentElement.style.setProperty(
      '--muted',
      `${mutedHSL.h} ${mutedHSL.s}% ${mutedHSL.l}%`
    )

    document.documentElement.style.setProperty(
      '--muted-foreground',
      `${mutedHSL.h} ${mutedHSL.s}% ${mutedHSL.l > 50 ? 20 : 80}%`
    )

    const computedStyles = getComputedStyle(document.documentElement)
    const savedValues = {
      primary: computedStyles.getPropertyValue('--primary').trim(),
      background: `${backgroundHSL.h} ${backgroundHSL.s}% ${backgroundHSL.l}%`,
      secondary: `${secondaryHSL.h} ${secondaryHSL.s}% ${secondaryHSL.l}%`,
      accent: `${accentHSL.h} ${accentHSL.s}% ${accentHSL.l}%`,
      muted: computedStyles.getPropertyValue('--muted').trim(),
      radius: computedStyles.getPropertyValue('--radius').trim(),
      xs: computedStyles.getPropertyValue('--text-size-xs').trim(),
      sm: computedStyles.getPropertyValue('--text-size-sm').trim(),
      md: computedStyles.getPropertyValue('--text-size-md').trim(),
      base: computedStyles.getPropertyValue('--text-size-base').trim(),
      lg: computedStyles.getPropertyValue('--text-size-lg').trim(),
      xl: computedStyles.getPropertyValue('--text-size-xl').trim(),
      '2xl': computedStyles.getPropertyValue('--text-size-2xl').trim(),
      '3xl': computedStyles.getPropertyValue('--text-size-3xl').trim(),
      fontFamily: computedStyles.getPropertyValue('--font-family').trim(),
    }

    onChange && onChange(savedValues)
  }, [color, saturation, lightness, theme])

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--background',
      `50 50% ${theme === 'dark' ? '5' : '100'}%`
    )

    document.documentElement.style.setProperty(
      '--secondary',
      `210 40% ${theme === 'dark' ? '0' : '100'}%`
    )

    document.documentElement.style.setProperty(
      '--accent',
      `210 40% ${theme === 'dark' ? '0' : '100'}%`
    )
  }, [theme])

  return (
    <div className='flex w-full flex-row justify-between'>
      <div className='flex flex-row flex-wrap justify-between gap-10'>
        <div className='flex flex-row items-start justify-center gap-8 rounded-lg shadow-md'>
          <div className='mx-12 flex flex-col items-center space-y-4'>
            <HexColorPicker
              color={color}
              onChange={setColor}
              className='h-64 w-64'
            />
            <div className='flex flex-col items-center space-x-2 pb-12'>
              <div className='flex w-full flex-row items-center justify-between p-3'>
                <span>Selected Color:</span>
                <div
                  className='h-8 w-8 border-2 border-gray-300'
                  style={{ backgroundColor: color, borderRadius: '8px' }}
                ></div>
              </div>
              <HexColorInput
                color={color}
                onChange={setColor}
                className='rounded border border-gray-300 bg-primary px-2 py-1 text-primary-foreground'
                prefixed
              />
            </div>
            <div className='flex w-full max-w-xs flex-col space-y-6'>
              <div>
                <label
                  htmlFor='saturation'
                  className='block text-sm font-medium'
                >
                  Saturation: {saturation}
                </label>
                <Slider
                  value={[saturation]}
                  onValueChange={(value) => setSaturation(value[0])}
                  defaultValue={[50]}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>
              <div>
                <label
                  htmlFor='lightness'
                  className='block text-sm font-medium'
                >
                  Lightness: {lightness}
                </label>
                <Slider
                  value={[lightness]}
                  onValueChange={(value) => setLightness(value[0])}
                  defaultValue={[50]}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>
            </div>
          </div>
          <CardsChat />
          <div className='flex flex-col gap-10'>
            <Stats />
            <CalendarDemo />
          </div>
        </div>
      </div>
    </div>
  )
}
