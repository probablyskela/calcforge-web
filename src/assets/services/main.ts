import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();

export async function update_field(url: string, field: string, value: string) {
    const token = authStore.get_token();

    if (token === undefined) {
        return false;
    }
    
    type httpData = {
        [key: string]: string
    }

    const data: httpData = {};
    data[field] = value;

    try {
        const res = await axios.patch(url, data, {
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

        return res === false;
        
    } catch (error: any) {
        console.log(error);
        alert(JSON.parse(error['request']['response'])['error']);
        return false;
    }
}
