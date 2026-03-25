//import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import { decodeString, type Format } from './utils';
import { encodeString } from './utils/encodeString';
import { sanitizeString } from './utils/sanitizeString';
import SwapDivider from './components/SwapDivider';
import TextSelectorContainer from './components/TextSelectorContainer';

export default function App() {
  const [sourceFormat, setSourceFormat] = useState<Format>('utf-8');
  const [targetFormat, setTargetFormat] = useState<Format>('hex');
  const [input, setInput] = useState<string>('');

  const swapFormats = () => {
    const bytes: Uint8Array = decodeString(
      sanitizeString(input, sourceFormat),
      sourceFormat
    );
    const newSrc = encodeString(bytes, targetFormat);
    setSourceFormat(targetFormat);
    setTargetFormat(sourceFormat);
    setInput(newSrc);
  };

  const output = useMemo(() => {
    try {
      if (!input) return '';
      const bytes: Uint8Array = decodeString(
        sanitizeString(input, sourceFormat),
        sourceFormat
      );
      return encodeString(bytes, targetFormat);
    } catch {
      return '⚠️ Encoding error: Check your input format.';
    }
  }, [input, sourceFormat, targetFormat]);

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-indigo-600">
              Unicomute
            </h1>
            <p className="text-slate-500">
              The minimalist text-to-byte inspector.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
          <TextSelectorContainer<Format>
            label={'Source'}
            options={[
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
            ]}
            value={sourceFormat}
            onChange={setSourceFormat}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter content here..."
              className="w-full h-80 p-4 font-mono text-sm border border-slate-200 rounded-xl shadow-inner focus:ring-2 focus:ring-indigo-500 outline-none resize-none bg-white"
            />
          </TextSelectorContainer>
          <SwapDivider {...{ swapFormats }} />
          <TextSelectorContainer<Format>
            label={'Target'}
            options={[
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
            ]}
            value={targetFormat}
            onChange={setTargetFormat}
          >
            <div className="w-full h-80 p-4 font-mono text-sm border border-slate-200 rounded-xl bg-slate-100 overflow-auto break-all whitespace-pre-wrap select-all">
              {output || (
                <span className="text-slate-400 italic">
                  Waiting for input...
                </span>
              )}
            </div>
          </TextSelectorContainer>
        </div>
      </div>
    </div>
  );
}
