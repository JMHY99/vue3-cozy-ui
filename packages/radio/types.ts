import type { InjectionKey } from 'vue'
import type { ComputedRef } from 'vue'

export interface RadioGroupContext {
  name: string
  modelValue: {
    value: string | number | boolean
  }
  disabled: ComputedRef<boolean>
  size: ComputedRef<string>
}

export const radioGroupKey = Symbol() as InjectionKey<RadioGroupContext>
