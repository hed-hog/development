import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { FormControl } from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useApp } from '@/hooks/use-app'
import { IFormFieldOption } from '@/types'
import { useQuery } from '@tanstack/react-query'

export type ComboboxPrps = {
  value?: string
  onChange?: (value: string) => void
  url: string
}

export function Combobox(props: ComboboxPrps) {
  const { request } = useApp()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(props.value || '')
  const [options, setOptions] = useState<IFormFieldOption[]>([])

  const { data } = useQuery({
    queryKey: [props.url],
    queryFn: () =>
      request({
        url: props.url,
      }),
  })

  useEffect(() => {
    if (data) {
      setOptions(
        (data?.data as any).data.map((item: any) => ({
          value: item.id,
          label: item.name || 'N/A',
        }))
      )
    }
  }, [data])

  useEffectAfterFirstUpdate(() => {
    if (typeof props.onChange === 'function' && value !== props.value) {
      console.log('Combobox useEffectAfterFirstUpdate', {
        value,
      })

      const index = options.findIndex(
        (option) =>
          option.value.toLocaleLowerCase() === value.toLocaleLowerCase()
      )

      if (index > -1) {
        props.onChange(options[index]?.value)
      }
    }
  }, [value])

  useEffect(() => {
    setValue(props.value || '')
  }, [props.value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant='outline'
            role='combobox'
            className={cn(
              'w-full justify-between font-normal',
              !value && 'text-muted-foreground'
            )}
          >
            <span>
              {value &&
              options.length &&
              options.find((language) => language.value === value)?.label
                ? options.find((language) => language.value === value)?.label
                : ''}
            </span>
            <ChevronsUpDown className='ml-2 h-3 w-3 shrink-0 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    console.log('selected!', currentValue)
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      option.value === value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
