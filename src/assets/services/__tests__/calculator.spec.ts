import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';
import { flushPromises, mount, shallowMount } from '@vue/test-utils';
import { calculator_service } from '../calculator';
import type { Calculator } from '@/assets/interfaces/calculator/ICalculator';
// import { beforeEach } from 'node:test';
import axios, { AxiosError } from 'axios';


vi.mock('@/stores/auth.store');
vi.mock('axios');
vi.mock('@/router');

const calculators: [Calculator] = [{
    author_id: 1,
    code: '1',
    description: '1',
    id: 1,
    input: '1',
    is_public: true,
    name: '1'
}];

const calculator: Calculator = {
    author_id: 1,
    code: '1',
    description: '1',
    id: 1,
    input: '1',
    is_public: true,
    name: '1'
};

// vi.mock('../../services/calculator', async () => {
//     const actual = await vi.importActual("../../services/calculator")
//     return {
//         calculator_service: {
//             get_calculators: vi.fn()
//         }
//     }
// });

describe('calculator service tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('get_calculators', async () => {
        const response = { data: calculators };
        (axios.get as Mock).mockResolvedValue(response);

        const result = await calculator_service.get_calculators();

        expect(result).toBe(response.data);
    })

    it('get_calculators return false', async () => {
        (axios.get as Mock).mockResolvedValue(false);

        const result = await calculator_service.get_calculators();

        expect(result).toBe(false);
    })

    // it('get_calculators throws error', async () => {
    //     (axios.get as Mock).mockImplementation(() => {
    //         throw new Error();
    //     });

    //     const result = await calculator_service.get_calculators();

    //     // expect(result).toBe(false);
    // })

    it('get_calculator_by_id', async () => {
        const response = { data: calculator };
        (axios.get as Mock).mockResolvedValue(response);

        const result = await calculator_service.get_calculator_by_id(0);

        expect(result).toBe(response.data);
    })
});
