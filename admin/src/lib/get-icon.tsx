import * as TablerIcons from '@tabler/icons-react'
import { toPascalCase } from '@/lib/to-pascal-case'

export const getIcon = (icon: string) => {
  if (icon !== '' && icon.length > 0) {
    const componentName = 'Icon' + toPascalCase(icon)
    const IconComponent = TablerIcons[
      componentName as keyof typeof TablerIcons
    ] as React.FC<{ size?: number }>
    if (IconComponent) {
      return <IconComponent size={18} />
    }
  }
  return <TablerIcons.IconSquare size={18} />
}
