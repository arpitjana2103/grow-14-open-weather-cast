import type { TLocationsType } from "./LocationSearch";
import type { TLocationData } from "@/schemas/location.schema";

import { MapsSearchIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { NavLink } from "react-router";

import { cn } from "@/lib/utils";

import { LocationListItem } from "./LocationsListItem";

type Props = {
    isOpen: boolean;
    locations: TLocationData[];
    onSelectLocation: (location: TLocationData, locationType: TLocationsType) => void;
    locationsType: TLocationsType;
    setPopverOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LocationsPopover({
    isOpen,
    locationsType,
    locations,
    onSelectLocation,
    setPopverOpen,
}: Props) {
    const haveLocations = locations.length > 0;
    return (
        <div
            className={cn(
                "absolute top-12 w-[20rem] transition-all duration-300 bg-background p-1 shadow-ring-foreground",
                isOpen
                    ? "visible opacity-100 translate-y-0"
                    : "invisible opacity-0 -translate-y-2 pointer-events-none",
            )}
        >
            <ul>
                <FindLocationOnMapItem
                    setPopverOpen={setPopverOpen}
                    haveLocations={haveLocations}
                />
                <div>
                    {locations.map(function (location) {
                        return (
                            <LocationListItem
                                key={location.place_id}
                                location={location}
                                saved={locationsType === "saved"}
                                onSelect={() => onSelectLocation(location, locationsType)}
                            />
                        );
                    })}
                </div>
            </ul>
        </div>
    );
}

function FindLocationOnMapItem({
    setPopverOpen,
    haveLocations,
}: {
    setPopverOpen: React.Dispatch<React.SetStateAction<boolean>>;
    haveLocations: boolean;
}) {
    return (
        <li
            className={cn(
                "flex cursor-pointer items-center gap-3 border border-primary/60 bg-primary/10 px-2.5 py-2 hover:bg-primary/5 transition-colors",
                haveLocations && "mb-1",
            )}
        >
            <NavLink
                to="map"
                className="flex w-full items-center justify-center gap-2 text-primary"
                onClick={() => setPopverOpen(false)}
            >
                <span>
                    <HugeiconsIcon icon={MapsSearchIcon} size={19} />
                </span>

                <span>Find on Map</span>
            </NavLink>
        </li>
    );
}
