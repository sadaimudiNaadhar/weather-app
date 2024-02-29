import { shallowMount, mount } from '@vue/test-utils'
import HeaderComponent from '@/components/Header.vue'
import HomeView from '@/views/HomeView.vue'
import TimeFilter from '@/components/TimeFilter.vue'
import VSelect from 'vue-select'
import { weatherApiResponse } from '@/MockResponse'

describe('HomeView.vue', () => {
  it('renders HeaderComponent', () => {
    const wrapper = shallowMount(HomeView)
    expect(wrapper.findComponent(HeaderComponent).exists()).toBe(true)
  })

  it('renders v-select with correct placeholder', () => {
    const wrapper = shallowMount(HomeView)
    expect(wrapper.findComponent(VSelect).props().placeholder).toBe('Select Weather Station')
  })

  it('renders content-empty div when apiData is null or no weather station is selected', async () => {
    const wrapper = shallowMount(HomeView)
    await wrapper.setData({ apiData: null, selectedWeatherStation: null })
    expect(wrapper.find('.content-empty').exists()).toBe(true)
  })

  it('does not render content-empty div when apiData is not null and a weather station is selected', async () => {
    const wrapper = shallowMount(HomeView)
    await wrapper.setData({ apiData: {}, selectedWeatherStation: {} })
    expect(wrapper.find('.content-empty').exists()).toBe(false)
  })

  it('updates selectedWeatherStation when an option is selected in v-select', async () => {
    const wrapper = mount(HomeView)
    const vSelect = wrapper.findComponent(VSelect)
    await vSelect.setValue('P1');
    expect(wrapper.vm.selectedWeatherStation).toEqual('P1')
  })

  // it('renders TimeFilter component', () => {
  //   const wrapper = mount(HomeView)
  //   wrapper.vm. = weatherApiResponse
  //   expect(wrapper.findComponent(TimeFilter).exists()).toBe(true)
  // })
})