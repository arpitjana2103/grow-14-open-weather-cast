import { Location05Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { useLocationContext } from "@/contexts/location.context";

export default function CurrentLocation() {
    const { currentLocation } = useLocationContext();
    return (
        <div className="flex items-center gap-1.5 py-4 text-secondary">
            <HugeiconsIcon icon={Location05Icon} size={18} />
            <span>{currentLocation?.display_name}</span>
        </div>
    );
}
