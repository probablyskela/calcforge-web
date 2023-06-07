import { describe, expect, it, vi } from 'vitest'
import type { Mock } from 'vitest';
import { flushPromises, mount, shallowMount } from '@vue/test-utils';
import type { Calculator } from '@/assets/interfaces/calculator/ICalculator';
import { calculator_service } from '@/assets/services/calculator';
import CalculatorViewVue from '../CalculatorView.vue';

vi.mock('@/stores/auth.store', () => ({
    useAuthStore: vi.fn(() => ({
        get_token: vi.fn(),
        sign_in: vi.fn(),
        sign_up: vi.fn(),
        sign_out: vi.fn(),
        authorized: {
            value: false,
        },
    })),
}));


const calculators: [Calculator] = [{
    author_id: 1,
    code: '1',
    description: '1',
    id: 1,
    input: '1',
    is_public: true,
    name: '1'
}]


describe('CalculatorViewVue', () => {
    it('renders', () => {
        const wrapper = shallowMount(CalculatorViewVue);
    })

    // it('renders calculator info correctly', () => {
    //     const props = {
    //       id: '123'
    //     };
    
    //     const wrapper = mount(CalculatorViewVue, {
    //       props
    //     });
    
    //     // Assert the rendering of calculator info section
    //     expect(wrapper.find('.calculator-wrapper')).toBeTruthy();
    //     // Assert other expectations for the calculator info section
    //     // ...
    
    //     // Assert the rendering of review section
    //     expect(wrapper.find('.review-wrapper')).toBeTruthy();
    //     // Assert other expectations for the review section
    //     // ...
    //   });
})