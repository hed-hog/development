import type { UniqueIdentifier } from '@dnd-kit/core';
import { MutableRefObject } from 'react';

export interface TreeItem {
  id: UniqueIdentifier;
  children: TreeItem[];
  collapsed?: boolean;
}

export type TreeItems = TreeItem[];

export interface FlattenedItem extends TreeItem {
  parentId: UniqueIdentifier | null;
  depth: number;
  index: number;
}

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[];
  offset: number;
}>;

export interface MenuItem {
  id: string;
  title: string;
  icon: string;
  url: string;
  roles: string[];
  children: MenuItem[];
  parentId?: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface FlattenedMenuItem extends MenuItem {
  depth: number;
  index: number;
}
