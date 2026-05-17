import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: Omit<React.ComponentProps<"svg">, "strokeWidth">) {
    return (
        <div className="flex items-center justify-center p-2.5">
            <HugeiconsIcon
                icon={Loading03Icon}
                strokeWidth={2}
                role="status"
                aria-label="Loading"
                className={cn("size-4 animate-spin", className)}
                {...props}
            />
        </div>
    );
}

export { Spinner };
