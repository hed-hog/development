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
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'

export type ComboboxPrps = {
  value?: string
  onChange?: (value: string) => void
  url: string
  displayName?: string
  valueName?: string
}

export function Combobox(props: ComboboxPrps) {
  const displayName = props.displayName ? props.displayName : 'name'
  const valueName = props.valueName ? props.valueName : 'id'

  const { request } = useApp()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<any>(props.value)
  const [options, setOptions] = useState<any[]>([])
  const [lastValueOnChange, setLastValueOnChange] = useState('')

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
        (data?.data as any).data.map((item: any) => {
          const finalValueName = item.dashboard_id ? 'dashboard_id' : valueName

          if (item.locale) {
            return {
              [valueName]: item[String(finalValueName)],
              [displayName]:
                item[String(displayName)] ??
                item.locale.pt?.name ??
                item.locale.en?.name ??
                item.slug,
            }
          } else {
            return {
              [valueName]: item[String(valueName)],
              [displayName]:
                item[String(displayName)] ??
                item.name ??
                item.slug ??
                item.code ??
                item.id,
            }
          }
        })
      )
    }
  }, [data, displayName, valueName])

  useEffect(() => {
    if (props.value && options.length) {
      const value = options.find((option) => option[valueName] === props.value)
      if (value && lastValueOnChange !== JSON.stringify(value[valueName])) {
        setValue(value[valueName])
      }
    }
  }, [options, props.value, lastValueOnChange])

  useEffectAfterFirstUpdate(() => {
    if (
      value &&
      value[valueName] &&
      typeof props.onChange === 'function' &&
      lastValueOnChange !== JSON.stringify(value)
    ) {
      setLastValueOnChange(JSON.stringify(value[valueName]))
      props.onChange(value[valueName])
    }
  }, [value, props.onChange, valueName, lastValueOnChange])

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
              {value && (
                <Fragment>
                  {value[displayName] ||
                    (options.find((opt) => opt.id == value) || {}).name}
                </Fragment>
              )}
            </span>

            <ChevronsUpDown className='ml-2 h-3 w-3 shrink-0 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' style={{ zIndex: 100 }}>
        <Command>
          <CommandInput placeholder='Search...' />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option[valueName]}
                  onSelect={() => {
                    setValue(option)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      option[valueName] === value[valueName]
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {option[displayName]}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
