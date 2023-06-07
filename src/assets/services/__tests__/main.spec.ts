import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';
import axios from 'axios';
import { update_field } from '../main';

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

describe('main service tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    
      it('should handle missing token when updating field', async () => {
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

        const url = 'example.com/api/update';
        const field = 'name';
        const value = 'John';
    
        const result = await update_field(url, field, value);
    
        expect(result).toBe(undefined);
        // expect(axios.patch).not.toHaveBeenCalled();
      });

      it('should handle error when updating field', async () => {
        vi.mock('@/stores/auth.store', () => ({
            useAuthStore: vi.fn(() => ({
                get_token: vi.fn().mockReturnValue('token'),
                sign_in: vi.fn(),
                sign_up: vi.fn(),
                sign_out: vi.fn(),
                authorized: {
                value: false,
                },
            })),
        }));

        const url = 'example.com/api/update';
        const field = 'name';
        const value = 'John';
        const error = new Error('Failed to update field');
        (axios.patch as Mock).mockRejectedValueOnce(error);
    
        const result = await update_field(url, field, value);
    
        expect(result).toBe(false);
        expect(axios.patch).toHaveBeenCalledWith(url, { [field]: value }, {
          headers: {
            'Authorization': 'Bearer token',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
      });
})