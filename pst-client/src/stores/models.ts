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

export interface Filters {
  sort?: string
  search?: string
  status?: string[]
}

export interface WebUiApiListListParams {
  take?: number
  skip?: number
  searchString?: string
  status?: string[]
}
