import { MapsSquare02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

import {
    Combobox,
    ComboboxContent,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";
import { useLocationContext } from "@/contexts/location.context";
import { useDebounce } from "@/hooks/useDebounce";
import { useLocationsCache } from "@/hooks/useLocationCache";
import { useLocationSearchQuery } from "@/queries/locations.query";

import { Spinner } from "./ui/spinner";

export default function LocationSearch() {
    const { savedLocations, handleSaveLocation } = useLocationsCache();
    const [inputValue, setInputValue] = useState("");
    const { setCurrentLocation } = useLocationContext();
    const debouncedQuery = useDebounce(inputValue.toLocaleLowerCase(), 500);

    const savedLocationsArr = Array.from(savedLocations.values());
    const { data: locations = [], isFetching } = useLocationSearchQuery(debouncedQuery);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
    }

    return (
        <div>
            <Combobox items={locations.length > 0 ? locations : savedLocationsArr}>
                <ComboboxInput
                    placeholder="Search for location"
                    onChange={handleChange}
                    onClear={() => setInputValue("")}
                    showClear
                />
                <ComboboxContent>
                    <>
                        {isFetching && <Spinner />}
                        <ComboboxList>
                            {(location) => (
                                <ComboboxItem
                                    key={location.place_id}
                                    value={location.display_name}
                                    onClick={() => {
                                        handleSaveLocation(location);
                                        setCurrentLocation(location);
                                    }}
                                >
                                    {location.display_name}
                                </ComboboxItem>
                            )}
                        </ComboboxList>
                        <div className="flex justify-center p-2">
                            <a href="#" className="flex items-center gap-1.5 text-sm underline">
                                <HugeiconsIcon icon={MapsSquare02Icon} size={15} />
                                <span>Find Location on Map</span>
                            </a>
                        </div>
                    </>
                </ComboboxContent>
            </Combobox>
        </div>
    );
}
