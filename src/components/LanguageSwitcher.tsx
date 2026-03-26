import { useTranslation } from 'react-i18next';
import Select from './Select';

type Language = 'en' | 'fr';

const langOptions = [
  { label: 'english', value: 'en' },
  { label: 'french', value: 'fr' },
];

const acceptedLanguage = langOptions.map((l) => l.value);

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const toggleLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="flex justify-between items-center gap-2 mb-6">
      <h1 className="text-xl font-bold text-slate-800">
        {t('languages.language')}
      </h1>
      <Select<Language>
        value={acceptedLanguage.includes(i18n.language) ? i18n.language : 'en'}
        options={langOptions.map((l) => ({
          ...l,
          label: `languages.${t(l.label)}`,
        }))}
        onChange={(val) => toggleLanguage(val)}
      />
    </div>
  );
}
