//import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import {
  decodeString,
  encodeString,
  encodingOptions,
  sanitizeString,
  type Format,
} from './utils';
import SwapDivider from './components/SwapDivider';
import TextSelectorContainer from './components/TextSelectorContainer';
import Header from './components/Header';

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
        <Header
          title={'Unicomute'}
          description={'A real-time string encoder.'}
        />
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
          <TextSelectorContainer<Format>
            label={'Source'}
            options={encodingOptions.map((o) => ({
              ...o,
              options: o.options.filter((opt) => opt.value !== 'slug'),
            }))}
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
            options={encodingOptions.map((o) => ({
              ...o,
              options: o.options.filter((opt) => opt.value !== 'jwt'),
            }))}
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
