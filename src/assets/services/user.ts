import axios, { AxiosError } from 'axios';
import type { User } from '../interfaces/user/iUser';
import { useAuthStore } from '@/stores/auth.store';
import router from '@/router';
import type { UserSettings } from '../interfaces/user/iUserSettings';
import { update_field } from './main';
import type { UserSignIn } from '../interfaces/user/iUserSignIn';

const authStore = useAuthStore();

const api_url = import.meta.env.VITE_API_URL;

export class user_service {
    static async get_user(id: number) {
        const url = api_url + '/user/' + id;

        try {
            const res = await axios.get<User>(url, {
                headers: {
                    'Accept': "application/json",
                    'Content-Type': 'application/json'
                }
            }).catch(function (error: AxiosError) {
                console.log(error);
                if (error.response?.status === 404 || error.response?.status === 500) {
                    router.push('/404');
                }
                // alert((error.response?.data as any)['error']);
                return false;
            });

            if (typeof(res) === 'boolean') {
                return false;
            }

            return res.data;
        } catch (error: any) {
            console.log(error);
            alert(JSON.parse(error['request']['response'])['error']);
            return false;
        }
    }

    static async get_profile(redirect: boolean = true) {
        const token = authStore.get_token(redirect);

        if (token === undefined) {
            return false;
        }

        const url = api_url + '/user/profile';

        try {
            const res = await axios.get<User>(url, {
                headers: {
                    'Authorization': "Bearer " + token,
                    'Accept': "application/json",
                    'Content-Type': 'application/json'
                }
            }).catch(function (error: any) {
                console.log(error);
                alert(JSON.parse(error['response'])['error']);
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

    static async update_user(user: UserSettings, user_old: User) {
        const url = api_url + '/user/';

        if (user.old_password !== '' && user.new_password !== '' && user.confirm_new_password !== '') {
            if (user.new_password !== user.confirm_new_password) {
                alert('Passwords are not the same');
                return;
            }
            if (await user_service.check_password(<UserSignIn>{username: user_old.username, password: user.old_password})) {
                await update_field(url, 'password', user.new_password);
                user.old_password = '';
                user.new_password = '';
                user.confirm_new_password = '';
            } else {
                alert('Wrong password!');
            }
        }
    
        if (user.username !== '' && user.username !== user_old.username) {
            await update_field(url, 'username', user.username);
            user.username = '';
        }
    
        if (user.email !== '' && user.email !== user_old.email) {
            await update_field(url, 'email', user.email);
            user.username = '';
        }
    }

    private static async check_password(user: UserSignIn) {
        const url = api_url + '/user/login';

        try {
            const res = await axios.post<string>(url, user, {
                headers: {
                    'Accept': "application/json",
                    'Content-Type': 'application/json'
                }
            }).catch(function (error: any) {
                console.log(error);
                alert(JSON.parse(error['request']['response'])['error']);
                return false;
            });

            if (typeof(res) === 'boolean') {
                return false;
            }

            return res.data;
        } catch (error: any) {
            console.log(error);
            alert(JSON.parse(error['request']['response'])['error']);
            return false;
        }
    }
    

    static async delete_user(id: string) {
        const token = authStore.get_token();

        const url = api_url + '/user/';

        try {
            const res = await axios.delete(url, {
                headers: {
                    'Authorization': "Bearer " + token,
                    'Accept': "application/json",
                    'Content-Type': 'application/json'
                }
            }).catch(function (error: any) {
                console.log(error);
                alert(JSON.parse(error['request']['response'])['error']);
                return false;
            });

            if (typeof(res) !== 'boolean') {
                console.log(res);
                await authStore.sign_out();
            }
        } catch (error: any) {
            console.log(error);
            alert(JSON.parse(error['request']['response'])['error']);
            return false;
        }
    }
}