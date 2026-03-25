import type { Format } from '.';

export function decodeString(
  input: string,
  format: Format
): Uint8Array<ArrayBuffer> {
  switch (format) {
    case 'hex': {
      const cleanHex = input.replace(/[^0-9a-fA-F]/g, '');
      const hexMatch = cleanHex.match(/.{1,2}/g);
      return new Uint8Array(
        hexMatch ? hexMatch.map((b) => parseInt(b, 16)) : []
      );
    }
    case 'binary': {
      const cleanBin = input.replace(/[^01]/g, '');
      const binMatch = cleanBin.match(/.{1,8}/g);
      return new Uint8Array(
        binMatch ? binMatch.map((b) => parseInt(b, 2)) : []
      );
    }
    case 'literal': {
      const hexFromLiteral = input.replace(/\\x|\\u/g, '');
      const litMatch = hexFromLiteral.match(/.{1,2}/g);
      return new Uint8Array(
        litMatch ? litMatch.map((b) => parseInt(b, 16)) : []
      );
    }
    case 'escape': {
      try {
        const validJson = `"${input.replace(/"/g, '\\"')}"`;
        const unescaped = JSON.parse(validJson);
        return new TextEncoder().encode(unescaped);
      } catch {
        return new TextEncoder().encode(input);
      }
    }
    case 'base64': {
      try {
        const binString = atob(input);
        return Uint8Array.from(binString, (m) => m.codePointAt(0)!);
      } catch {
        return new Uint8Array();
      }
    }
    case 'url': {
      try {
        const decodedText = decodeURIComponent(input);
        return new TextEncoder().encode(decodedText);
      } catch {
        return new TextEncoder().encode(input);
      }
    }
    case 'html': {
      const doc = new Uint8Array(
        new DOMParser()
          .parseFromString(input, 'text/html')
          .documentElement.textContent!.split('')
          .map((c) => c.charCodeAt(0))
      );
      return new TextEncoder().encode(new TextDecoder().decode(doc));
    }
    case 'decimal': {
      const numbers = input.match(/\d+/g);
      if (numbers) {
        return new Uint8Array(numbers.map((n) => parseInt(n, 10) % 256));
      } else {
        return new Uint8Array();
      }
    }
    case 'base64url': {
      try {
        let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
        const pad = base64.length % 4;
        if (pad) base64 += '='.repeat(4 - pad);
        const binString = atob(base64);
        return Uint8Array.from(binString, (m) => m.codePointAt(0)!);
      } catch {
        return new Uint8Array();
      }
    }
    case 'utf-16': {
      const uint16 = new Uint16Array(input.length);
      for (let i = 0; i < input.length; i++) {
        uint16[i] = input.charCodeAt(i);
      }
      return new Uint8Array(uint16.buffer);
    }
    case 'jwt': {
      try {
        const parts = input.split('.');
        const payloadPart = parts.length === 3 ? parts[1] : parts[0];
        let base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
        const pad = base64.length % 4;
        if (pad) base64 += '='.repeat(4 - pad);
        const binString = atob(base64);
        return Uint8Array.from(binString, (m) => m.codePointAt(0)!);
      } catch {
        return new TextEncoder().encode(input);
      }
    }
    case 'slug':
    default: {
      const encoder = new TextEncoder();
      return encoder.encode(input);
    }
  }
}
