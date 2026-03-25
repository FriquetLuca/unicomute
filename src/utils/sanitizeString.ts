import type { Format } from '.';

export function sanitizeString(input: string, format: Format) {
  switch (format) {
    case 'hex':
      return input.replace(/0x|\\x|[_\s,[\]{}]/g, '');
    case 'base64':
    case 'base64url':
      return input.replace(/\s/g, '');
    case 'binary':
      return input.replace(/0b|[_\s,]/g, '');
    case 'decimal':
      return input.replace(/[^\d,]/g, '');
    default:
      return input;
  }
}
