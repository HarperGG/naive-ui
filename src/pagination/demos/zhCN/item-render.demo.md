# 自定义上一步和下一步

```html
<n-pagination
  v-model:page="page"
  v-model:page-size="pageSize"
  :item-render="itemRender"
  :page-count="100"
/>
```

```js
import { defineComponent, ref, h } from 'vue'

export default defineComponent({
  setup () {
    const page = ref(2)
    const pageSize = ref(20)
    const itemRender = (page, type, originalElement) => {
      if (type === 'prev') {
        return h(
          'dev',
          {
            style: {
              verticalAlign: 'middle'
            }
          },
          {
            default: () => ['Previous']
          }
        )
      } else if (type === 'next') {
        return h(
          'div',
          {
            style: {
              verticalAlign: 'middle'
            }
          },
          {
            default: () => ['Next']
          }
        )
      }
    }
    return {
      page,
      pageSize,
      itemRender
    }
  }
})
```
