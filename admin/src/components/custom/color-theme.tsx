import { useTheme } from '@/components/app/theme-provider'
import { hexToHSL } from '@/lib/colors'
import { useEffect, useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import CalendarDemo from '@/components/examples/calendar'
import { CardsChat } from '@/components/examples/chat'
import Stats from '@/components/examples/stats'

interface IProps {
  defaultValues: any[] | undefined
  onChange?: (values: any) => void
  onSubmit?: (values: any) => void
}

export default function ColorTheme({ defaultValues, onChange }: IProps) {
  const { theme } = useTheme()
  const [defaultPrimary, setDefaultPrimary] = useState('')
  const [defaultSecondary, setDefaultSecondary] = useState('')
  const [defaultMuted, setDefaultMuted] = useState('')
  const [defaultAccent, setDefaultAccent] = useState('')
  const [defaultMenuWidth, setDefaultMenuWidth] = useState('')

  useEffect(() => {
    if (defaultValues) {
      setDefaultPrimary(
        defaultValues.find((v) => v.slug.includes('theme-primary'))?.value
      )
      setDefaultSecondary(
        defaultValues.find((v) => v.slug.includes('theme-secondary'))?.value
      )
      setDefaultMuted(
        defaultValues.find((v) => v.slug.includes('theme-muted'))?.value
      )
      setDefaultAccent(
        defaultValues.find((v) => v.slug.includes('theme-accent'))?.value
      )
      setDefaultMenuWidth(
        defaultValues.find((v) => v.slug.includes('menu-width'))?.value
      )
    }
  }, [defaultValues])

  useEffect(() => {
    const primaryHSL = hexToHSL(defaultPrimary)
    const secondaryHSL = hexToHSL(defaultSecondary)
    const accentHSL = hexToHSL(defaultAccent)
    const mutedHSL = hexToHSL(defaultMuted)

    document.documentElement.style.setProperty(
      '--primary',
      `${primaryHSL.h} ${primaryHSL.s}% ${primaryHSL.l}%`
    )

    document.documentElement.style.setProperty(
      '--secondary',
      `${secondaryHSL.h} ${secondaryHSL.s}% ${secondaryHSL.l}%`
    )

    document.documentElement.style.setProperty(
      '--accent',
      `${accentHSL.h} ${accentHSL.s}% ${accentHSL.l}%`
    )

    document.documentElement.style.setProperty(
      '--muted',
      `${mutedHSL.h} ${mutedHSL.s}% ${mutedHSL.l}%`
    )

    document.documentElement.style.setProperty(
      '--menu-width',
      `${defaultMenuWidth}rem`
    )

    const computedStyles = getComputedStyle(document.documentElement)
    const savedValues = {
      primary: computedStyles.getPropertyValue('--primary').trim(),
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

    if (typeof onChange === 'function') {
      onChange(savedValues)
    }
  }, [
    defaultPrimary,
    defaultSecondary,
    defaultMuted,
    defaultAccent,
    defaultMenuWidth,
    theme,
  ])

  return (
    <div className='flex w-full flex-row justify-between'>
      <div className='flex flex-row flex-wrap justify-between gap-10'>
        <div className='flex flex-row items-start justify-center gap-8 rounded-lg shadow-md'>
          <div className='mx-12 flex flex-col items-center space-y-4'>
            <HexColorPicker
              color={defaultPrimary}
              onChange={(newColor) => {
                if (/^#([0-9A-F]{3}){1,2}$/i.test(newColor)) {
                  setDefaultPrimary(newColor)
                }
              }}
              className='h-64 w-64'
            />
            <div className='flex flex-col items-center space-x-2 pb-12'>
              <div className='flex w-full flex-row items-center justify-between p-3'>
                <span>Selected Color:</span>
                <div
                  className='h-8 w-8 border-2 border-gray-300'
                  style={{
                    backgroundColor: defaultPrimary,
                    borderRadius: '8px',
                  }}
                ></div>
              </div>
              <HexColorInput
                color={defaultPrimary}
                onChange={(newColor) => {
                  if (/^#([0-9A-F]{3}){1,2}$/i.test(newColor)) {
                    setDefaultPrimary(newColor)
                  }
                }}
                className='rounded border border-gray-300 bg-primary px-2 py-1 text-primary-foreground'
                prefixed
              />
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
