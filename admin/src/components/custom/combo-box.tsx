import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { FormControl } from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useApp } from '@/hooks/use-app'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'

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
  const [value, setValue] = useState<any>({})
  const [options, setOptions] = useState<any[]>([])

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
          [valueName]: item[String(valueName)],
          [displayName]: item[String(displayName)],
        }))
      )
    }
  }, [data, displayName, valueName])

  useEffect(() => {
    if (props.value && options.length) {
      setValue(options.find((option) => option[valueName] === props.value))
    }
  }, [options, props.value])

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
            {value && <span>{value[displayName]}</span>}
            <ChevronsUpDown className='ml-2 h-3 w-3 shrink-0 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='z-50 w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search...' />
          <CommandEmpty>No framework found.</CommandEmpty>
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
                    option[valueName] === value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {option[displayName]}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
