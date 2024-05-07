'use client';

import { AuthDto } from '@/types';
import { API_BASE_URL } from '@/utils/SDK';
import { getApiUrlOrOverride } from '@ituspreadtrading/sdk';
import Axios from 'axios';

export const axios = Axios.create({
    baseURL: getApiUrlOrOverride(API_BASE_URL),
});

export const apiGetIsRegistered = async (address: string) => {
    return await axios.get('/wallet/status', {
        params: {
            address,
        },
    });
};

export const apiPostLogin = async (body: AuthDto) => {
    return await axios.post('/wallet/login', body);
};

export const apiPostRegister = async (body: AuthDto) => {
    return await axios.post('/wallet', body);
};
