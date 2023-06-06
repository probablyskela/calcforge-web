import { describe, expect, it, vi } from 'vitest'
import { flushPromises, mount, shallowMount } from '@vue/test-utils';
import CalculatorsViewVue from '../CalculatorsView.vue';
import type { Calculator } from '@/assets/interfaces/calculator/ICalculator';


// vi.mock('@/stores/auth.store');
// vi.mock('axios');
// // vi.mock('../../services/main');

// vi.mock('../../services/calculator', async () => {
//     return {
//         calculator_service: {
//             get_calculators: vi.fn().mockResolvedValue([{
//                 author_id: 1,
//                 code: '1',
//                 description: '1',
//                 id: 1,
//                 input: '1',
//                 is_public: true,
//                 name: '1'
//             }])
//         }
//     }
// });
// describe('CalculatorsViewVue', () => {
//     it('renders properly', async () => {
//         const wrapper = shallowMount(CalculatorsViewVue);
//     })

//     it('renders calculators properly', async () => {
//         const wrapper = shallowMount(CalculatorsViewVue);
//     })
// })