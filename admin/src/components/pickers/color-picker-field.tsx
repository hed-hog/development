import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ColorPickerFieldVariant } from '@/enums/EnumColorPickerFieldVariant'
import { cn } from '@/lib/utils'
import { FieldProps } from '@/types/form-panel'
import { Paintbrush } from 'lucide-react'
import { useMemo } from 'react'

export type ColorPickerFieldProps = {
  variant?: ColorPickerFieldVariant
} & Omit<FieldProps, 'label' | 'options' | 'sliderOptions'>

export function ColorPickerField({
  value,
  onChange,
  variant = ColorPickerFieldVariant.DEFAULT,
}: ColorPickerFieldProps) {
  const background =
    value ||
    'linear-gradient(to bottom right,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)'

  return variant === 'full' ? (
    <div
      className='preview flex h-full max-h-[350px] w-full items-center justify-center rounded !bg-cover !bg-center p-10 transition-all'
      style={{ background }}
    >
      <GradientPicker background={background} setBackground={onChange} />
    </div>
  ) : (
    <GradientPicker background={background} setBackground={onChange} />
  )
}

export function GradientPicker({
  background,
  setBackground,
  className,
}: {
  background: string
  setBackground: (background: string) => void
  className?: string
}) {
  const solids = [
    '#E2E2E2',
    '#ff75c3',
    '#ffa647',
    '#ffe83f',
    '#9fff5b',
    '#70e2ff',
    '#cd93ff',
    '#09203f',
  ]

  const gradients = [
    'linear-gradient(to bottom right,#accbee,#e7f0fd)',
    'linear-gradient(to bottom right,#d5d4d0,#d5d4d0,#eeeeec)',
    'linear-gradient(to bottom right,#000000,#434343)',
    'linear-gradient(to bottom right,#09203f,#537895)',
    'linear-gradient(to bottom right,#AC32E4,#7918F2,#4801FF)',
    'linear-gradient(to bottom right,#f953c6,#b91d73)',
    'linear-gradient(to bottom right,#ee0979,#ff6a00)',
    'linear-gradient(to bottom right,#F00000,#DC281E)',
    'linear-gradient(to bottom right,#00c6ff,#0072ff)',
    'linear-gradient(to bottom right,#4facfe,#00f2fe)',
    'linear-gradient(to bottom right,#0ba360,#3cba92)',
    'linear-gradient(to bottom right,#FDFC47,#24FE41)',
    'linear-gradient(to bottom right,#8a2be2,#0000cd,#228b22,#ccff00)',
    'linear-gradient(to bottom right,#40E0D0,#FF8C00,#FF0080)',
    'linear-gradient(to bottom right,#fcc5e4,#fda34b,#ff7882,#c8699e,#7046aa,#0c1db8,#020f75)',
    'linear-gradient(to bottom right,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)',
  ]

  const defaultTab = useMemo(() => {
    if (background.includes('gradient')) return 'gradient'
    return 'solid'
  }, [background])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'bg-unset hover:bg-unset w-full justify-start text-left font-normal',
            !background && 'text-muted-foreground',
            className
          )}
        >
          <div className='flex w-full items-center gap-2'>
            {background ? (
              <div
                className='h-4 w-4 rounded !bg-cover !bg-center transition-all'
                style={{ background }}
              ></div>
            ) : (
              <Paintbrush className='h-4 w-4' />
            )}
            <div className='flex-1 truncate'>
              {background ? background : 'Pick a color'}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-64' align='start'>
        <Tabs defaultValue={defaultTab} className='w-full'>
          <TabsList className='mb-4 w-full'>
            <TabsTrigger className='flex-1' value='solid'>
              Solid
            </TabsTrigger>
            <TabsTrigger className='flex-1' value='gradient'>
              Gradient
            </TabsTrigger>
            <TabsTrigger className='flex-1' value='custom'>
              Custom
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value='solid'
            className='mt-0 flex flex-row flex-wrap gap-1'
          >
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className='h-6 w-6 cursor-pointer rounded-md active:scale-105'
                onClick={() => setBackground(s)}
              />
            ))}
          </TabsContent>

          <TabsContent value='gradient' className='mt-0'>
            <div className='mb-2 flex flex-wrap gap-1'>
              {gradients.map((s) => (
                <div
                  key={s}
                  style={{ background: s }}
                  className='h-6 w-6 cursor-pointer rounded-md active:scale-105'
                  onClick={() => setBackground(s)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value='custom' className='mt-0'>
            <div className='flex flex-col items-center'>
              <input
                type='color'
                value={
                  background.includes('rgb') || background.includes('#')
                    ? background
                    : '#ffffff'
                }
                onChange={(e) => setBackground(e.target.value)}
                className='h-12 w-full cursor-pointer'
              />
            </div>
          </TabsContent>
        </Tabs>

        <Input
          id='custom'
          value={background}
          className='col-span-2 mt-4 h-8'
          onChange={(e) => setBackground(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  )
}
