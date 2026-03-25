import type { Format } from '.';

export function encodeString(
  bytes: Uint8Array<ArrayBufferLike>,
  format: Format
): string {
  switch (format) {
    case 'binary':
      return Array.from(bytes)
        .map((b) => b.toString(2).padStart(8, '0'))
        .join('');
    case 'hex':
      return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, '0').toUpperCase())
        .join('');
    case 'literal':
      return Array.from(bytes)
        .map((b) => `\\x${b.toString(16).padStart(2, '0')}`)
        .join('');
    case 'escape': {
      const decoder = new TextDecoder('utf-8');
      const input = decoder.decode(bytes);
      const escaped = JSON.stringify(input);
      return escaped.substring(1, escaped.length - 1);
    }
    case 'base64': {
      const binString = Array.from(bytes, (byte) =>
        String.fromCodePoint(byte)
      ).join('');
      return btoa(binString);
    }
    case 'url': {
      const plainText = new TextDecoder().decode(bytes);
      return encodeURIComponent(plainText);
    }
    case 'html': {
      const text = new TextDecoder().decode(bytes);
      return text
        .split('')
        .map((char) => {
          const code = char.charCodeAt(0);
          if (
            (code >= 48 && code <= 57) ||
            (code >= 65 && code <= 90) ||
            (code >= 97 && code <= 122)
          ) {
            return char;
          }
          return `&#${code};`;
        })
        .join('');
    }
    case 'decimal': {
      return Array.from(bytes).join(',');
    }
    case 'base64url': {
      const standardBase64 = btoa(
        Array.from(bytes, (byte) => String.fromCodePoint(byte)).join('')
      );
      return standardBase64
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }
    case 'utf-16': {
      const view = new Uint16Array(
        bytes.buffer,
        bytes.byteOffset,
        bytes.byteLength / 2
      );
      return String.fromCharCode(...view);
    }
    case 'slug': {
      const textForSlug = new TextDecoder().decode(bytes);
      return textForSlug
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    case 'jwt':
    default: {
      const decoder = new TextDecoder('utf-8');
      return decoder.decode(bytes);
    }
  }
}
