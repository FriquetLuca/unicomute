import { useTranslation } from 'react-i18next';

export interface SelectOption {
  label: string;
  value?: string | number | readonly string[] | undefined;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

interface SelectProps<T> {
  value?: string | number | readonly string[] | undefined;
  onChange?: ((value: T) => void) | undefined;
  options: (SelectOption | SelectOptionGroup)[];
}

export default function Select<T extends string>({
  value,
  onChange,
  options,
}: SelectProps<T>) {
  const { t } = useTranslation();
  return (
    <select
      value={value}
      onChange={(e) => onChange && onChange(e.target.value as T)}
      className="bg-white border border-slate-200 rounded-md px-2 py-1 text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
    >
      {options.map((item, index) => {
        if ('options' in item) {
          return (
            <optgroup label={t(item.label)} key={`group-${index}`}>
              {item.options.map((opt, optIndex) => (
                <option key={`opt-${index}-${optIndex}`} value={opt.value}>
                  {t(opt.label)}
                </option>
              ))}
            </optgroup>
          );
        }
        return (
          <option key={`opt-${index}`} value={item.value}>
            {t(item.label)}
          </option>
        );
      })}
    </select>
  );
}
