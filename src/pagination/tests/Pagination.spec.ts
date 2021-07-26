import { mount } from '@vue/test-utils'
import { NPagination } from '../index'
import { RenderItem } from '../src/interface'
import { h } from 'vue'

describe('n-pagination', () => {
  it('should work with import on demand', () => {
    mount(NPagination)
  })
  it('props.itemCount', async () => {
    const wrapper = mount(NPagination, {
      props: {
        itemCount: 1,
        pageSize: 10
      }
    })
    expect(wrapper.findAll('.n-pagination-item').length).toEqual(3)
    await wrapper.setProps({
      itemCount: 11
    })
    expect(wrapper.findAll('.n-pagination-item').length).toEqual(4)
  })
  it('props.itemRender', async () => {
    const itemRender: RenderItem = (page, type, originalElement) => {
      if (page) {
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
              default: () => [originalElement]
            }
          )
        }
      }
    }
    const wrapper = mount(NPagination, {
      props: {
        page: 1,
        pageSize: 10,
        itemRender
      }
    })
    expect(
      wrapper.find('.n-pagination-item').text().includes('Previous')
    ).toEqual(true)
    wrapper.unmount()
  })
})
