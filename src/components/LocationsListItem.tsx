import type { TLocationData } from "@/schemas/location.schema";

import { History, MapPinSearch } from "lucide-react";

type Props = {
    location: TLocationData;
    saved: boolean;
    onSelect: () => void;
};

const maxAddressLength = 100;

export function LocationListItem({ location, saved, onSelect }: Props) {
    return (
        <li
            className="flex cursor-pointer items-start gap-3 border-x border-t bg-accent px-2.5 py-2 transition last:border-b hover:brightness-95"
            onClick={onSelect}
        >
            <span>
                {saved ? (
                    <History strokeWidth={1.5} className="text-foreground/60" size={22} />
                ) : (
                    <MapPinSearch strokeWidth={1.5} className="text-foreground/60" size={22} />
                )}
            </span>

            <p className="cursor-pointer">
                <span className="block font-bold">{location.display_place}</span>

                <p className="text-sm leading-[1.3] text-foreground/70">
                    {`${location.display_address?.substring(0, maxAddressLength)}${
                        (location.display_address?.length || 0) > maxAddressLength ? "..." : ""
                    }`}
                </p>
            </p>
        </li>
    );
}
