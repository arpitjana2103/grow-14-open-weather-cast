import axios from "axios";

import { LocationDataResponseSchema } from "@/schemas/location.schema";

const LOCATIONIQ_API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;

const BASE_URL = `https://api.locationiq.com/v1`;
const axiosClient = axios.create({ baseURL: BASE_URL });

export async function searchLocations(query: string) {
    if (!query.trim()) return [];

    console.log(query, "Search Location");

    const res = await axiosClient.get("/autocomplete", {
        params: {
            key: LOCATIONIQ_API_KEY,
            q: encodeURIComponent(query),
            limit: 5,
            dedupe: 1,
        },
    });

    const data = LocationDataResponseSchema.parse(res.data);
    return data;
}
