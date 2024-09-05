import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function objectToString(obj: any) {
  return obj
    ? 'name' in obj
      ? obj.name
      : 'title' in obj
        ? obj.title
        : 'email' in obj
          ? obj.email
          : JSON.stringify(obj, null, 2)
    : String(obj)
}
