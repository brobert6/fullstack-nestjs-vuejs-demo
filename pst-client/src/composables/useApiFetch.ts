import type { Ref } from 'vue'
import { reportError } from '@/util/errorReporting'

export function mapPromiseStatus(
  fetchPromise: Promise<any>,
  isLoading?: Ref<boolean>,
  isDone?: Ref<boolean>,
  error?: Ref<unknown>
): void {
  if (isLoading) isLoading.value = true
  if (error) error.value = undefined
  fetchPromise
    .catch((err) => {
      if (error) error.value = err
      reportError(err)
    })
    .finally(() => {
      if (isDone) isDone.value = true
      if (isLoading) isLoading.value = false
    })
}

export function mapPromiseStatusWithCallbacks(
  fetchPromise: Promise<any>,
  isLoading?: Ref<boolean>,
  onSuccess?: (response: any) => void,
  onError?: (err: unknown) => void
): void {
  if (isLoading) isLoading.value = true
  fetchPromise
    .then((response: any) => {
      if (onSuccess) onSuccess(response)
    })
    .catch((err) => {
      if (onError) onError(err)
    })
    .finally(() => {
      if (isLoading) isLoading.value = false
    })
}
