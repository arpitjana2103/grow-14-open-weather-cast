import type { TWeatherIcon } from "@/schemas/weather.schema";

import {
    ArrowUpBigIcon,
    DropletIcon,
    EyeIcon,
    FastWindIcon,
    SoilTemperatureGlobalIcon,
    Timer01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import WeatherIcons from "@/components/WeatherIcons";
import { WeatherUnits, type TUnit } from "@/contexts/unit.context";
import { cn } from "@/lib/utils";

type Props = {
    icon: TWeatherIcon;
    unitType: TUnit;
    temperature: number;
    feelsLike: number;
    description: string;
    wind_speed: number;
    wind_deg: number;
    humidity: number;
    visibility: number;
    pressure: number;
    dew_point: number;
    className?: string;
};

export default function CurrentWeatherDetails({
    icon,
    unitType,
    temperature,
    feelsLike,
    description,
    wind_speed,
    wind_deg,
    humidity,
    visibility,
    pressure,
    dew_point,
    className,
}: Props) {
    const tempUnit = WeatherUnits[unitType].temp;
    const windSpeedUnit = WeatherUnits[unitType].wind_speed;
    const humidityUnit = WeatherUnits[unitType].humidity;
    const visibilityUnit = WeatherUnits[unitType].visibility;
    const pressureUnit = WeatherUnits[unitType].pressure;
    const dewPointUnit = WeatherUnits[unitType].dew_point;

    const wData = [
        {
            name: "Wind",
            val: wind_speed,
            unit: windSpeedUnit,
            icon: FastWindIcon,
            wind_deg: wind_deg,
        },
        { name: "Humidity", val: humidity, unit: humidityUnit, icon: DropletIcon },
        { name: "Visibility", val: visibility, unit: visibilityUnit, icon: EyeIcon },
        { name: "Pressure", val: pressure, unit: pressureUnit, icon: Timer01Icon },
        { name: "Dew Point", val: dew_point, unit: dewPointUnit, icon: SoilTemperatureGlobalIcon },
    ];

    return (
        <div className={cn("flex flex-col justify-between h-full gap-6", className)}>
            <div className="flex items-center gap-3">
                <WeatherIcons
                    type={icon}
                    strokeWidth={0.8}
                    className="align-end block h-18 w-18 text-primary xs:h-20 xs:w-20"
                />
                <span>
                    <span className="flex items-end gap-3 border-b-0">
                        <span className="flex items-start gap-1">
                            <span className="text-3xl font-bold text-secondary-foreground xs:text-5xl">
                                {Math.round(temperature)}
                            </span>
                            <span className="text-lg font-semibold text-secondary-foreground xs:text-2xl">
                                {tempUnit}
                            </span>
                        </span>
                        <span className="text-lg text-primary xs:text-2xl">{description}</span>
                    </span>
                    <span>
                        <span className="block pt-0.5 text-sm text-secondary-foreground xs:text-base">
                            Feels like : {Math.round(feelsLike)}
                            {tempUnit}
                        </span>
                    </span>
                </span>
            </div>
            <div className="lite-scrollbar w-full overflow-x-scroll">
                <div className="flex gap-1">
                    {wData.map((item) => (
                        <div
                            key={item.name}
                            className="flex w-fit flex-none flex-col rounded-sm border border-primary/20 bg-primary/20 p-2 shadow-2xs"
                        >
                            <span className="mb-1 flex items-center gap-1 text-sm text-primary">
                                <HugeiconsIcon icon={item.icon} className="h-4 w-4" />
                                <span>{item.name}</span>
                                {item.name === "Wind" && (
                                    <HugeiconsIcon
                                        className={`h-4 w-4 text-secondary-foreground`}
                                        style={{ transform: `rotate(${item.wind_deg!}deg)` }}
                                        icon={ArrowUpBigIcon}
                                        strokeWidth={2}
                                    />
                                )}
                            </span>
                            <span className="text-base text-secondary-foreground">
                                {item.val} {item.unit}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
