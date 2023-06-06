import { describe, expect, it } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils';
import HomeViewVue from '../HomeView.vue';

describe('HomeViewVue', () => {
    it('renders properly', () => {
        const wrapper = shallowMount(HomeViewVue);
        expect(wrapper.find('h1').text()).toContain('unlimited power of calculators');
        expect(wrapper.find('p').text()).toContain('no registration needed to start!');

    })
})