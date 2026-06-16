import { FastWindIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { WeatherUnits, type TUnit } from "@/contexts/unit.context";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
    unit: TUnit;
    windSpeed: number;
    windDeg: number;
};

const getPointOnCircle = (deg: number) => {
    const rad = (deg * Math.PI) / 180;

    return {
        left: `${50 + 50 * Math.cos(rad)}%`,
        top: `${50 - 50 * Math.sin(rad)}%`,
    };
};

export default function Wind({ unit, windSpeed, windDeg, className }: Props) {
    const windUnit = WeatherUnits[unit].wind_speed;
    return (
        <div
            className={cn(
                "border relative border-border/30 bg-card shadow-2xs p-4 pb-8 flex flex-col justify-between",
                className,
            )}
        >
            <span className="absolute top-4 right-4 text-xs text-secondary-foreground">Wind</span>
            <div>
                <div className="flex">
                    <div className="flex items-center justify-center gap-1">
                        <HugeiconsIcon
                            size={20}
                            icon={FastWindIcon}
                            strokeWidth={1.5}
                            className="text-secondary-foreground"
                        />
                        <span className="flex items-end gap-1">
                            <span className="mr-1 text-2xl leading-none font-semibold text-blue-500">
                                {windSpeed}
                            </span>

                            <span className="text-xs text-secondary-foreground">{windUnit}</span>
                        </span>
                    </div>
                </div>
                <div></div>
            </div>

            <div>
                <div className="relative mx-auto aspect-square w-2/3 rounded-full border border-blue-500">
                    <div
                        className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-500 bg-card"
                        style={getPointOnCircle(0)}
                    >
                        <span className="text-sm text-secondary-foreground">E</span>
                    </div>
                    <div
                        className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-500 bg-card"
                        style={getPointOnCircle(90)}
                    >
                        <span className="text-sm text-secondary-foreground">N</span>
                    </div>
                    <div
                        className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-500 bg-card"
                        style={getPointOnCircle(180)}
                    >
                        <span className="text-sm text-secondary-foreground">W</span>
                    </div>
                    <div
                        className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-500 bg-card"
                        style={getPointOnCircle(270)}
                    >
                        <span className="text-sm text-secondary-foreground">S</span>
                    </div>

                    <WindArrow
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-secondary-foreground"
                        style={{ rotate: `${windDeg}deg` }}
                    />
                </div>
            </div>
        </div>
    );
}

export function WindArrow({
    className,
    style,
}: {
    className?: string;
    style?: React.CSSProperties;
}) {
    return (
        <svg viewBox="62 35 56 102" className={cn("size-20", className)} style={style} fill="none">
            <path
                d="M 86.325 40.3742
                   C 86.9141 37.7765 90.5908 37.7098 91.2738 40.2843
                   L 112.0053 118.4284
                   C 113.7162 124.8774 108.8736 131.2042 102.2016 131.2368
                   L 78.5064 131.3525
                   C 71.94605 131.3845 67.06373 125.3014 68.51471 118.9034
                   L 86.325 40.3742Z"
                fill="currentColor"
            />
        </svg>
    );
}
