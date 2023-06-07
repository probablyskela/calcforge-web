import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';
import * as io from 'socket.io-client';

export function connect_socket(url:string, calc_id: number) {
    console.log(url);
    const socket = io.connect(url, {
    query: {
            'calculator_id': calc_id
        }
    });
    console.log(socket);
    console.log(socket.id);

    return socket;
}
