import type { TLocationData } from "@/schemas/location.schema";

import { Search, X as Cross } from "lucide-react";
import { useRef, useState } from "react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useLocationContext } from "@/contexts/location.context";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useDebounce } from "@/hooks/useDebounce";
import { useLocationsCache } from "@/hooks/useLocationCache";
import { useLocationSearchQuery } from "@/queries/locations.query";

import LocationsPopover from "./LocationsPopover";
import Spinner from "./Spinner";

export type TLocationsType = "fetched" | "saved";

export default function LocationSearch() {
    const inputRef = useRef<HTMLInputElement>(null);

    // --- Search Query: input value → debounce → fetch results ---
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query.toLocaleLowerCase(), 400);
    const { data: fetchedLocations = [], isFetching } = useLocationSearchQuery(debouncedQuery);

    // --- Location Selection: save picked location, fall back to saved list ---
    const { setCurrentLocation } = useLocationContext();
    const { savedLocations, handleSaveLocation } = useLocationsCache();
    const savedLocationsArr = Array.from(savedLocations.values()).toReversed();

    // --- Popover: visibility state, outside-click to close ---
    const popoverRef = useRef<HTMLDivElement>(null);
    const [popoverOpen, setPopverOpen] = useState(false);
    useClickOutside({
        ref: popoverRef,
        callback: () => setPopverOpen(false),
        enabled: popoverOpen,
    });

    // --- Locations to Render ---
    const showingSavedLocations = fetchedLocations.length === 0 && !isFetching;
    const locationsToRender = showingSavedLocations ? savedLocationsArr : fetchedLocations;

    // -- Handler Functions ---
    function handleSelectLocation(location: TLocationData, locationType: TLocationsType) {
        if (locationType === "fetched") {
            handleSaveLocation(location);
        }

        if (inputRef.current) {
            inputRef.current.value = location.display_place;
        }

        setCurrentLocation(location);
        setPopverOpen(false);
    }

    function handleClearInput() {
        setQuery("");
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    return (
        <div className="relative" ref={popoverRef}>
            <InputGroup className="relative h-10 w-[20rem]">
                <InputGroupInput
                    ref={inputRef}
                    placeholder="Search for location"
                    defaultValue={""}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setPopverOpen(true)}
                />
                <InputGroupAddon>
                    {isFetching ? <Spinner /> : <Search size={18} strokeWidth={2} />}
                </InputGroupAddon>
                {inputRef.current?.value && (
                    <button
                        onClick={handleClearInput}
                        className="absolute top-1/2 right-3 z-1000 -translate-y-1/2 cursor-pointer p-0.5"
                    >
                        <Cross size={18} strokeWidth={2} className="text-foreground/60" />
                    </button>
                )}
            </InputGroup>

            <LocationsPopover
                isOpen={popoverOpen}
                locationsType={showingSavedLocations ? "saved" : "fetched"}
                locations={locationsToRender}
                onSelectLocation={handleSelectLocation}
                setPopverOpen={setPopverOpen}
            />
        </div>
    );
}
