import { h, defineComponent, PropType } from 'vue'
import { ChevronRightIcon } from '../../../_internal/icons'
import { NIconSwitchTransition, NBaseLoading, NBaseIcon } from '../../../_internal'

export default defineComponent({
  name: 'DataTableExpandTrigger',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    expanded: Boolean,
    loading: Boolean,
    onClick: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  render () {
    return (
      <NIconSwitchTransition>
        {{
          default: () => {
            if (this.loading) {
              return (
                <NBaseLoading
                  clsPrefix={this.clsPrefix}
                  key="loading"
                  radius={85}
                  strokeWidth={20}
                />
              )
            }
            return (
             <NBaseIcon
              class={`${this.clsPrefix}-data-table-expand-trigger`}
              clsPrefix={this.clsPrefix}
              onClick={this.onClick}
            >
              {{
                default: () => {
                  return (
                    <ChevronRightIcon
                      style={this.expanded ? 'transform: rotate(90deg);' : undefined}
                    />
                  )
                }
              }}
            </NBaseIcon>
            )
          }
        }}
      </NIconSwitchTransition>

    )
  }
})
