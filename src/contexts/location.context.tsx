import type { TLocationData } from "@/schemas/location.schema";
import type { Dispatch, SetStateAction } from "react";

import { createContext, useContext, useMemo } from "react";

import { useLocalStorageState } from "@/hooks/useLocalStorage";

type ContextType = {
    currentLocation: TLocationData | null;
    setCurrentLocation: Dispatch<SetStateAction<TLocationData | null>>;
};

const LocationContext = createContext<ContextType | null>(null);

type LocationProviderProps = {
    children: React.ReactNode;
};

const STORAGE_KEY = "openweathercast-currLocation";

export const LocationProvider = function ({ children }: LocationProviderProps) {
    const [currentLocation, setCurrentLocation] = useLocalStorageState<TLocationData | null>(
        STORAGE_KEY,
        null,
    );

    const value = useMemo(
        () => ({
            currentLocation,
            setCurrentLocation,
        }),
        [currentLocation],
    );

    return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};

export const useLocationContext = function () {
    const context = useContext(LocationContext);
    if (context === null) throw new Error("useCities must be used within a LocationProvider");
    return context;
};
