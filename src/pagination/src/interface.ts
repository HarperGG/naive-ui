import { VNode } from 'vue'

export type RenderPrefix = (info: {
  startIndex: number
  endIndex: number
  page: number
  pageSize: number
  pageCount: number
}) => VNode

// export type RenderFastPrev = (
//   page: number
//   pageSize: number
//   pageCount: number
//   originalElement: VNode
// ) => VNodeChild

export type RenderSuffix = RenderPrefix
// export type RenderFastNext = RenderFastPrev
