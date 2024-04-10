import type { FieldSchema } from '@/stores/models'

export function generateSchema<T>(dto: T): FieldSchema[] {
  const schema: FieldSchema[] = []

  for (const prop in dto) {
    if (prop === 'id') continue

    const validationRules = ['required']
    if (prop === 'email') {
      validationRules.push('email')
    }

    let fieldType: string
    switch (typeof dto[prop]) {
      case 'string':
        fieldType = 'text'
        break
      case 'number':
        fieldType = 'number'
        break
      case 'boolean':
        fieldType = 'checkbox'
        break
      // Add more cases if needed for other types
      default:
        fieldType = 'text'
    }

    schema.push({
      $formkit: fieldType,
      name: prop,
      label: prop.charAt(0).toUpperCase() + prop.slice(1),
      validation: validationRules.join('|'),
      value: `$${prop}`
    })
  }

  return schema
}
