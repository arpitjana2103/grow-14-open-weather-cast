import { RainDropIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

type Props = {
    className?: string;
    pop: number;
    rain?: number;
    snow?: number;
};

export default function Precipitation({ pop, rain, snow, className }: Props) {
    const precipChance = Math.round(pop * 100);
    const rainMm = rain ?? 0;
    const snowMm = snow ?? 0;

    return (
        <div className={cn("border border-border/30 shadow-2xs p-4 bg-card flex", className)}>
            <div className="flex h-full w-fit gap-0">
                <Metrix precipChance={precipChance} />
            </div>
            <div className="gap-auto flex grow flex-col justify-start pl-4 text-secondary-foreground xs:gap-1 sm:gap-2">
                <div>
                    <p className="text-sm leading-5">Precipitation</p>
                    <span
                        className={cn(
                            "text-2xl font-semibold",
                            precipChance > 0 && "text-blue-500",
                        )}
                    >{`${precipChance}%`}</span>
                </div>
                <div>
                    <p className="text-sm">Rain </p>
                    <span className="text-base font-semibold">{rainMm} mm</span>
                </div>
                <div>
                    <p className="text-sm">Snow </p>
                    <span className="text-base font-semibold">{snowMm} mm</span>
                </div>
            </div>
        </div>
    );
}

function Metrix({ precipChance }: { precipChance: number }) {
    let remaining = Math.floor(1 + ((precipChance - 1) * 39) / 99);
    let remaining2 = remaining;
    return (
        <>
            {Array.from({ length: 4 }).map(function (_, i) {
                return (
                    <div key={i} className="flex h-full flex-col justify-between">
                        {Array.from({ length: 10 }).map(function () {
                            return (
                                <span className="aspect-square h-[10%]" key={i}>
                                    <HugeiconsIcon
                                        icon={RainDropIcon}
                                        strokeWidth={2}
                                        fill={remaining2-- > 0 ? "currentColor" : "none"}
                                        className={cn(
                                            "size-[90%]",
                                            remaining-- > 0
                                                ? "text-blue-500"
                                                : "text-secondary-foreground",
                                        )}
                                    />
                                </span>
                            );
                        })}
                    </div>
                );
            })}
        </>
    );
}

// const today = data.daily[0];

// const precipChance = Math.round(today.pop * 100);  // % probability
// const rainMm       = today.rain ?? 0;              // mm/day
// const snowMm       = today.snow ?? 0;              // mm/day
