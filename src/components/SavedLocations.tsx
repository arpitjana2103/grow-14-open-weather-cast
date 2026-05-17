import type { TSavedLocations } from "@/hooks/useLocationCache";

type Props = {
    savedLocations: TSavedLocations;
};

export default function SavedLocations({ savedLocations }: Props) {
    return <div>{JSON.stringify(savedLocations.values())}</div>;
}
