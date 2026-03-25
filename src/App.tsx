//import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import { decodeString, type Format } from './utils';
import { encodeString } from './utils/encodeString';
import { sanitizeString } from './utils/sanitizeString';

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

        {/* Main Interface */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
          {/* Source Panel */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <label className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Source
              </label>
              <select
                value={sourceFormat}
                onChange={(e) => setSourceFormat(e.target.value as Format)}
                className="bg-white border border-slate-200 rounded-md px-2 py-1 text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <optgroup label="Text Encodings">
                  <option value="utf-8">UTF-8 (Standard)</option>
                  <option value="utf-16">UTF-16 (Wide)</option>
                </optgroup>
                <optgroup label="Web / API">
                  <option value="base64">Base64(Standard)</option>
                  <option value="base64url">Base64URL (JWT Safe)</option>
                  <option value="url">URL Encoded</option>
                  <option value="html">HTML Entities</option>
                  <option value="jwt">JWT Payload (JSON)</option>
                </optgroup>
                <optgroup label="Programming">
                  <option value="escape">Escape Sequence (\n)</option>
                  <option value="literal">String Literal (\xHH)</option>
                </optgroup>
                <optgroup label="Low Level">
                  <option value="hex">Hexadecimal</option>
                  <option value="binary">Binary</option>
                  <option value="decimal">Decimal (Integer Array)</option>
                </optgroup>
              </select>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter content here..."
              className="w-full h-80 p-4 font-mono text-sm border border-slate-200 rounded-xl shadow-inner focus:ring-2 focus:ring-indigo-500 outline-none resize-none bg-white"
            />
          </div>

          {/* Swap Button Divider */}
          <button
            onClick={swapFormats}
            className="p-2 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-colors"
            title="Swap Formats"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m16 3 4 4-4 4" />
              <path d="M20 7H4" />
              <path d="m8 21-4-4 4-4" />
              <path d="M4 17h16" />
            </svg>
          </button>

          {/* Target Panel */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <label className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Target
              </label>
              <select
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value as Format)}
                className="bg-white border border-slate-200 rounded-md px-2 py-1 text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <optgroup label="Text Encodings">
                  <option value="utf-8">UTF-8 (Standard)</option>
                  <option value="utf-16">UTF-16 (Wide)</option>
                </optgroup>
                <optgroup label="Web / API">
                  <option value="base64">Base64(Standard)</option>
                  <option value="base64url">Base64URL (JWT Safe)</option>
                  <option value="url">URL Encoded</option>
                  <option value="html">HTML Entities</option>
                  <option value="slug">URL Slug</option>
                </optgroup>
                <optgroup label="Programming">
                  <option value="escape">Escape Sequence (\n)</option>
                  <option value="literal">String Literal (\xHH)</option>
                </optgroup>
                <optgroup label="Low Level">
                  <option value="hex">Hexadecimal</option>
                  <option value="binary">Binary</option>
                  <option value="decimal">Decimal (Integer Array)</option>
                </optgroup>
              </select>
            </div>
            <div className="w-full h-80 p-4 font-mono text-sm border border-slate-200 rounded-xl bg-slate-100 overflow-auto break-all whitespace-pre-wrap select-all">
              {output || (
                <span className="text-slate-400 italic">
                  Waiting for input...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
