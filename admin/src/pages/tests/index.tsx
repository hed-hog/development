import { Button } from '@/components/custom/button'
import { useTheme } from '@/components/theme-provider'
import ThemeSwitch from '@/components/theme-switch'
import { Slider } from '@/components/ui/slider'
import { adjustHSL, hexToHSL } from '@/lib/colors'
import { useState, useEffect } from 'react'
import { HexColorPicker, HexColorInput } from 'react-colorful'
import { toast } from 'sonner'

export default function Test() {
  const { theme } = useTheme()
  const [color, setColor] = useState('#bfaa40')
  const [saturation, setSaturation] = useState(50)
  const [lightness, setLightness] = useState(50)
  const [radius, setRadius] = useState(0.5)
  const [hue, setHue] = useState(50)

  useEffect(() => {
    const hsl = hexToHSL(color)
    setHue(hsl.h)

    const backgroundHSL = adjustHSL(hsl, 0, -20, 90)
    const secondaryHSL = adjustHSL(hsl, 0, -30, 85)
    const accentHSL = adjustHSL(hsl, 0, -10, 95)

    document.documentElement.style.setProperty(
      '--primary',
      `${hue} ${saturation}% ${lightness}%`
    )

    theme === 'dark' &&
      document.documentElement.style.setProperty(
        '--background',
        `${backgroundHSL.h} ${saturation}% ${lightness / 10}%`
      )

    theme === 'dark' &&
      document.documentElement.style.setProperty(
        '--secondary',
        `${secondaryHSL.h} ${saturation}% ${lightness / 10}%`
      )

    document.documentElement.style.setProperty(
      '--accent',
      `${accentHSL.h} ${saturation}% ${lightness / 10}%`
    )

    document.documentElement.style.setProperty(
      '--muted',
      `${hue} ${saturation}% ${lightness}%`
    )

    document.documentElement.style.setProperty('--radius', `${radius}rem`)

    console.log({ color, saturation, lightness, radius })
  }, [color, saturation, lightness, radius, theme])

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

  const saveValues = () => {
    const computedStyles = getComputedStyle(document.documentElement)

    const savedValues = {
      primary: computedStyles.getPropertyValue('--primary').trim(),
      background: computedStyles.getPropertyValue('--background').trim(),
      secondary: computedStyles.getPropertyValue('--secondary').trim(),
      accent: computedStyles.getPropertyValue('--accent').trim(),
      muted: computedStyles.getPropertyValue('--muted').trim(),
      radius: computedStyles.getPropertyValue('--radius').trim(),
    }

    console.log(savedValues)
    toast.success('Values saved! Check out the console.')
  }

  return (
    <div className='flex flex-row items-start justify-center rounded-lg shadow-md'>
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
      </div>
      <div className='flex w-full max-w-xs flex-col space-y-6'>
        <div>
          <label htmlFor='saturation' className='block text-sm font-medium'>
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
          <label htmlFor='lightness' className='block text-sm font-medium'>
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
        <div>
          <label htmlFor='radius' className='block text-sm font-medium'>
            Radius: {radius.toFixed(1)}rem
          </label>
          <Slider
            value={[radius]}
            onValueChange={(value) => setRadius(value[0])}
            defaultValue={[0.5]}
            min={0}
            max={1}
            step={0.1}
          />
        </div>
        <div className='mt-auto flex flex-row justify-between'>
          <ThemeSwitch />
          <Button className='ml-auto' onClick={() => saveValues()}>
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}
