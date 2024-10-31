import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function objectToString(obj: any) {
  const options = ['name', 'title', 'email', 'username', 'id']

  if (obj) {
    for (const option of options) {
      if (option in obj) {
        return obj[option]
      }
    }
    return JSON.stringify(obj, null, 2)
  }

  return String(obj)
}

export function isPlural(count: number, singular = '', plural = 's') {
  return count === 1 ? singular : plural
}
