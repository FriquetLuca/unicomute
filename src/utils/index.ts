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
    label: 'encoding_options.text_encoding.title',
    options: [
      {
        label: 'encoding_options.text_encoding.utf8',
        value: 'utf-8',
      },
      {
        label: 'encoding_options.text_encoding.utf16',
        value: 'utf-16',
      },
    ],
  },
  {
    label: 'encoding_options.web_api.title',
    options: [
      {
        label: 'encoding_options.web_api.base64',
        value: 'base64',
      },
      {
        label: 'encoding_options.web_api.base64url',
        value: 'base64url',
      },
      {
        label: 'encoding_options.web_api.url',
        value: 'url',
      },
      {
        label: 'encoding_options.web_api.html',
        value: 'html',
      },
      {
        label: 'encoding_options.web_api.jwt',
        value: 'jwt',
      },
      {
        label: 'encoding_options.web_api.slug',
        value: 'slug',
      },
    ],
  },
  {
    label: 'encoding_options.programming.title',
    options: [
      {
        label: 'encoding_options.programming.escape',
        value: 'escape',
      },
      {
        label: 'encoding_options.programming.literal',
        value: 'literal',
      },
    ],
  },
  {
    label: 'encoding_options.low_level.title',
    options: [
      {
        label: 'encoding_options.low_level.hex',
        value: 'hex',
      },
      {
        label: 'encoding_options.low_level.bin',
        value: 'binary',
      },
      {
        label: 'encoding_options.low_level.dec',
        value: 'decimal',
      },
    ],
  },
];

export * from './decodeString';
export * from './encodeString';
export * from './sanitizeString';
