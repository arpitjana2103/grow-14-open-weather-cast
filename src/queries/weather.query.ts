import type { TUnit } from "@/contexts/unit.context";
import type { TAirPollutionResponse, TOneCallResponse } from "@/schemas/weather.schema";

import { useSuspenseQuery } from "@tanstack/react-query";

import { getWeather, getAirPollution } from "@/services/weather.service";

export function useWeatherQuery(lat: number, lon: number, unit: TUnit) {
    return useSuspenseQuery<TOneCallResponse>({
        queryKey: ["weather", { lat, lon }, unit],
        queryFn: () => getWeather({ lat, lon, unit }),
        retry: false,
        staleTime: 1000 * 60 * 60 * 10,
    });
}

export function useAirPollutionQuery(lat: number, lon: number) {
    return useSuspenseQuery<TAirPollutionResponse>({
        queryKey: ["air-pollution", { lat, lon }],
        queryFn: () => getAirPollution({ lat, lon }),
        staleTime: 1000 * 60 * 60 * 10,
    });
}
