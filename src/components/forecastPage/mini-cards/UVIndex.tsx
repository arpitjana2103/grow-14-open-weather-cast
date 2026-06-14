import { Uv02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Triangle } from "lucide-react";

import { useLocationContext } from "@/contexts/location.context";
import { useUnitContext } from "@/contexts/unit.context";
import { cn } from "@/lib/utils";
import { useWeatherQuery } from "@/queries/weather.query";

type Props = {
    className?: string;
};

function getUVMessage(uvIndex: number) {
    if (uvIndex <= 2) {
        return "Low UV. Minimal sun protection required.";
    }

    if (uvIndex <= 5) {
        return "Moderate UV. Consider sunscreen and sunglasses.";
    }

    if (uvIndex <= 7) {
        return "High UV. Use sunscreen and seek shade during midday.";
    }

    if (uvIndex <= 10) {
        return "Very High UV. Minimize direct sun exposure.";
    }

    return "Extreme UV. Avoid prolonged sun exposure and use full protection.";
}

export default function UVIndex({ className }: Props) {
    const {
        currentLatlng: [lat, lon],
    } = useLocationContext();
    const { unit } = useUnitContext();
    const { data } = useWeatherQuery(lat, lon, unit);
    const uvIndex = data.current.uvi;
    const percentage = Math.min((uvIndex / 11) * 100, 100);
    const _percentage = percentage < 1.5 ? 1.5 : percentage > 98.5 ? 98.5 : percentage;

    console.log(uvIndex);

    return (
        <div
            className={cn(
                " flex flex-col justify-between border relative border-border/30 shadow-2xs p-4 bg-card",
                className,
            )}
        >
            <span className="absolute top-4 right-4 text-xs text-secondary-foreground">
                UV Index
            </span>
            <div className="flex items-center gap-1">
                <span>
                    <HugeiconsIcon
                        icon={Uv02Icon}
                        size={25}
                        strokeWidth={1.5}
                        className="text-secondary-foreground"
                    />
                </span>
                <span className="mr-1 text-2xl leading-none font-semibold text-orange-400">
                    {uvIndex}
                </span>
            </div>
            <div className="flex flex-col gap-3 pt-4">
                <div className="relative mb-1 h-1.5 w-full rounded-full bg-[linear-gradient(90deg,#2b7fff_0%,#00bc7d_25%,#BBF451_50%,#ff6900_75%,#fb2c36_100%)] opacity-95">
                    <div
                        style={{ left: `${_percentage}%` }}
                        className="absolute -top-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-transparent"
                    >
                        <Triangle
                            fill="currentColor"
                            className="h-3 w-3 rotate-180 text-secondary-foreground"
                        />
                    </div>
                    <div className="flex w-full items-center justify-between pt-2.5 text-xs text-secondary-foreground/90">
                        <span>1</span>
                        <span>3.5</span>
                        <span>6</span>
                        <span>8.5</span>
                        <span>11+</span>
                    </div>
                </div>

                <p className="mt-3 text-sm leading-5 text-secondary-foreground">
                    {getUVMessage(uvIndex)}
                </p>
            </div>
        </div>
    );
}
