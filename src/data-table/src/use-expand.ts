import { toRef, ref, watch } from 'vue'
import { useMemo, useMergedState } from 'vooks'
import type { DataTableSetupProps } from './DataTable'
import { RowKey } from './interface'
import { call, warn } from '../../_utils'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useExpand (props: DataTableSetupProps) {
  const loadingExpandKeysRef = ref(new Set<number | string>())

  watch(
    toRef(props, 'data'),
    () => {
      loadingExpandKeysRef.value.clear()
    },
    {
      deep: false
    }
  )

  const renderExpandRef = useMemo(() => {
    for (const col of props.columns) {
      if (col.type === 'expand') {
        if (__DEV__ && !col.renderExpand) {
          warn(
            'data-table',
            'column with type `expand` has no `renderExpand` prop.'
          )
        }
        return col.renderExpand
      }
    }
  })
  const uncontrolledExpandedRowKeysRef = ref(props.defaultExpandedRowKeys)
  const controlledExpandedRowKeysRef = toRef(props, 'expandedRowKeys')
  const mergedExpandedRowKeysRef = useMergedState(
    controlledExpandedRowKeysRef,
    uncontrolledExpandedRowKeysRef
  )
  function doUpdateExpandedRowKeys (expandedKeys: RowKey[]): void {
    const {
      onUpdateExpandedRowKeys,
      'onUpdate:expandedRowKeys': _onUpdateExpandedRowKeys
    } = props
    if (onUpdateExpandedRowKeys) {
      call(onUpdateExpandedRowKeys, expandedKeys)
    }
    if (_onUpdateExpandedRowKeys) {
      call(_onUpdateExpandedRowKeys, expandedKeys)
    }
    uncontrolledExpandedRowKeysRef.value = expandedKeys
  }
  // async function triggerExpandLoading (row: any): Promise<void> {
  //   const { onLoad } = props
  //   if (!onLoad) {
  //     if (__DEV__) {
  //       warn(
  //         'tree',
  //         'There is unloaded node in data but props.onLoad is not specified.'
  //       )
  //     }
  //     return await Promise.resolve()
  //   }
  //   const { value: loadingKeys } = loadingKeysRef
  //   return await new Promise((resolve) => {
  //     if (!loadingKeys.has(node.key)) {
  //       loadingKeys.add(node.key)
  //       onLoad(node.rawNode)
  //         .then(() => {
  //           loadingKeys.delete(node.key)
  //           resolve()
  //         })
  //         .catch((loadError) => {
  //           console.error(loadError)
  //           resetDragExpandState()
  //         })
  //     }
  //   })
  // }
  return {
    mergedExpandedRowKeysRef,
    renderExpandRef,
    loadingExpandKeysRef,
    doUpdateExpandedRowKeys
  }
}
