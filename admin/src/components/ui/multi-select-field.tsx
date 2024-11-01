// src/components/multi-select.tsx

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { IMultiSelectFieldProps } from '@/types/form-panel'
import { CheckIcon, ChevronDown, XCircle } from 'lucide-react'
import * as React from 'react'

interface MultiSelectFieldProps
  extends Omit<IMultiSelectFieldProps, 'type' | 'name'> {
  options: {
    label: string
    value: string
  }[]
  value: string[]
  onChange: (value: string[]) => void
  readOnly?: boolean
  placeholder?: string
  defaultValue?: string[]
  animation?: number
}

export const MultiSelectField = React.forwardRef<
  HTMLButtonElement,
  MultiSelectFieldProps
>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Select options',
      readOnly,
      animation = 0,
      defaultValue = [],
      input,
      badge,
      actionButtons,
      items,
      search,
      checkbox,
      ...props
    },
    ref
  ) => {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

    const [selectedValues, setSelectedValues] = React.useState<string[]>(
      defaultValue || []
    )

    React.useEffect(() => {
      onChange(selectedValues)
    }, [selectedValues, onChange])

    const toggleOption = (optionValue: string) => {
      setSelectedValues((prevSelectedValues) => {
        const newValue = prevSelectedValues.includes(optionValue)
          ? prevSelectedValues.filter((v) => v !== optionValue)
          : [...prevSelectedValues, optionValue]

        onChange(selectedValues)

        return newValue
      })
    }

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev)
    }

    const handleClear = () => {
      onChange([])
    }

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cn(
              'flex h-auto min-h-10 w-full items-center justify-between rounded-md border bg-inherit p-1 hover:bg-inherit',
              input?.className
            )}
            style={input?.style}
          >
            {value.length > 0 ? (
              <div className='flex w-full items-center justify-between'>
                <div className='flex flex-wrap items-center'>
                  {value.map((val) => {
                    const option = options.find((o) => o.value === val)
                    return (
                      <Badge
                        key={val}
                        className={cn(
                          badge?.className,
                          'mr-2 flex items-center text-sm',
                          animation ? 'animate-bounce' : ''
                        )}
                        style={{ animationDuration: `${animation}s` }}
                      >
                        {option?.label}
                        {!readOnly && (
                          <XCircle
                            className='ml-2 h-4 w-4 cursor-pointer'
                            onClick={(event) => {
                              event.stopPropagation()
                              toggleOption(val)
                            }}
                          />
                        )}
                      </Badge>
                    )
                  })}
                </div>
                <ChevronDown className='mx-2 h-4 cursor-pointer text-muted-foreground' />
              </div>
            ) : (
              <div className='mx-auto flex w-full items-center justify-between'>
                <span className='mx-3 text-sm text-muted-foreground'>
                  {placeholder}
                </span>
                <ChevronDown className='mx-2 h-4 cursor-pointer text-muted-foreground' />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Command>
            <CommandInput
              placeholder='Search...'
              className={search?.className}
              style={search?.style}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleOption(option.value)}
                    className={items?.className}
                    style={items?.style}
                  >
                    <div
                      className={cn(
                        checkbox?.className,
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        value.includes(option.value)
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50'
                      )}
                      style={checkbox?.style}
                    >
                      <CheckIcon className='h-4 w-4' />
                    </div>
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <div className='flex items-center justify-between'>
                  <CommandItem
                    onSelect={handleClear}
                    className={`${actionButtons?.className} flex-1 cursor-pointer justify-center`}
                    style={actionButtons?.style}
                  >
                    Limpar
                  </CommandItem>
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    className={`${actionButtons?.className} max-w-full flex-1 cursor-pointer justify-center`}
                    style={actionButtons?.style}
                  >
                    Fechar
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)

MultiSelectField.displayName = 'MultiSelectField'
