import { useTheme } from '@/components/theme-provider'
import ThemeSwitch from '@/components/theme-switch'
import { adjustHSL, hexToHSL } from '@/lib/colors'
import { useState, useEffect } from 'react'
import { HexColorPicker, HexColorInput } from 'react-colorful'

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

    document.documentElement.style.setProperty(
      '--background',
      `${backgroundHSL.h} ${saturation}% ${lightness / 10}%`
    )

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
  }, [color, saturation, lightness, radius])

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
    <div className='flex flex-row items-center justify-center space-y-4 rounded-lg shadow-md'>
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
            className='rounded border border-gray-300 px-2 py-1 text-black'
            prefixed
          />
        </div>
      </div>
      <div className='w-full max-w-xs space-y-6'>
        <div>
          <label htmlFor='saturation' className='block text-sm font-medium'>
            Saturation: {saturation}
          </label>
          <input
            type='range'
            id='saturation'
            min='0'
            max='100'
            value={saturation}
            onChange={(e) => setSaturation(parseInt(e.target.value))}
            className='h-2 w-full cursor-pointer appearance-none rounded-lg'
          />
        </div>
        <div>
          <label htmlFor='lightness' className='block text-sm font-medium'>
            Lightness: {lightness}
          </label>
          <input
            type='range'
            id='lightness'
            min='0'
            max='100'
            value={lightness}
            onChange={(e) => setLightness(parseInt(e.target.value))}
            className='h-2 w-full cursor-pointer appearance-none rounded-lg'
          />
        </div>
        <div>
          <label htmlFor='radius' className='block text-sm font-medium'>
            Radius: {radius.toFixed(1)}rem
          </label>
          <input
            type='range'
            id='radius'
            min='0'
            max='1'
            step='0.1'
            value={radius}
            onChange={(e) => setRadius(parseFloat(e.target.value))}
            className='h-2 w-full cursor-pointer appearance-none rounded-lg'
          />
        </div>
        <ThemeSwitch />
      </div>
    </div>
  )
}
