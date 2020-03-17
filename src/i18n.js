import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

export function addTranslations(requireContext) {
  Object.keys(requireContext).forEach(key => {
    const translations = requireContext[key]
    addTranslationResource(key, translations)
  })
}

export function addTranslationResource(lang, translations) {
  i18next.addResourceBundle(lang, 'translation', translations, true, false)
}

export function init() {
  i18next.use(initReactI18next).init({
    resources: {},
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })
}
