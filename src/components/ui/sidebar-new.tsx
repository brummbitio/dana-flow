import * as React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { cn } from '@/lib/utils'

export interface SidebarProps extends React.ComponentProps<'aside'> {}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(
          'flex h-full flex-col',
          className
        )}
        {...props}
      />
    )
  }
)
Sidebar.displayName = 'Sidebar'

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex h-16 shrink-0 items-center border-b px-6', className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = 'SidebarHeader'

const SidebarBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('flex-1 overflow-auto', className)} {...props} />
})
SidebarBody.displayName = 'SidebarBody'


const SidebarNav = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <nav
      ref={ref}
      className={cn('p-4', className)}
      {...props}
    />
  )
})
SidebarNav.displayName = 'SidebarNav'

const SidebarNavMain = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col', className)}
      {...props}
    />
  )
})
SidebarNavMain.displayName = 'SidebarNavMain'


export interface SidebarNavLinkProps extends LinkProps {
  active?: boolean;
  disabled?: boolean;
}

const SidebarNavLink = React.forwardRef<HTMLAnchorElement, SidebarNavLinkProps>(
  ({ className, active, disabled, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        className={cn(
          'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
          active && 'bg-muted text-foreground',
          disabled && 'pointer-events-none opacity-50',
          className
        )}
        {...props}
      />
    )
  }
)
SidebarNavLink.displayName = 'SidebarNavLink'

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('mt-auto border-t p-4', className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = 'SidebarFooter'

export {
    Sidebar,
    SidebarHeader,
    SidebarBody,
    SidebarNav,
    SidebarNavMain,
    SidebarNavLink,
    SidebarFooter,
}

