import axios from "axios";

import { OneCallResponseSchema } from "./schemas/weather.schema";
const API_KEY = import.meta.env.VITE_API_KEY;

const BASE_URL = `https://api.openweathermap.org/data/3.0`;
const axiosClient = axios.create({ baseURL: BASE_URL });

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
    const res = await axiosClient.get("/onecall", {
        params: {
            lat: lat,
            lon: lon,
            units: "imperial",
            appid: API_KEY,
        },
    });

    const data = OneCallResponseSchema.parse(res.data);
    return data;
}
