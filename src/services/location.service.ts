import axios from "axios";

import { LocationDataResponseSchema, LocationDataSchema } from "@/schemas/location.schema";

const LOCATIONIQ_API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;

const BASE_URL = `https://api.locationiq.com/v1`;
const axiosClient = axios.create({ baseURL: BASE_URL });

export async function searchLocations(query: string) {
    if (!query.trim()) return [];

    const res = await axiosClient.get("/autocomplete", {
        params: {
            key: LOCATIONIQ_API_KEY,
            q: encodeURIComponent(query),
            limit: 3,
            dedupe: 1,
        },
    });

    const data = LocationDataResponseSchema.parse(res.data);
    return data;
}

export async function getLocationByLatLon(lat: number, lon: number) {
    const res = await axiosClient.get("/reverse", {
        params: {
            key: LOCATIONIQ_API_KEY,
            lat,
            lon,
            format: "json",
        },
    });
    const data = LocationDataSchema.parse(res.data);
    return data;
}
