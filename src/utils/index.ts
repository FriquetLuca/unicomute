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

export const encodingOptions = [
  {
    label: 'Text Encodings',
    options: [
      {
        label: 'UTF-8 (Standard)',
        value: 'utf-8',
      },
      {
        label: 'UTF-16 (Wide)',
        value: 'utf-16',
      },
    ],
  },
  {
    label: 'Web / API',
    options: [
      {
        label: 'Base64(Standard)',
        value: 'base64',
      },
      {
        label: 'Base64URL (JWT Safe)',
        value: 'base64url',
      },
      {
        label: 'URL Encoded',
        value: 'url',
      },
      {
        label: 'HTML Entities',
        value: 'html',
      },
      {
        label: 'JWT Payload (JSON)',
        value: 'jwt',
      },
      {
        label: 'URL Slug',
        value: 'slug',
      },
    ],
  },
  {
    label: 'Programming',
    options: [
      {
        label: 'Escape Sequence (\n)',
        value: 'escape',
      },
      {
        label: 'String Literal (\\xHH)',
        value: 'literal',
      },
    ],
  },
  {
    label: 'Low Level',
    options: [
      {
        label: 'Hexadecimal',
        value: 'hex',
      },
      {
        label: 'Binary',
        value: 'binary',
      },
      {
        label: 'Decimal (Integer Array)',
        value: 'decimal',
      },
    ],
  },
];

export * from './decodeString';
export * from './encodeString';
export * from './sanitizeString';
