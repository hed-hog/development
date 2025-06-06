import { toPascalCase } from '@/lib/convert-string';
import * as TablerIcons from '@tabler/icons-react';
import React from 'react';

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: string;
}

const Icon = React.forwardRef<HTMLDivElement, IconProps>(
  ({ icon, ...props }, ref) => {
    if (icon && icon.length > 0) {
      const componentName = 'Icon' + toPascalCase(icon);
      const IconComponent = TablerIcons[
        componentName as keyof typeof TablerIcons
      ] as React.FC<{ size?: number }>;

      if (IconComponent) {
        return <IconComponent size={18} {...props} />;
      }
    }

    return <TablerIcons.IconSquare size={18} />;
  },
);

Icon.displayName = 'Icon';

export default Icon;
