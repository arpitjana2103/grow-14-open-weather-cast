import type { TLocationData } from "@/schemas/location.schema";

import { useLocalStorageState } from "./useLocalStorage";

const STORAGE_KEY = "openweathercast-locations";
const MAX_LOCATIONS = 5;

export type TSavedLocations = Map<string, TLocationData>;
export type TStoredLocations = [string, TLocationData][];

export function useLocationsCache() {
    const [storedLocations, setStoredLocations] = useLocalStorageState<TStoredLocations>(
        STORAGE_KEY,
        [],
    );

    const savedLocations: TSavedLocations = new Map(storedLocations);

    function handleSaveLocation(location: TLocationData) {
        setStoredLocations(function (prev) {
            const updated = new Map(prev);
            const key = location.place_id;
            updated.delete(key);
            updated.set(key, location);

            if (updated.size > MAX_LOCATIONS) {
                const oldestKey = updated.keys().next().value;
                if (oldestKey) updated.delete(oldestKey);
            }

            return Array.from(updated.entries());
        });
    }

    return { savedLocations, handleSaveLocation };
}
