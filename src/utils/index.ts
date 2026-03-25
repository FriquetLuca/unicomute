export type Format =
  | 'utf-8'
  | 'binary'
  | 'hex'
  | 'literal'
  | 'escape'
  | 'base64'
  | 'url'
  | 'decimal'
  | 'html'
  | 'utf-16'
  | 'slug'
  | 'jwt'
  | 'base64url';
export * from './decodeString';
export * from './encodeString';
