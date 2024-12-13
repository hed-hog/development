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
  const [defaultPrimaryForeground, setDefaultPrimaryForeground] = useState('')
  const [defaultSecondary, setDefaultSecondary] = useState('')
  const [defaultSecondaryForeground, setDefaultSecondaryForeground] =
    useState('')
  const [defaultMuted, setDefaultMuted] = useState('')
  const [defaultMutedForeground, setDefaultMutedForeground] = useState('')
  const [defaultAccent, setDefaultAccent] = useState('')
  const [defaultAccentForeground, setDefaultAccentForeground] = useState('')

  useEffect(() => {
    console.log({ defaultValues })

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
      setDefaultPrimaryForeground(
        defaultValues.find((v) => v.slug.includes('theme-primary-foreground'))
          ?.value
      )
      setDefaultSecondaryForeground(
        defaultValues.find((v) => v.slug.includes('theme-secondary-foreground'))
          ?.value
      )
      setDefaultMutedForeground(
        defaultValues.find((v) => v.slug.includes('theme-muted-foreground'))
          ?.value
      )
      setDefaultAccentForeground(
        defaultValues.find((v) => v.slug.includes('theme-accent-foreground'))
          ?.value
      )
    }
  }, [defaultValues])

  useEffect(() => {
    const primaryHSL = hexToHSL(defaultPrimary)
    const secondaryHSL = hexToHSL(defaultSecondary)
    const accentHSL = hexToHSL(defaultAccent)
    const mutedHSL = hexToHSL(defaultMuted)
    const primaryForegroundHSL = hexToHSL(defaultPrimaryForeground)
    const secondaryForegroundHSL = hexToHSL(defaultSecondaryForeground)
    const accentForegroundHSL = hexToHSL(defaultAccentForeground)
    const mutedForegroundHSL = hexToHSL(defaultMutedForeground)

    document.documentElement.style.setProperty(
      '--primary-foreground',
      `${primaryForegroundHSL.h} ${primaryForegroundHSL.s}% ${primaryForegroundHSL.l > 50 ? 20 : 80}%`
    )

    document.documentElement.style.setProperty(
      '--secondary-foreground',
      `${secondaryForegroundHSL.h} ${secondaryForegroundHSL.s}% ${secondaryForegroundHSL.l > 50 ? 20 : 80}%`
    )

    document.documentElement.style.setProperty(
      '--accent-foreground',
      `${accentForegroundHSL.h} ${accentForegroundHSL.s}% ${accentForegroundHSL.l > 50 ? 20 : 80}%`
    )

    document.documentElement.style.setProperty(
      '--muted-foreground',
      `${mutedForegroundHSL.h} ${mutedForegroundHSL.s}% ${mutedForegroundHSL.l > 50 ? 20 : 80}%`
    )

    document.documentElement.style.setProperty(
      '--primary',
      `${primaryHSL.h} ${primaryHSL.s}% ${primaryHSL.l}%`
    )

    document.documentElement.style.setProperty(
      '--primary-foreground',
      `${primaryHSL.h} ${primaryHSL.s}%  ${primaryHSL.l > 50 ? 20 : 80}%`
    )

    theme === 'dark' &&
      document.documentElement.style.setProperty(
        '--secondary',
        `${secondaryHSL.h} ${secondaryHSL.s}% ${secondaryHSL.l / 10}%`
      )

    theme === 'dark' &&
      document.documentElement.style.setProperty(
        '--secondary-foreground',
        `${secondaryHSL.h} ${secondaryHSL.s}% ${secondaryHSL.l > 50 ? 20 : 80}%`
      )

    document.documentElement.style.setProperty(
      '--accent',
      `${accentHSL.h} ${accentHSL.s}% ${accentHSL.l / 10}%`
    )

    document.documentElement.style.setProperty(
      '--accent-foreground',
      `${accentHSL.h} ${accentHSL.s}% ${accentHSL.l > 50 ? 20 : 80}%`
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
  }, [defaultPrimary, defaultSecondary, defaultMuted, defaultAccent, theme])

  useEffect(() => {
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
