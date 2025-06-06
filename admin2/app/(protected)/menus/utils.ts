import * as LucideIcons from 'lucide-react';
import type { FlattenedItem, MenuItem } from './types';

export const AVAILABLE_ICONS = [
  'Home',
  'LayoutDashboard',
  'Users',
  'Settings',
  'FileText',
  'BarChart',
  'PieChart',
  'Calendar',
  'Mail',
  'MessageSquare',
  'ShoppingCart',
  'Package',
  'Database',
  'Globe',
  'Map',
  'Layers',
  'Activity',
  'Bell',
  'Bookmark',
  'Heart',
  'Star',
  'Image',
  'Video',
  'Music',
  'FolderOpen',
  'List',
  'Table',
  'Grid',
  'User',
  'CreditCard',
  'Lock',
  'Shield',
  'Key',
];

export const AVAILABLE_ROLES = [
  {
    id: 'admin',
    name: 'Admin',
    description: 'Acesso total ao sistema',
    color: 'bg-red-500',
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Gerenciamento de equipes',
    color: 'bg-blue-500',
  },
  {
    id: 'user',
    name: 'User',
    description: 'Usuário padrão',
    color: 'bg-green-500',
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Apenas visualização',
    color: 'bg-gray-500',
  },
  {
    id: 'editor',
    name: 'Editor',
    description: 'Edição de conteúdo',
    color: 'bg-purple-500',
  },
];

export function getIconByName(name: string) {
  return (LucideIcons as any)[name] || LucideIcons.File;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function flattenTree(
  items: MenuItem[],
  parentId?: string,
  depth = 0,
): FlattenedItem[] {
  return items.reduce<FlattenedItem[]>((acc, item, index) => {
    return [
      ...acc,
      { ...item, parentId, depth, index },
      ...flattenTree(item.children, item.id, depth + 1),
    ];
  }, []);
}

export function buildTree(flattenedItems: FlattenedItem[]): MenuItem[] {
  const root: MenuItem[] = [];
  const lookup: { [key: string]: MenuItem } = {};

  // Create lookup table
  flattenedItems.forEach((item) => {
    lookup[item.id] = { ...item, children: [] };
  });

  // Build tree structure
  flattenedItems.forEach((item) => {
    if (item.parentId && lookup[item.parentId]) {
      lookup[item.parentId].children.push(lookup[item.id]);
    } else {
      root.push(lookup[item.id]);
    }
  });

  return root;
}

export function removeChildrenOf(
  items: FlattenedItem[],
  ids: string[],
): FlattenedItem[] {
  const excludeParentIds = [...ids];

  return items.filter((item) => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      if (ids.includes(item.id)) {
        excludeParentIds.push(item.id);
      }
      return false;
    }

    return true;
  });
}

export function getDragDepth(offset: number, indentationWidth: number) {
  return Math.round(offset / indentationWidth);
}

export function getMaxDepth({ previousItem }: { previousItem: FlattenedItem }) {
  if (previousItem) {
    return previousItem.depth + 1;
  }

  return 0;
}

export function getMinDepth({ nextItem }: { nextItem: FlattenedItem }) {
  if (nextItem) {
    return nextItem.depth;
  }

  return 0;
}
