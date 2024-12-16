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
  size?: string
  disabled?: boolean
  validateOnRuleChange?: boolean
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
}

export interface FormItemContext {
  prop: string
  validate: (trigger: string, callback?: Function) => Promise<boolean>
  resetField: () => void
  clearValidate: () => void
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
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
  resetFields: () => void
  clearValidate: (props?: string | string[]) => void
  validate: (callback?: FormValidateCallback) => Promise<boolean>
  validateField: (props: string | string[], callback?: Function) => Promise<void>
}

export type FormValidateCallback = (isValid: boolean, invalidFields?: any) => void 