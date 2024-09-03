import * as React from 'react'
import type { SVGProps } from 'react'
const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <path
      fill='inherit'
      d='M9.5 10a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M14.5 15a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1'
    />
    <path
      stroke='inherit'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'
    />
    <path
      stroke='inherit'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M9.5 10a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M14.5 15a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1'
    />
  </svg>
)
export default Logo
