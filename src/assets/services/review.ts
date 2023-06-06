import axios, { AxiosError } from 'axios';
import type { User } from '../interfaces/user/iUser';
import { useAuthStore } from '@/stores/auth.store';
import router from '@/router';
import type { UserSettings } from '../interfaces/user/iUserSettings';
import { update_field } from './main';
import type { UserSignIn } from '../interfaces/user/iUserSignIn';
import type { Review } from '../interfaces/review/IReview';
import type { ReviewCreate } from '../interfaces/review/IReviewCreate';

const authStore = useAuthStore();

const api_url = import.meta.env.VITE_API_URL;

export class review_service {
    static async get_reviews(calculator_id: number) {
        const url = api_url + '/calculators/' + calculator_id + '/reviews';

        try {
            const res = await axios.get<[Review]>(url, {
                headers: {
                    'Accept': "application/json",
                    'Content-Type': 'application/json'
                }
            }).catch(function (error: AxiosError) {
                console.log(error);
                alert(error.response?.data);
                return false;
            });

            if (typeof(res) === 'boolean') {
                return false;
            }

            return res.data;
        } catch (error: any) {
            console.log(error);
            alert(JSON.parse(error['response'])['error']);
            return false;
        }
    }

    static async create_review(calculator_id: number, review: ReviewCreate) {
        const url = api_url + '/calculators/' + calculator_id + '/reviews';
        const token = authStore.get_token();

        try {
            const res = await axios.post<Review>(url, review, {
                headers: {
                    'Authorization': "Bearer " + token,
                    'Accept': "application/json",
                    'Content-Type': 'application/json'
                }
            }).catch(function (error: AxiosError) {
                console.log(error);
                alert(error.response?.data);
                return false;
            });

            if (typeof(res) === 'boolean') {
                return false;
            }

            return res.data;
        } catch (error: any) {
            console.log(error);
            alert(JSON.parse(error['response'])['error']);
            return false;
        }
    }

    static async delete_review(calculator_id: number) {
        const url = api_url + '/calculators/' + calculator_id + '/reviews';
        const token = authStore.get_token();

        try {
            const res = await axios.delete(url, {
                headers: {
                    'Authorization': "Bearer " + token,
                    'Accept': "application/json",
                    'Content-Type': 'application/json'
                }
            }).catch(function (error: AxiosError) {
                console.log(error);
                alert(error.response?.data);
                return false;
            });

            if (typeof(res) === 'boolean') {
                return false;
            }

            return true;
        } catch (error: any) {
            console.log(error);
            alert(JSON.parse(error['response'])['error']);
            return false;
        }
    } 
}