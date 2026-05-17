import type { TSavedLocations } from "@/hooks/useLocationCache";

type Props = {
    savedLocations: TSavedLocations;
};

export default function SavedLocations({ savedLocations }: Props) {
    const locations = Array.from(savedLocations.values()).toReversed();
    return (
        <div className="border bg-amber-300 p-5">
            {locations.map(function (location, index) {
                return (
                    <p key={location.place_id}>
                        {index + 1} : {location.display_name}
                    </p>
                );
            })}
        </div>
    );
}
