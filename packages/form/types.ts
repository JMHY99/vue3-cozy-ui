import type { Ref } from 'vue'

export interface FormProps {
  model: Record<string, any>
  rules?: Record<string, any>
  labelPosition?: 'right' | 'left' | 'top'
  labelWidth?: string | number
  labelSuffix?: string
  inline?: boolean
  inlineMessage?: boolean
  statusIcon?: boolean
  showMessage?: boolean
  size?: 'large' | 'default' | 'small'
  disabled?: boolean
  validateOnRuleChange?: boolean
  hideRequiredAsterisk?: boolean
  scrollToError?: boolean
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions
  validateTrigger?: string | string[]
  labelWrap?: boolean
  requireAsteriskPosition?: 'left' | 'right'
  validateMessages?: Record<string, string>
}

export interface FormItemProps {
  label?: string
  labelWidth?: string | number
  prop?: string
  required?: boolean
  rules?: any[]
  error?: string
  validateStatus?: '' | 'error' | 'validating' | 'success'
  for?: string
  inlineMessage?: boolean
  showMessage?: boolean
  size?: string
  validateTrigger?: string | string[]
  labelSuffix?: string
  tooltip?: string
  contentPosition?: 'left' | 'center' | 'right'
  validateDebounce?: number
}

export interface FormItemContext {
  prop: string
  validate: (trigger: string, callback?: Function) => Promise<boolean>
  resetField: () => void
  clearValidate: () => void
  formItemRef: Ref<HTMLElement | null>
}

export interface FormContext {
  model?: Record<string, any>
  rules?: Record<string, any>
  labelPosition?: 'right' | 'left' | 'top'
  labelWidth?: string | number
  labelSuffix?: string
  inline?: boolean
  inlineMessage?: boolean
  statusIcon?: boolean
  showMessage?: boolean
  size?: string
  disabled?: boolean
  validateOnRuleChange?: boolean
  validateTrigger?: string | string[]
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
  resetFields: () => void
  clearValidate: (props?: string | string[]) => void
  validate: (callback?: FormValidateCallback) => Promise<boolean>
  validateField: (props: string | string[], callback?: Function) => Promise<void>
}

export interface FormValidateFailure {
  errors: string[] | null
  fields: Record<string, string[]>
}

export type FormValidateCallback = (
  isValid: boolean,
  invalidFields?: FormValidateFailure
) => void

export interface FormRules {
  required?: boolean
  message?: string
  trigger?: string | string[]
  min?: number
  max?: number
  length?: number
  pattern?: RegExp
  validator?: (rule: any, value: any, callback: Function) => void
  whitespace?: boolean
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'date' | 'url' | 'email'
} 