export interface FieldSchema {
  $formkit: string
  name: string
  value: string
  label: string
  validation: string
}

export interface FieldValues {
  [key: string]: string | number | boolean
}

export type ID = string | number

export interface City {
  id: ID
  name: string
  description: string
  active: boolean
}
