import axios, { AxiosError } from 'axios';
import { useAuthStore } from '@/stores/auth.store';
import type { Calculator } from '../interfaces/calculator/ICalculator';
import type { CalculatorSettings } from '../interfaces/calculator/ICalculatorSettings';
import router from '@/router';
import type { CalculatorResult } from '../interfaces/calculator/ICalculatorResult';
import { update_field } from './main';

const authStore = useAuthStore();

const api_url = import.meta.env.VITE_API_URL;

export class calculator_service {
    static async get_calculators() {
        const url = api_url + '/calculators';

        try {
            const res = await axios.get<[Calculator]>(url, {
                headers: {
                    'Accept': "application/json",
                    'Content-Type': 'application/json'
                }
            })

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

    static async get_calculator_by_id(id: number) {
        const url = api_url + '/calculators/' + id;

        try {
            const res = await axios.get<Calculator>(url, {
                headers: {
                    // 'Accept': "application/json",
                    'Content-Type': 'application/json'
                }
            })

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

    static async create_calculator(calculator: CalculatorSettings) {
        const token = authStore.get_token();
        const url = api_url + '/calculators/';

        try {
            const res = await axios.post<Calculator>(url, calculator, {
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

            router.push('/calculators/' + res.data.id)
            return true;
        } catch (error: any) {
            console.log(error);
            alert(JSON.parse(error['response'])['error']);
            return false;
        }
    } 

    static async run_calculator(id: number, input: string) {
        const url = api_url + '/calculators/' + id;

        const data = {'input': input};

        try {
            const res = await axios.post<CalculatorResult>(url, data, {
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

            return res.data.output;
        } catch (error: any) {
            console.log(error);
            alert(JSON.parse(error['response'])['error']);
            return false;
        }
    }

    static async update_calculator(id: number, calc_settings: CalculatorSettings, calculator: Calculator) {
        const url = api_url + '/calculators/' + id;
        
        if (calc_settings.name !== '' && calc_settings.name !== calculator.name) {
            await update_field(url, 'name', calc_settings.name);
        }
        if (calc_settings.description !== '' && calc_settings.description !== calculator.description) {
            await update_field(url, 'description', calc_settings.description);
        }
        if (calc_settings.code !== '' && calc_settings.code !== calculator.code) {
            await update_field(url, 'code', calc_settings.code);
        }
        if (calc_settings.is_public !== calculator.is_public) {
            await update_field(url, 'is_public', String(calc_settings.is_public));
        }
        if (calc_settings.input !== '' && calc_settings.input !== calculator.input) {
            await update_field(url, 'inputData', calc_settings.input);
        }
    }

    static async delete_calculator(id: number) {
        const url = api_url + '/calculators/' + id;

        const token = authStore.get_token();

        try {
            const res = await axios.delete(url, {
                headers: {
                    'Authorization': 'Bearer ' + token,
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