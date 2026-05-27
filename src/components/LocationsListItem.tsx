import type { TLocationData } from "@/schemas/location.schema";

import { History, MapPinSearch } from "lucide-react";

type Props = {
    location: TLocationData;
    saved: boolean;
    onSelect: () => void;
};

const maxAddressLength = 100;

function countryCodeToEmoji(code: string) {
    return code
        .toUpperCase()
        .split("")
        .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
        .join("");
}

export function LocationListItem({ location, saved, onSelect }: Props) {
    console.log(countryCodeToEmoji(location.address.country_code));
    return (
        <li
            className="flex cursor-pointer items-start gap-3 border-x border-t bg-accent px-2.5 py-2 transition last:border-b hover:bg-accent/20"
            onClick={onSelect}
        >
            <span>
                {saved ? (
                    <History strokeWidth={1.5} className="text-foreground" size={22} />
                ) : (
                    <MapPinSearch strokeWidth={1.5} className="text-foreground" size={22} />
                )}
            </span>

            <p className="cursor-pointer">
                <span className="flex items-center gap-2">
                    <span className="font-emoji">
                        {countryCodeToEmoji(location.address.country_code)}
                    </span>
                    <span className="block font-bold">{location.display_place}</span>
                </span>

                <span className="text-sm leading-[1.3] text-secondary-foreground">
                    {`${location.display_address?.substring(0, maxAddressLength)}${
                        (location.display_address?.length || 0) > maxAddressLength ? "..." : ""
                    }`}
                </span>
            </p>
        </li>
    );
}
