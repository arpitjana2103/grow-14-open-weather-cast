import type { TLocationData } from "@/schemas/location.schema";

import { MapsSquare02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";
import { useLocationContext } from "@/contexts/location.context";
import { useDebounce } from "@/hooks/useDebounce";
import { useLocationSearchQuery } from "@/queries/locations.query";

import { Spinner } from "./ui/spinner";

type Props = {
    handleSaveLocation: (location: TLocationData) => void;
};

export default function LocationSearch({ handleSaveLocation }: Props) {
    const [inputValue, setInputValue] = useState("");
    const { setCurrentLocation } = useLocationContext();
    const debouncedQuery = useDebounce(inputValue.toLocaleLowerCase(), 500);

    const { data: locations = [], isFetching } = useLocationSearchQuery(debouncedQuery);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
    }

    return (
        <div>
            <Combobox items={locations}>
                <ComboboxInput placeholder="Search for location" onChange={handleChange} />
                <ComboboxContent>
                    {isFetching && <Spinner />}
                    {!isFetching && (
                        <>
                            <ComboboxEmpty>
                                <a className="flex items-center gap-1 text-blue-600" href="#">
                                    <HugeiconsIcon icon={MapsSquare02Icon} size={15} />
                                    <span>Find Location on Map</span>
                                </a>
                            </ComboboxEmpty>
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
                        </>
                    )}
                </ComboboxContent>
                )
            </Combobox>
            <br />
        </div>
    );
}
