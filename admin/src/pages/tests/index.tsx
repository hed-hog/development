import ThemeSwitch from '@/components/theme-switch'
import React, { useState } from 'react'
import { HexColorPicker, HexColorInput } from 'react-colorful'

export default function Component() {
  const [color, setColor] = useState('#00ff00')
  const [saturation, setSaturation] = useState(50)
  const [lightness, setLightness] = useState(50)
  const [radius, setRadius] = useState(0.5)

  const handleSaturationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSaturation(parseInt(event.target.value))
  }

  const handleLightnessChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLightness(parseInt(event.target.value))
  }

  const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(parseFloat(event.target.value))
  }

  return (
    <div className='flex flex-col items-center space-y-4 rounded-lg p-6 shadow-md'>
      <h2 className='text-2xl font-bold'>Color Picker with Sliders</h2>
      <HexColorPicker color={color} onChange={setColor} className='h-64 w-64' />
      <div className='flex items-center space-x-2 pb-12'>
        <div>Selected Color:</div>
        <div
          className='h-8 w-8 border-2 border-gray-300'
          style={{ backgroundColor: color, borderRadius: '8px' }}
        ></div>
        <HexColorInput
          color={color}
          onChange={setColor}
          className='rounded border border-gray-300 px-2 py-1 text-black'
          prefixed
        />
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
            onChange={handleSaturationChange}
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
            onChange={handleLightnessChange}
            className='h-2 w-full cursor-pointer appearance-none rounded-lg'
          />
        </div>
        <div>
          <label htmlFor='radius' className='block text-sm font-medium'>
            Radius: {radius.toFixed(1)}
          </label>
          <input
            type='range'
            id='radius'
            min='0'
            max='1'
            step='0.1'
            value={radius}
            onChange={handleRadiusChange}
            className='h-2 w-full cursor-pointer appearance-none rounded-lg'
          />
        </div>
      </div>
      <ThemeSwitch />
    </div>
  )
}
