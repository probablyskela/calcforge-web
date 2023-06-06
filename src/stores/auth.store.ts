import { defineStore } from "pinia";
import { ref } from "vue";
import { useCookies } from '@vueuse/integrations/useCookies';  
import type { UserSignIn } from "@/assets/interfaces/user/iUserSignIn";
import type { UserSignUp } from "@/assets/interfaces/user/iUserSignUp";
import router from "@/router";
import axios from 'axios';

const api_url = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore('auth', () => {
    function get_token(redirect: boolean = true) {
        const token = cookies.get('token')
        if (token === undefined) {
            if (redirect) router.push('/sign-in');
            return token;
        }
        return token.token;
    }

    const cookies = useCookies(['locale']);
    const authorized = ref(cookies.get('token') !== undefined);
    
    cookies.addChangeListener(() => {
        authorized.value = cookies.get<string>('token') !== undefined;
    })
      
    async function sign_in(user: UserSignIn) {
        const sign_in = async function (user: UserSignIn) {
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
        };
        const token = await sign_in(user);
        if (token !== false) {
            cookies.set('token', token, {expires: new Date(new Date().getTime() + 900000)});
            router.push('/profile');
        }
    }

    async function sign_up(user: UserSignUp) {
        const sign_up = async function(user: UserSignUp) {
            const url = api_url + '/user/';

            try {
                const res = await axios.post(url, user, {
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

                return true;
            } catch (error: any) {
                console.log(error);
                alert(JSON.parse(error['request']['response'])['error']);
                return false;
            }
        };
        const res = await sign_up(user); 
        if (res) {
            router.push('/sign-in');
        }
    }

    async function sign_out() {
        console.log('sign out');
        cookies.remove('token');
        router.push('/');

    }

    return { authorized, get_token, sign_in, sign_out, sign_up };
})  