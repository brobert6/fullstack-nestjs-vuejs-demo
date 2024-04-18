import { en, ro } from '@formkit/i18n'
import { defaultConfig } from '@formkit/vue'
import { rootClasses } from './formkit.theme'
import { generateClasses } from '@formkit/themes'
import autocomplete from '@/components/FormKit/AutoCompleteInput'

export default defaultConfig({
  inputs: {
    myAutocomplete: autocomplete
  },
  config: {
    rootClasses,
    classes: generateClasses({
      myAutocomplete: {
        inner: 'relative',
        dropdown:
          'absolute top-full left-0 min-w-[15em] bg-white shadow-md m-0 p-0 list-none overflow-hidden rounded-md',
        dropdownItem: 'p-2 border-b border-gray-200 data-[selected=true]:bg-blue-100',
        input: 'w-full !p-[0.55em]',
        value:
          'flex items-center justify-between w-full p-[0.55em] after:content-["×"] after:first-letter:ml-[0.5em] after:text-[1.1em'
      }
    })
  },
  locales: { en, ro },
  locale: 'en'
})
