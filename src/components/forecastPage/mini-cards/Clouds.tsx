import { CloudIcon, CloudOffIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

type Props = {
    className?: string;
    clouds: number;
};

export default function Clouds({ className, clouds }: Props) {
    return (
        <div
            className={cn(
                " border-blue-500 shadow-2xs p-0 relative overflow-hidden",

                className,
            )}
            style={{
                background: `linear-gradient(0deg, #2b7fff 0%, white 100%)`,
            }}
        >
            <span className="absolute top-4 right-4 text-xs text-blue-500">Clouds</span>
            <div className="flex h-full w-full flex-col items-center justify-center">
                <HugeiconsIcon
                    icon={clouds > 0 ? CloudIcon : CloudOffIcon}
                    strokeWidth={1}
                    className="size-[40%] translate-y-[10%] text-white"
                />
                <div className="text-2xl font-semibold text-white">{clouds} %</div>
            </div>
        </div>
    );
}
