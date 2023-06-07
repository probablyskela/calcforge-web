import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';
import { user_service } from '../user';
import axios from 'axios';
import router from '@/router';
import { useAuthStore } from '@/stores/auth.store';
import type { User } from '@/assets/interfaces/user/iUser';
import type { UserSettings } from '@/assets/interfaces/user/iUserSettings';
import { AxiosError } from 'axios';

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

const user: User = {
    id: 1,
    username: '1',
    email: '1',
    role: 1,
    calculatorIds: [1]
};

const userSettings: UserSettings = {
    username: '2',
    email: '2',
    old_password: '1',
    new_password: '2',
    confirm_new_password: '2'
}


describe('user service tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return user data when the API request is successful', async () => {
        const user = { id: 1, name: 'John Doe' };
        (axios.get as Mock).mockResolvedValueOnce({ data: user });
  
        const result = await user_service.get_user(1);
  
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/user/1'), expect.any(Object));
  
        expect(result).toEqual(user);
    });

    it('should return false and redirect to /404 when the API request returns a 404 error', async () => {
        (axios.get as Mock).mockRejectedValueOnce({ response: { status: 404 } });
  
        const result = await user_service.get_user(1);
  
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/user/1'), expect.any(Object));
  
        expect(result).toBe(false);
        expect(router.push).toHaveBeenCalledWith('/404');
      });

      it('should return false and display an error alert when the API request fails', async () => {
        (axios.get as Mock).mockRejectedValueOnce({ request: { response: '{"error": "API error"}' } });
  
        const result = await user_service.get_user(1);
  
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/user/1'), expect.any(Object));
  
        expect(result).toBe(false);
      });
    
      it('should return user profile data when the API request is successful', async () => {
        const user = { id: 1, name: 'John Doe' };

        vi.mock('@/stores/auth.store', () => ({
            useAuthStore: vi.fn(() => ({
                get_token: vi.fn().mockReturnValue('token123'),
                sign_in: vi.fn(),
                sign_up: vi.fn(),
                sign_out: vi.fn(),
                authorized: {
                value: false,
                },
            })),
        }));
        (axios.get as Mock).mockResolvedValueOnce({ data: user });
  
        const result = await user_service.get_profile();
  
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/user/profile'), expect.any(Object));
  
        expect(result).toEqual(user);
      });

      it('should return false and display an error alert when the API request fails', async () => {
        vi.mock('@/stores/auth.store', () => ({
            useAuthStore: vi.fn(() => ({
                get_token: vi.fn().mockReturnValue('token123'),
                sign_in: vi.fn(),
                sign_up: vi.fn(),
                sign_out: vi.fn(),
                authorized: {
                value: false,
                },
            })),
        }));
        
        (axios.get as Mock).mockRejectedValueOnce({ response: { data: '{"error": "API error"}' } });
  
        const result = await user_service.get_profile();
  
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/user/profile'), expect.any(Object));
  
        expect(result).toBe(false);
      });

      it('should update the user password and fields', async () => {
        vi.mock('@/stores/auth.store', () => ({
            useAuthStore: vi.fn(() => ({
                get_token: vi.fn().mockReturnValue('token123'),
                sign_in: vi.fn(),
                sign_up: vi.fn(),
                sign_out: vi.fn(),
                authorized: {
                value: false,
                },
            })),
        }));
        (axios.post as Mock).mockResolvedValueOnce({});
  
        await user_service.update_user(userSettings, user);
  
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/user/login'), expect.any(Object), expect.any(Object));
        expect(axios.patch).toHaveBeenCalledTimes(2);
        expect(user.username).toBe('1');
        expect(userSettings.username).toBe('');
      });

      it('should delete the user and sign out', async () => {

        vi.mock('@/stores/auth.store', () => ({
            useAuthStore: vi.fn(() => ({
                get_token: vi.fn().mockReturnValue('token123'),
                sign_in: vi.fn(),
                sign_up: vi.fn(),
                sign_out: vi.fn(),
                authorized: {
                value: false,
                },
            })),
        }));
        (axios.delete as Mock).mockResolvedValueOnce({});
  
        await user_service.delete_user('1');
  
        expect(axios.delete).toHaveBeenCalledTimes(1);
        expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining('/user/'), expect.any(Object));
      });
  
    it('get_calculators return false', async () => {
        (axios.delete as Mock).mockResolvedValue(false);

        const result = await user_service.delete_user('1');

        expect(result).toBe(false);
    })

    it('should handle error when deleting calculator', async () => {
        (axios.delete as Mock).mockRejectedValue(new AxiosError('Failed to delete calculator'));

        const result = await user_service.delete_user('1');

        expect(result).toBe(false);
        expect(axios.delete).toHaveBeenCalledOnce();
    });
})