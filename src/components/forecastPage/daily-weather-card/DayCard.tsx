import type { TDailyWeather } from "@/schemas/weather.schema";

import {
    ArrowUpBigIcon,
    CloudMidRainIcon,
    DropletIcon,
    FastWindIcon,
    InformationCircleIcon,
    Timer01Icon,
    Uv01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
    CustomToolTipContent,
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import WeatherIcons from "@/components/WeatherIcons";
import { WeatherUnits, type TUnit } from "@/contexts/unit.context";
import { cn } from "@/lib/utils";
import { getTimeDetails } from "@/utils/time-fn.util";

import ImageOverlay from "../current-weather-card/ImageOverlay";

export default function DayCard({
    unit,
    timezone,
    weather,
}: {
    timezone: string;
    weather: TDailyWeather;
    className?: string;
    unit: TUnit;
}) {
    const timeDetails = getTimeDetails({ utcTimestampInSeconds: weather.dt, timezone: timezone });
    const { day, month, isToday, isTomorrow, weekDay } = timeDetails;
    const icon = weather.weather[0].icon;
    const temp = Math.round(weather.temp.day);
    const feelsLike = Math.round(weather.feels_like.day);
    const tempUnit = WeatherUnits[unit].temp;
    const uvi = weather.uvi;
    const rainChance = Math.round(weather.pop * 100);
    const wind_speed = weather.wind_speed;
    const wind_deg = weather.wind_deg;
    const windUnit = WeatherUnits[unit].wind_speed;
    const humidity = weather.humidity;
    const pressure = weather.pressure;
    const pressureUnit = WeatherUnits[unit].pressure;
    const summary = weather.summary;
    const description = weather.weather[0].description;
    return (
        <div
            className={cn(
                "p-3 xs:p-2.5 bg-background shadow-2xs rounded-md border border-primary/60 text-secondary-foreground cursor-pointer w-48 xs:w-44",
            )}
        >
            <ImageOverlay icon={icon} className="aspect-square w-full" />
            <div className="mt-2 text-xs">
                {isToday && "Today"}
                {isTomorrow && "Tomorrow"}
                {!isToday && !isTomorrow && `${weekDay}, ${day} ${month}`}
            </div>
            <div className="mt-1 flex flex-col gap-2">
                <div>
                    <div className="flex items-end gap-2">
                        <WeatherIcons
                            type={icon}
                            strokeWidth={1}
                            className="h-8 w-8 text-primary"
                        />

                        <span className="text-lg">
                            <span className="mr-2 font-semibold">{`${temp}${tempUnit}`}</span>
                            <span className="text-base">{`${feelsLike}${tempUnit}`}</span>
                        </span>
                    </div>
                    <TooltipProvider key={weather.dt}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center gap-1">
                                    <span className="text-sm">{description}</span>
                                    <span>
                                        <HugeiconsIcon
                                            size={10}
                                            strokeWidth={2.5}
                                            icon={InformationCircleIcon}
                                        />
                                    </span>
                                </div>
                            </TooltipTrigger>
                            <CustomToolTipContent className="cursor-pointer">
                                <span>{summary}</span>
                            </CustomToolTipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span>
                        <HugeiconsIcon icon={FastWindIcon} size={15} strokeWidth={2} />
                    </span>
                    <span>{`${wind_speed} ${windUnit}`}</span>
                    <HugeiconsIcon
                        className={`h-4 w-4 text-secondary-foreground`}
                        style={{ transform: `rotate(${wind_deg}deg)` }}
                        icon={ArrowUpBigIcon}
                        strokeWidth={2}
                    />
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span>
                        <HugeiconsIcon icon={CloudMidRainIcon} size={15} strokeWidth={2} />
                    </span>
                    <span>{`Rain Chance : ${rainChance} %`}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span>
                        <HugeiconsIcon icon={DropletIcon} size={15} strokeWidth={2} />
                    </span>
                    <span>{`Humidity : ${humidity} %`}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                    <span>
                        <HugeiconsIcon icon={Uv01Icon} size={15} strokeWidth={2} />
                    </span>
                    <span>{`UV Index : ${uvi}`}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                    <span>
                        <HugeiconsIcon icon={Timer01Icon} size={14} strokeWidth={2} />
                    </span>
                    <span>{`Pressure : ${pressure} ${pressureUnit}`}</span>
                </div>
            </div>
        </div>
    );
}
