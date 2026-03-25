interface SwapDividerProps {
  swapFormats: () => void;
}

export default function SwapDivider({ swapFormats }: SwapDividerProps) {
  return (
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
  );
}
