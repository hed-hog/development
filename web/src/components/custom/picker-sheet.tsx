import * as React from 'react'
import { Button } from '@/components/custom/button'
import { MultiSelect } from '@/components/ui/multi-select' // Seu componente MultiSelect
import {
  Sheet,
  SheetClose,
  SheetTitle,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
  SheetHeader,
} from '../ui/sheet'
import { CheckIcon } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'

interface Option {
  label: string
  value: string
}

interface PickerSheetProps {
  options: Option[]
  onValueChange: (value: string[]) => void
  placeholder?: string
  title: string
  subtitle?: string
  titleStyle?: React.CSSProperties
  subtitleStyle?: React.CSSProperties
  buttonText?: string
  buttonStyle?: React.CSSProperties
  defaultValue?: string[]
}

const PickerSheet: React.FC<PickerSheetProps> = ({
  options,
  onValueChange,
  title,
  subtitle,
  titleStyle,
  subtitleStyle,
  buttonText = 'Save changes',
  buttonStyle,
  defaultValue = [],
}) => {
  const [selectedValues, setSelectedValues] =
    React.useState<string[]>(defaultValue)

  const toggleOption = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value]
    setSelectedValues(newSelectedValues)
    onValueChange(newSelectedValues)
  }

  const handleInputKeyDown = () => {
    const newSelectedValues = [...selectedValues]
    newSelectedValues.pop()
    setSelectedValues(newSelectedValues)
    onValueChange(newSelectedValues)
  }

  return (
    <Sheet>
      <SheetTrigger asChild className='h-15 w-full p-0'>
        <div className='h-15 w-full'>
          <MultiSelect
            options={options}
            value={selectedValues}
            onChange={setSelectedValues} // Atualiza o estado diretamente
          />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle style={titleStyle}>{title}</SheetTitle>
          <SheetDescription style={subtitleStyle}>{subtitle}</SheetDescription>
        </SheetHeader>

        <Command style={{ maxHeight: '90%' }}>
          <CommandInput
            placeholder='Search...'
            onKeyDown={handleInputKeyDown}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleOption(option.value)}
                    className='cursor-pointer'
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className='h-4 w-4' />
                    </div>
                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>

        <SheetFooter>
          <SheetClose asChild>
            <Button type='submit' style={buttonStyle}>
              {buttonText}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default PickerSheet
