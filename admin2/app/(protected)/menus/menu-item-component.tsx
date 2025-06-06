'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Check,
  ChevronDown,
  ChevronRight,
  Edit3,
  GripVertical,
  Plus,
  Shield,
  Trash2,
  X,
} from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { AVAILABLE_ROLES } from '../users/data';
import { FlattenedItem } from './types';
import { AVAILABLE_ICONS, getIconByName } from './utils';

interface MenuItemProps {
  item: FlattenedItem;
  isCollapsed?: boolean;
  onToggle?: (id: string) => void;
  onEdit?: (id: string, updates: Partial<FlattenedItem>) => void;
  onDelete?: (id: string) => void;
  onAddChild?: (parentId: string) => void;
  isDragging?: boolean;
  style?: React.CSSProperties;
}

export function MenuItemComponent({
  item,
  isCollapsed,
  onToggle,
  onEdit,
  onDelete,
  onAddChild,
  isDragging,
  style,
}: MenuItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: item.title,
    icon: item.icon,
    url: item.url,
    roles: item.roles,
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: item.id });

  const transformStyle = {
    ...style,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Icon = getIconByName(item.icon);
  const hasChildren = item.children.length > 0;

  const handleSave = () => {
    onEdit?.(item.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: item.title,
      icon: item.icon,
      url: item.url,
      roles: item.roles,
    });
    setIsEditing(false);
  };

  const handleRoleToggle = (roleId: string, checked: boolean) => {
    setEditData((prev) => ({
      ...prev,
      roles: checked
        ? [...prev.roles, roleId]
        : prev.roles.filter((r) => r !== roleId),
    }));
  };

  return (
    <div
      ref={setNodeRef}
      style={transformStyle}
      className={cn(
        'group relative',
        isDragging || isSortableDragging ? 'opacity-50' : '',
      )}
    >
      <div
        className={cn(
          'flex items-center gap-2 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors',
          isEditing ? 'ring-2 ring-primary' : '',
        )}
        style={{ paddingLeft: `${item.depth * 24 + 12}px` }}
      >
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-accent rounded"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>

        {/* Collapse/Expand Button */}
        {hasChildren ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onToggle?.(item.id)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        ) : (
          <div className="w-6" />
        )}

        {/* Icon */}
        {isEditing ? (
          <Select
            value={editData.icon}
            onValueChange={(value) =>
              setEditData((prev) => ({ ...prev, icon: value }))
            }
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {AVAILABLE_ICONS.map((iconName) => {
                const IconComponent = getIconByName(iconName);
                return (
                  <SelectItem key={iconName} value={iconName}>
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4" />
                      <span className="text-xs">{iconName}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        ) : (
          <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        )}

        {/* Title */}
        <div className="flex-1 min-w-20">
          {isEditing ? (
            <Input
              value={editData.title}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="h-8"
              placeholder="Título do menu"
            />
          ) : (
            <span className="font-medium truncate">{item.title}</span>
          )}
        </div>

        {/* URL */}
        <div className="min-w-20">
          {isEditing ? (
            <Input
              value={editData.url}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, url: e.target.value }))
              }
              className="h-8"
              placeholder="/caminho/da/url"
            />
          ) : (
            <span className="text-sm text-muted-foreground truncate">
              {item.url}
            </span>
          )}
        </div>

        {/* Roles */}
        <div className="flex items-center gap-1">
          {isEditing ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <Shield className="h-4 w-4 mr-1" />
                  Roles ({editData.roles.length})
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-3">
                  <h4 className="font-medium">Permissões de Acesso</h4>
                  <div className="space-y-2">
                    {AVAILABLE_ROLES.map((role) => (
                      <div
                        key={role.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={role.id}
                          checked={editData.roles.includes(role.id)}
                          onCheckedChange={(checked) =>
                            handleRoleToggle(role.id, checked as boolean)
                          }
                        />
                        <div className="flex items-center gap-2 flex-1">
                          <div
                            className={cn('w-3 h-3 rounded-full', role.color)}
                          />
                          <label
                            htmlFor={role.id}
                            className="text-sm font-medium"
                          >
                            {role.name}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              {item.roles.slice(0, 2).map((roleId) => {
                const role = AVAILABLE_ROLES.find((r) => r.id === roleId);
                return role ? (
                  <Badge key={roleId} variant="secondary" className="text-xs">
                    <div
                      className={cn('w-2 h-2 rounded-full mr-1', role.color)}
                    />
                    {role.name}
                  </Badge>
                ) : null;
              })}
              {item.roles.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{item.roles.length - 2}
                </Badge>
              )}
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {isEditing ? (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleSave}
                className="h-8 w-8 p-0"
              >
                <Check className="h-4 w-4 text-green-600" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCancel}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4 text-red-600" />
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onAddChild?.(item.id)}
                className="h-8 w-8 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 p-0"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete?.(item.id)}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
