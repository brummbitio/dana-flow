import * as React from 'react'
import { cn } from '@/lib/utils'
import { Link, LinkProps } from 'react-router-dom';

export interface SidebarProps extends React.ComponentProps<'aside'> {}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(
          'fixed left-0 top-0 z-20 h-screen w-72 flex-col border-r bg-background hidden sm:flex',
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
      className={cn('flex h-16 items-center border-b px-6 shrink-0', className)}
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
      className={cn('flex flex-col gap-y-1', className)}
      {...props}
    />
  )
})
SidebarNavMain.displayName = 'SidebarNavMain'

const SidebarNavHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('px-3 pb-2 pt-3', className)} {...props} />
})
SidebarNavHeader.displayName = 'SidebarNavHeader'

const SidebarNavHeaderTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h4
      ref={ref}
      className={cn(
        'text-xs font-semibold uppercase tracking-wider text-muted-foreground/80',
        className
      )}
      {...props}
    />
  )
})
SidebarNavHeaderTitle.displayName = 'SidebarNavHeaderTitle'

export interface SidebarNavLinkProps
  extends React.ComponentProps<'div'> {
  active?: boolean
}

const SidebarNavLink = React.forwardRef<HTMLDivElement, SidebarNavLinkProps>(
  ({ className, active, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer',
          active && 'bg-muted text-foreground',
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

const SidebarMain = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('sm:ml-72 w-full', className)}
      {...props}
    />
  )
})
SidebarMain.displayName = 'SidebarMain'

export {
    Sidebar, // <<< PERBAIKAN DI SINI
    SidebarHeader,
    SidebarBody,
    SidebarNav,
    SidebarNavMain,
    SidebarNavHeader,
    SidebarNavHeaderTitle,
    SidebarNavLink,
    SidebarFooter,
    SidebarMain
}

