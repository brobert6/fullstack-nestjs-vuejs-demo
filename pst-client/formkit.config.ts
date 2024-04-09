import { en, ro } from '@formkit/i18n'
import { defaultConfig } from '@formkit/vue'
import { rootClasses } from './formkit.theme'

export default defaultConfig({
  config: {
    rootClasses
  },
  locales: { en, ro },
  locale: 'en'
})
