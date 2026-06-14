import { Sun03Icon, SunriseIcon, SunsetIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { useLocationContext } from "@/contexts/location.context";
import { useUnitContext } from "@/contexts/unit.context";
import { cn } from "@/lib/utils";
import { useWeatherQuery } from "@/queries/weather.query";
import { getTimeDetails } from "@/utils/time-fn.util";

type Props = {
    className?: string;
};

function getDaylightDuration(
    sunrise: {
        hh: number;
        mm: number;
    },
    sunset: {
        hh: number;
        mm: number;
    },
) {
    const sunriseMinutes = sunrise.hh * 60 + sunrise.mm;
    const sunsetMinutes = sunset.hh * 60 + sunset.mm;

    const totalMinutes = sunsetMinutes - sunriseMinutes;

    return {
        hours: Math.floor(totalMinutes / 60),
        minutes: totalMinutes % 60,
    };
}

function getSunAngleDegree(currentTimeDt: number, sunRiseDt: number, sunSetDt: number): number {
    if (currentTimeDt <= sunRiseDt) {
        return 0;
    } else if (currentTimeDt >= sunSetDt) {
        return 180;
    } else {
        const progress = (currentTimeDt - sunRiseDt) / (sunSetDt - sunRiseDt);
        return progress * 180;
    }
}

export default function SunRise({ className }: Props) {
    const {
        currentLatlng: [lat, lon],
    } = useLocationContext();
    const { unit } = useUnitContext();
    const { data } = useWeatherQuery(lat, lon, unit);
    const timezone = data.timezone;
    const sunRiseDt = data.current.sunrise;
    const sunSetDt = data.current.sunset;
    const currentTimeDt = data.current.dt;
    if (!sunRiseDt || !sunSetDt) return null;

    const valueDeg = getSunAngleDegree(currentTimeDt, sunRiseDt, sunSetDt);
    const angle = Math.PI - (valueDeg * Math.PI) / 180;
    const x = 50 + 50 * Math.cos(angle);
    const y = 100 - 100 * Math.sin(angle);

    const sunRiseTime = getTimeDetails({ utcTimestampInSeconds: sunRiseDt, timezone: timezone });
    const sunSetTime = getTimeDetails({ utcTimestampInSeconds: sunSetDt, timezone: timezone });
    const dayLightDuration = getDaylightDuration(
        { hh: +sunRiseTime.hour24, mm: +sunRiseTime.minute },
        { hh: +sunSetTime.hour24, mm: +sunSetTime.minute },
    );
    const currentTime = getTimeDetails({
        utcTimestampInSeconds: currentTimeDt,
        timezone: timezone,
    });

    return (
        <div
            className={cn(
                "border border-border/30 shadow-2xs p-4 pt-8 flex flex-col w-full justify-between bg-card",
                className,
            )}
        >
            <div className="px-4">
                <div className="relative aspect-2/1 w-full rounded-t-full border-[1.5px] border-b-0 border-dashed border-orange-400">
                    <div
                        className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card"
                        style={{
                            left: `${x}%`,
                            top: `${y}%`,
                        }}
                    >
                        <HugeiconsIcon
                            size={25}
                            icon={Sun03Icon}
                            strokeWidth={1.5}
                            className={cn(
                                "text-orange-400",
                                valueDeg === 0 && "text-secondary-foreground",
                            )}
                            fill="currentColor"
                        />
                    </div>

                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-secondary-foreground">{`${currentTime.hour24}:${currentTime.minute}`}</span>
                </div>
            </div>

            <div className="pt-3">
                <p className="mx-auto text-center text-sm text-secondary-foreground">{`${dayLightDuration.hours} hrs ${dayLightDuration.minutes} mins`}</p>
            </div>

            <div className="flex justify-between">
                <p className="flex flex-col items-start">
                    <span>
                        <HugeiconsIcon
                            icon={SunriseIcon}
                            strokeWidth={1.5}
                            size={25}
                            className="text-secondary"
                        />
                    </span>
                    <span className="pt-2 text-lg leading-none font-semibold text-orange-400">{`${sunRiseTime.hour24}:${sunRiseTime.minute}`}</span>
                </p>
                <p className="flex flex-col items-end">
                    <span>
                        <HugeiconsIcon
                            icon={SunsetIcon}
                            strokeWidth={1.5}
                            size={25}
                            className="text-secondary"
                        />
                    </span>
                    <span className="pt-2 text-lg leading-none font-semibold text-orange-400">{`${sunSetTime.hour24}:${sunSetTime.minute}`}</span>
                </p>
            </div>
        </div>
    );
}
