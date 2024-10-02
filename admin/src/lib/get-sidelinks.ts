import { SideLink } from '@/data/sidelinks'
import { getIcon } from '@/lib/get-icon'

export const getSideLinks = (items: any[]) => {
  const links: SideLink[] = []

  for (let i = 0; i < items.length; i++) {
    const link: SideLink = {
      href: items[i].url ?? '',
      icon: getIcon(items[i].icon),
      title: items[i].name,
      sub:
        items[i].menus && items[i].menus.length > 0
          ? getSideLinks(items[i].menus)
          : [],
    }

    if (link.sub?.length === 0) {
      delete link.sub
    }

    links.push(link)
  }
  return links
}
