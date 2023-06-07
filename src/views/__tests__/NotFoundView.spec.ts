import { describe, expect, it, vi } from 'vitest'
import type { Mock } from 'vitest';
import { flushPromises, mount, shallowMount } from '@vue/test-utils';
import type { Calculator } from '@/assets/interfaces/calculator/ICalculator';
import { calculator_service } from '@/assets/services/calculator';
import NotFoundViewVue from '../NotFoundView.vue';

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


describe('NotFoundViewVue', () => {
    it('renders', () => {
        const wrapper = shallowMount(NotFoundViewVue);
    })
})