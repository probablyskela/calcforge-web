import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';
import axios from 'axios';
import router from '@/router';
import { useAuthStore } from '@/stores/auth.store';
import type { User } from '@/assets/interfaces/user/iUser';
import type { UserSettings } from '@/assets/interfaces/user/iUserSettings';
import { AxiosError } from 'axios';
import { review_service } from '../review';
import type { Review } from '@/assets/interfaces/review/IReview';
import type { ReviewCreate } from '@/assets/interfaces/review/IReviewCreate';

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

const reviews: [Review] = [{
    id: 1,
    message: '1',
    rating: 1,
    authorId: 1
}]

const review: Review = {
    id: 1,
    message: '1',
    rating: 1,
    authorId: 1
}

const reviewCreate: ReviewCreate = {
    rating: 1,
    message: '1'
}

vi.mock('axios');
vi.mock('@/router');

describe('review service tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should get reviews successfully', async () => {
        const calculatorId = 123;
        const axiosResponse = { data: reviews };
        (axios.get as Mock).mockResolvedValueOnce(axiosResponse);
  
        const result = await review_service.get_reviews(calculatorId);
  
        expect(result).toEqual(reviews);
        expect(axios.get).toHaveBeenCalledWith(`http://0.0.0.0:5000/calculators/${calculatorId}/reviews`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
    });


    it('should handle error when getting reviews', async () => {
        const calculatorId = 123;
        const error = new Error('Failed to get reviews');
        (axios.get as Mock).mockRejectedValueOnce(error);

        const result = await review_service.get_reviews(calculatorId);

        expect(result).toBe(false);
        expect(axios.get).toHaveBeenCalledWith(`http://0.0.0.0:5000/calculators/${calculatorId}/reviews`, {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        });
    });

    it('should create a review successfully', async () => {
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
        const calculatorId = 123;
        const axiosResponse = { data: reviewCreate };
        (axios.post as Mock).mockResolvedValueOnce(axiosResponse);
  
        const result = await review_service.create_review(calculatorId, review);
  
        expect(result).toEqual(reviewCreate);
        expect(axios.post).toHaveBeenCalledWith(`http://0.0.0.0:5000/calculators/${calculatorId}/reviews`, review, {
          headers: {
            'Authorization': 'Bearer token123',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
    });

    it('should handle error when creating a review', async () => {
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

        const calculatorId = 123;
        const error = new Error('Failed to create a review');
        (axios.post as Mock).mockRejectedValueOnce(error);

        const result = await review_service.create_review(calculatorId, review);

        expect(result).toBe(false);
        expect(axios.post).toHaveBeenCalledWith(`http://0.0.0.0:5000/calculators/${calculatorId}/reviews`, review, {
            headers: {
                'Authorization': 'Bearer token123',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
    });

    it('should delete a review successfully', async () => {
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

        const calculatorId = 123;
        (axios.delete as Mock).mockResolvedValueOnce(true);
  
        const result = await review_service.delete_review(calculatorId);
  
        expect(result).toBe(false);
        expect(axios.delete).toHaveBeenCalledWith(`http://0.0.0.0:5000/calculators/${calculatorId}/reviews`, {
          headers: {
            'Authorization': 'Bearer token123',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
    });

    it('should delete a review successfully', async () => {
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

        const calculatorId = 123;
        const error = new Error('Failed to delete review');
        (axios.delete as Mock).mockRejectedValueOnce(error);
  
        const result = await review_service.delete_review(calculatorId);
  
        expect(result).toBe(false);
    });
})