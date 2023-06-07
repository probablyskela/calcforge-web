import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';
import { calculator_service } from '../calculator';
import type { Calculator } from '@/assets/interfaces/calculator/ICalculator';
import type { CalculatorSettings } from '@/assets/interfaces/calculator/ICalculatorSettings';
import axios, { Axios, AxiosError } from 'axios';
import router from '@/router';


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

const calculatorSettings: CalculatorSettings = {
    name: '2',
    description: '2',
    input: '2',
    code: '2',
    is_public: false
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

    it('should handle error when fetching calculators', async () => {
        const error = new Error('Failed to fetch calculators');
        (axios.get as Mock).mockRejectedValue(error);
  
        const result = await calculator_service.get_calculators();
  
        expect(result).toBe(false);
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/calculators'), expect.any(Object));
      });

    it('should fetch calculator successfully', async () => {
        const response = { data: calculator };
        (axios.get as Mock).mockResolvedValue(response);
  
        const result = await calculator_service.get_calculator_by_id(1);
  
        expect(result).toEqual(calculator);
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/calculators/1'), expect.any(Object));
    });

    it('should handle error when fetching calculator', async () => {
        const error = new Error('Failed to fetch calculator');
        (axios.get as Mock).mockRejectedValue(error);
  
        const result = await calculator_service.get_calculator_by_id(1);
  
        expect(result).toBe(false);
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/calculators/1'), expect.any(Object));
      });

    it('create_calculator', async () => {
        const response = true;
        (axios.post as Mock).mockResolvedValue({data: calculator});
  
        const result = await calculator_service.create_calculator(calculator);
  
        expect(result).toBe(response);
        expect(router.push).toHaveBeenCalledWith('/calculators/1');
        expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/calculators/'), calculator, expect.any(Object));  
    });

    it('should run calculator successfully', async () => {
        const id = 1;
        const input = '1 + 2';
        const result = { output: 3 };
        const response = { data: result };
        (axios.post as Mock).mockResolvedValue(response);
  
        const output = await calculator_service.run_calculator(id, input);
  
        expect(output).toEqual(result.output);
        expect(axios.post).toHaveBeenCalledWith(
          expect.stringContaining(`/calculators/${id}`),
          { input },
          expect.any(Object)
        );
      });

      it('should handle error when running calculator', async () => {
        const id = 1;
        const input = '1 + 2';
        const error = new Error('Failed to run calculator');
        (axios.post as Mock).mockRejectedValue(error);
  
        const output = await calculator_service.run_calculator(id, input);
  
        expect(output).toBe(false);
        expect(axios.post).toHaveBeenCalledWith(
          expect.stringContaining(`/calculators/${id}`),
          { input },
          expect.any(Object)
        );
      });

      it('should update calculator successfully', async () => {
        const id = 1;
        // (update_field as Mock).mockResolvedValue({});
  
        await calculator_service.update_calculator(id, calculatorSettings, calculator);
  
        // expect(update_field).toHaveBeenCalledWith(
        //   expect.stringContaining(`/calculators/${id}`)
        //   );
      });

      it('should delete calculator successfully', async () => {
        const id = 1;
        (axios.delete as Mock).mockResolvedValue({});
  
        const result = await calculator_service.delete_calculator(id);
  
        expect(result).toBe(true);
        expect(axios.delete).toHaveBeenCalledWith(
          expect.stringContaining(`/calculators/${id}`),
          expect.any(Object)
        );
      });

      it('should handle error when deleting calculator', async () => {
        const id = 1;
        (axios.delete as Mock).mockRejectedValue(new AxiosError('Failed to delete calculator'));
  
        const result = await calculator_service.delete_calculator(id);
  
        expect(result).toBe(false);
        expect(axios.delete).toHaveBeenCalledWith(
          expect.stringContaining(`/calculators/${id}`),
          expect.any(Object)
        );
      });
});
