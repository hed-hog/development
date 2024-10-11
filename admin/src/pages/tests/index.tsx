import { Button } from '@/components/custom/button'
import { useTheme } from '@/components/theme-provider'
import ThemeSwitch from '@/components/theme-switch'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
  const [textSize, setTextSize] = useState(1)
  const [fontFamily, setFontFamily] = useState(
    'ui-sans-serif, system-ui, sans-serif'
  )
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

    document.documentElement.style.setProperty('--font-family', fontFamily)
  }, [color, saturation, lightness, radius, textSize, theme, fontFamily])

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
        <div>
          <label htmlFor='size' className='block text-sm font-medium'>
            Text Size: {textSize.toFixed(1)}rem
          </label>
          <Slider
            value={[textSize]}
            onValueChange={(value) => setTextSize(value[0])}
            defaultValue={[1]}
            min={0}
            max={5}
            step={0.1}
          />
        </div>
        <div>
          <label htmlFor='font-family' className='block text-sm font-medium'>
            Font Family
          </label>
          <Select
            onValueChange={(value) => setFontFamily(value)}
            value={fontFamily}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select font family' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='ui-sans-serif, system-ui, sans-serif'>
                  Default
                </SelectItem>
                <SelectItem value='Arial' style={{ fontFamily: 'Arial' }}>
                  Arial
                </SelectItem>
                <SelectItem value='Verdana' style={{ fontFamily: 'Verdana' }}>
                  Verdana
                </SelectItem>
                <SelectItem
                  value='Helvetica'
                  style={{ fontFamily: 'Helvetica' }}
                >
                  Helvetica
                </SelectItem>
                <SelectItem value='Georgia' style={{ fontFamily: 'Georgia' }}>
                  Georgia
                </SelectItem>
                <SelectItem
                  value='Times New Roman'
                  style={{ fontFamily: 'Times New Roman' }}
                >
                  Times New Roman
                </SelectItem>
                <SelectItem
                  value='Courier New'
                  style={{ fontFamily: 'Courier New' }}
                >
                  Courier New
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
