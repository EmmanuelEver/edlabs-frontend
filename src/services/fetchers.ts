import { apiPrivate, createURL } from "./axios";

const fetcher = (endpoint: string) => apiPrivate.get(createURL(endpoint)).then((res) => res.data)

export {fetcher}