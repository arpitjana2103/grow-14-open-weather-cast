import type { TLocationData } from "@/schemas/location.schema";

import { useEffect, useState } from "react";

const STORAGE_KEY = "openweathercast-locations";
const MAX_LOCATIONS = 5;

export type TSavedLocations = Map<string, TLocationData>;

export function useLocationsCache() {
    const [savedLocations, setSavedLocations] = useState<TSavedLocations>(function () {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return new Map();

        try {
            const parsed = JSON.parse(stored) satisfies [string, TLocationData][];
            return new Map(parsed);
        } catch {
            return new Map();
        }
    });

    useEffect(
        function () {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(savedLocations.entries())));
        },
        [savedLocations],
    );

    function handleSaveLocation(location: TLocationData) {
        setSavedLocations(function (prev) {
            const updated = new Map(prev);
            const key = location.place_id;
            updated.delete(key);
            updated.set(key, location);

            if (updated.size > MAX_LOCATIONS) {
                const oldestKey = updated.keys().next().value;
                if (oldestKey) updated.delete(oldestKey);
            }

            return updated;
        });
    }

    return { savedLocations, handleSaveLocation };
}
