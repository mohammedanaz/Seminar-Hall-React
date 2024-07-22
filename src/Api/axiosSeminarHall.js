import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/';

export const seminarHallAxios = axios.create({
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json' },
  });

