import type { TLocationData } from "@/schemas/location.schema";

import { History, MapPinSearch } from "lucide-react";

type Props = {
    location: TLocationData;
    saved: boolean;
    onSelect: () => void;
};

export function LocationListItem({ location, saved, onSelect }: Props) {
    return (
        <li
            className="flex cursor-pointer items-center gap-3 border bg-accent px-2.5 py-2 transition hover:brightness-95"
            onClick={onSelect}
        >
            <span>
                {saved ? (
                    <History strokeWidth={1.5} className="text-foreground/60" />
                ) : (
                    <MapPinSearch strokeWidth={1.5} className="text-foreground/60" />
                )}
            </span>

            <p className="cursor-pointer">
                <span className="block font-bold">{location.display_place}</span>

                <span>
                    {`${location.display_address?.substring(0, 28)}${
                        (location.display_address?.length || 0) > 28 ? "..." : ""
                    }`}
                </span>
            </p>
        </li>
    );
}
