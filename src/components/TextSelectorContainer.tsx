import type { SelectOption, SelectOptionGroup } from './Select';
import Select from './Select';

interface TextContainerProps<T> {
  label: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: ((value: T) => void) | undefined;
  options: (SelectOption | SelectOptionGroup)[];
  children: React.ReactNode;
}

export default function TextSelectorContainer<T extends string>({
  label,
  value,
  onChange,
  options,
  children,
}: TextContainerProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <label className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </label>
        <Select<T> value={value} onChange={onChange} options={options} />
      </div>
      {children}
    </div>
  );
}
