import { useTranslation as i18Translation } from 'next-i18next';

export const useTranslation = () => {
  const { t } = i18Translation();
  const translation = (text: string): string => {
    return t(text.toLocaleLowerCase());
  };
  return { t: translation };
};
