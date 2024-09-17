import { decode } from 'js-base64';

export const decodeToken = (token: string) => {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Token format invalid');
  }
  return decode(parts[1]);
}