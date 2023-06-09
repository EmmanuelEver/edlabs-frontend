import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const apiPrivate = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const createURL = (endpoint:string) => new URL(endpoint, process.env.NEXT_PUBLIC_API_URL).href;
