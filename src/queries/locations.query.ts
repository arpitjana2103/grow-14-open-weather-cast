import type { TLocationData } from "@/schemas/location.schema";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import sleepQuery from "@/utils/sleep-query.util";

import { getLocationByLatLon, searchLocations } from "../services/location.service";

export function useLocationSearchQuery(query: string) {
    return useQuery<TLocationData[]>({
        queryKey: ["locations", query],
        queryFn: async function ({ signal }) {
            await sleepQuery(1000 * 1, signal);
            return searchLocations(query);
        },
        enabled: query.length > 0,
        staleTime: 1000 * 60 * 5,
        retry: false,
    });
}

export function useLocationByLatLng() {
    const queryClient = useQueryClient();
    async function fetchLocationByLatLng(lat: number, lon: number) {
        return queryClient.fetchQuery({
            queryKey: ["location", lat, lon],
            queryFn: () => getLocationByLatLon(lat, lon),
        });
    }
    return { fetchLocationByLatLng };
}
