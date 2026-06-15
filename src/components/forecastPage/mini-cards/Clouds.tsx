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
                "shadow-2xs p-0 relative overflow-hidden bg-[linear-gradient(0deg,#2b7fff_0%,white_100%)] dark:bg-[linear-gradient(0deg,#020618_0%,#020618_20%,#62748e_100%)]",
                className,
            )}
        >
            <span className="absolute top-4 right-4 text-xs text-blue-500 dark:text-white">
                Clouds
            </span>
            <div className="flex h-full w-full flex-col items-center justify-center">
                <HugeiconsIcon
                    icon={clouds > 0 ? CloudIcon : CloudOffIcon}
                    strokeWidth={0.5}
                    className="size-[40%] translate-y-[10%] text-white dark:text-white/80"
                />
                <div className="text-2xl font-semibold text-white dark:text-white/80">
                    {clouds} %
                </div>
            </div>
        </div>
    );
}
