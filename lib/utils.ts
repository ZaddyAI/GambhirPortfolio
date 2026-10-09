import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { NavItem } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Copy plain text to the clipboard, with a legacy fallback for contexts
 *  where the async Clipboard API is unavailable. Resolves `true` on success. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* fall through to the legacy path */
  }

  try {
    const field = document.createElement('textarea')
    field.value = text
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.opacity = '0'
    document.body.appendChild(field)
    field.select()
    const copied = document.execCommand('copy')
    document.body.removeChild(field)
    return copied
  } catch {
    return false
  }
}

/**
 * Whether a nav item should read as "you are here".
 *
 * Two rules, in order: on the homepage, the scroll-spy sitting on the item's
 * section marks it (`/project-archive` still lights on the work band, `/blog`
 * on the blog band); otherwise — or alongside it — being inside the item's own
 * route marks it, so a project write-up counts as Projects and a post page
 * counts as Blog.
 */
export function isNavItemActive(
  item: NavItem,
  state: { pathname: string; active: string; isHome: boolean },
): boolean {
  if (state.isHome && state.active === item.section.slice(1)) return true
  if (item.href.startsWith('/')) {
    return (
      state.pathname === item.href ||
      state.pathname.startsWith(`${item.href}/`)
    )
  }
  return false
}
