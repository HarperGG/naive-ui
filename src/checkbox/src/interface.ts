import { VNode, VNodeChild } from 'vue'

export interface CheckboxGroupOption<V = string | number, L = string> {
  value: V
  label: L
  indeterminate?: boolean
  disabled?: boolean
  render?: (info: { node: VNode, option: CheckboxGroupOption<V> }) => VNodeChild
}
