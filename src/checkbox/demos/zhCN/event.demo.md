# 事件

```html
<n-space item-style="display: flex;" vertical>
  <n-checkbox
    :checked="checked"
    @update:checked="handleCheckedChange"
    label="事件"
  />
  <n-checkbox-group
    :defaultValue="defaultValueTest"
    :value="cities"
    @update:value="handleUpdateValue"
  >
    <n-space item-style="display: flex;" align="center">
      <n-checkbox value="Beijing" label="北京" />
      <n-checkbox value="Shanghai" label="上海" />
      <n-checkbox value="Guangzhou" label="广州" />
      <n-checkbox value="Shenzen" label="深圳" />
    </n-space>
  </n-checkbox-group>
  <n-checkbox-group
    :options="options"
    :value="cities"
    @update:value="handleUpdateValue"
  >
  </n-checkbox-group>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const options = [
      { label: 'Apple', value: 'Apple', indeterminate: true },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' }
    ]
    const checkedRef = ref(false)
    const citiesRef = ref(null)
    const message = useMessage()
    return {
      options,
      checked: checkedRef,
      cities: citiesRef,
      defaultValueTest () {
        return ['Beijing']
      },
      handleCheckedChange (checked) {
        checkedRef.value = checked
        message.info(JSON.stringify(checked))
      },
      handleUpdateValue (value) {
        citiesRef.value = value
        message.info(JSON.stringify(value))
      }
    }
  }
})
```
