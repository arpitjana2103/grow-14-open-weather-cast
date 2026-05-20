import type { TLocationsType } from "./LocationSearch";
import type { TLocationData } from "@/schemas/location.schema";

import { LocateFixed } from "lucide-react";
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
    return (
        <div
            className={cn(
                "absolute top-12 w-[20rem] shadow-md transition-all duration-300",
                isOpen
                    ? "visible opacity-100 translate-y-0"
                    : "invisible opacity-0 -translate-y-2 pointer-events-none",
            )}
        >
            <ul>
                <FindLocationOnMapItem setPopverOpen={setPopverOpen} />
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
            </ul>
        </div>
    );
}

function FindLocationOnMapItem({
    setPopverOpen,
}: {
    setPopverOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <li className="flex cursor-pointer items-center gap-3 border border-primary bg-accent2 px-2.5 py-2 transition hover:brightness-103 dark:bg-accent2">
            <NavLink
                to="map"
                className="flex w-full items-center justify-center gap-2 text-primary"
                onClick={() => setPopverOpen(false)}
            >
                <span>
                    <LocateFixed size={19} strokeWidth={2} />
                </span>

                <span>Find on Map</span>
            </NavLink>
        </li>
    );
}
