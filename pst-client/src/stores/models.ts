import type { SortType } from 'vue3-easy-data-table'

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
  sortBy?: string | string[]
  sortType?: SortType | SortType[]
  search?: string
  status?: string[]
  rowsPerPage: number
  page: number
}

export interface WebUiApiListListParams {
  page?: number
  limit?: number
  searchString?: string
  //status?: string[]
}

export interface ListStructureSortEntity {
  title: string
  dir: string
}
