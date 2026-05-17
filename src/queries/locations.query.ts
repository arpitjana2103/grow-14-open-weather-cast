import type { TLocationData } from "@/schemas/location.schema";

import { useQuery } from "@tanstack/react-query";

import sleepQuery from "@/utils/sleep-query.util";

import { searchLocations } from "../services/location.service";

export function useLocationSearchQuery(query: string) {
    return useQuery<TLocationData[]>({
        queryKey: ["locations", query],
        queryFn: async function ({ signal }) {
            await sleepQuery(1000 * 2, signal);
            return searchLocations(query);
        },
        enabled: query.length > 0,
        staleTime: 1000 * 60 * 5,
    });
}
