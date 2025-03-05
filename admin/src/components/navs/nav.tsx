import { Button, buttonVariants } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { SideLink } from '@/data/sidelinks'
import useCheckActiveNav from '@/hooks/use-check-active-nav'
import { cn } from '@/lib/utils'
import { IconChevronDown } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean
  links: SideLink[]
  closeNav: () => void
}

function renderLink(
  link: SideLink,
  isCollapsed: boolean,
  closeNav: () => void
) {
  const { sub, ...rest } = link
  const key = `${rest.title}-${rest.href}`

  if (isCollapsed && sub) {
    return (
      <NavLinkIconDropdown {...rest} sub={sub} key={key} closeNav={closeNav} />
    )
  }

  if (isCollapsed) {
    return <NavLinkIcon {...rest} key={key} closeNav={closeNav} />
  }

  if (sub) {
    return (
      <NavLinkDropdown
        {...rest}
        href={link.href}
        sub={sub}
        key={key}
        closeNav={closeNav}
      />
    )
  }

  return <NavLink {...rest} key={key} closeNav={closeNav} />
}

export default function Nav({
  links,
  isCollapsed,
  className,
  closeNav,
}: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        `bg-color group border-b py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none`,
        className
      )}
    >
      <TooltipProvider delayDuration={0}>
        <nav className='grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
          {links.map((link) => renderLink(link, isCollapsed, closeNav))}
        </nav>
      </TooltipProvider>
    </div>
  )
}

interface NavLinkProps extends SideLink {
  subLink?: boolean
  title: string
  icon: React.ReactNode
  label: string
  href: string
  sub?: any
  closeNav: () => void
}

function NavLink({
  title,
  icon,
  label,
  href,
  closeNav,
  subLink = false,
}: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav()
  return (
    <Link
      to={href}
      onClick={closeNav}
      className={cn(
        buttonVariants({
          variant: checkActiveNav(href) ? 'secondary' : 'ghost',
          size: 'sm',
        }),
        'h-12 w-full justify-start text-wrap rounded-none px-6',
        subLink && 'h-10 w-full border-l border-l-slate-500 px-2'
      )}
      aria-current={checkActiveNav(href) ? 'page' : undefined}
    >
      <div className='mr-2'>{icon}</div>
      {title}
      {label && (
        <div className='ml-2 rounded-lg px-1 text-[0.625rem] text-primary-foreground'>
          {label}
        </div>
      )}
    </Link>
  )
}

function NavLinkDropdown({ title, icon, label, sub, closeNav }: NavLinkProps) {
  return (
    <Collapsible defaultOpen={true}>
      <CollapsibleTrigger
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'group h-12 w-full justify-start rounded-none px-6'
        )}
      >
        <div className='mr-2'>{icon}</div>
        {title}
        {label && (
          <div className='ml-2 rounded-lg px-1 text-[0.625rem] text-primary-foreground'>
            {label}
          </div>
        )}
        <span
          className={cn(
            'ml-auto transition-all group-data-[state="open"]:-rotate-180'
          )}
        >
          <IconChevronDown stroke={1} />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className='collapsibleDropdown' asChild>
        <ul>
          {sub!.map((sublink: any) => (
            <li key={sublink.title} className='my-1 ml-8'>
              {renderLink(sublink, false, closeNav)}
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}

function NavLinkIcon({ title, icon, label, href }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav()
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          to={href}
          className={cn(
            buttonVariants({
              variant: checkActiveNav(href) ? 'secondary' : 'ghost',
              size: 'icon',
            }),
            'h-12 w-12 min-w-fit'
          )}
        >
          {icon}
          <span className='sr-only'>{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side='right' className='flex items-center gap-4'>
        {title}
        {label && (
          <span className='ml-auto text-muted-foreground'>{label}</span>
        )}
      </TooltipContent>
    </Tooltip>
  )
}

function NavLinkIconDropdown({ title, icon, label, sub }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav()
  const isChildActive = !!sub?.find((s: any) => checkActiveNav(s.href))

  return (
    <DropdownMenu>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant={isChildActive ? 'secondary' : 'ghost'}
              size='icon'
              className='h-12 w-12 min-w-fit'
            >
              {icon}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side='right' className='flex items-center gap-4'>
          {title}{' '}
          {label && (
            <span className='ml-auto text-muted-foreground'>{label}</span>
          )}
          <IconChevronDown
            size={18}
            className='-rotate-90 text-muted-foreground'
          />
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent side='right' align='start' sideOffset={4}>
        <DropdownMenuLabel>
          {title} {label ? `(${label})` : ''}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sub!.map(({ title, icon, label, href, sub: subSub }: any) => (
          <DropdownMenu key={`${title}-${href}`}>
            <DropdownMenuItem asChild>
              {subSub ? (
                <div className='relative flex items-center justify-between'>
                  <DropdownMenuTrigger asChild>
                    <Link
                      to={href}
                      className={`${
                        checkActiveNav(href) ? 'bg-secondary' : ''
                      } flex w-full`}
                    >
                      {icon}{' '}
                      <span className='ml-2 max-w-52 text-wrap'>{title}</span>
                      {label && (
                        <span className='ml-auto text-xs'>{label}</span>
                      )}
                    </Link>
                  </DropdownMenuTrigger>
                  <IconChevronDown className='ml-2' size={16} />
                </div>
              ) : (
                <Link
                  to={href}
                  className={`${
                    checkActiveNav(href) ? 'bg-secondary' : ''
                  } flex w-full`}
                >
                  {icon}{' '}
                  <span className='ml-2 max-w-52 text-wrap'>{title}</span>
                  {label && <span className='ml-auto text-xs'>{label}</span>}
                </Link>
              )}
            </DropdownMenuItem>
            {subSub && (
              <DropdownMenuContent side='right' align='start' sideOffset={4}>
                {subSub.map((subSublink: any) => (
                  <DropdownMenuItem
                    key={`${subSublink.title}-${subSublink.href}`}
                    asChild
                  >
                    <Link to={subSublink.href}>
                      {subSublink.icon}{' '}
                      <span className='ml-2'>{subSublink.title}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
