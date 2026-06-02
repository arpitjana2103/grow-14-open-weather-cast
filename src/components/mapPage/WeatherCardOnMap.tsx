import { Location01Icon, Time01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { NavLink } from "react-router";

import { useLocationContext } from "@/contexts/location.context";
import { useUnitContext, WeatherUnits } from "@/contexts/unit.context";
import { cn } from "@/lib/utils";
import { useWeatherQuery } from "@/queries/weather.query";
import { getTimeDetails } from "@/utils/time-fn.util";

import { Button } from "../ui/button";
import WeatherIcons from "../WeatherIcons";

export default function WeatherCardOnMap({ className }: { className?: string }) {
    const { currentLocation } = useLocationContext();
    const { display_place, address } = currentLocation ?? {};
    const { state, country, postcode, quarter, city, municipality, state_district, region, town } =
        address ?? {};
    const _address = [
        display_place || quarter || city || town || municipality || state_district || region,
        country,
        state,
        postcode,
    ]
        .filter(Boolean)
        .join(", ");

    const { unit: unitType } = useUnitContext();
    const { isFetching, data } = useWeatherQuery(
        Number(currentLocation?.lat || 0),
        Number(currentLocation?.lon || 0),
        unitType,
    );
    const icon = data?.current.weather[0].icon;
    const description = data?.current.weather[0].description;
    const temperature = data?.current.temp;
    const feelsLike = data?.current.feels_like;
    const utcTimestampInSeconds = data?.current.dt || 0;
    const timezone = data?.timezone || "";

    if (isFetching) return "Loading...";

    const timeDetails = getTimeDetails({
        utcTimestampInSeconds: utcTimestampInSeconds,
        timezone: timezone,
    });
    const { timezoneOffset, hour12, minute, period } = timeDetails;
    const tempUnit = WeatherUnits[unitType].temp;

    return (
        <div
            className={cn(
                "w-[18rem] rounded-md bg-linear-to-bl to-orange-400 from-orange-100/10 p-2 shadow-2xl sm:p-3 dark:to-blue-500 dark:from-slate-900/10",
                className,
            )}
        >
            <div className={cn("bg-background p-3 rounded-md ")}>
                <div className="flex flex-col text-secondary-foreground">
                    <span className="text-sm">
                        <HugeiconsIcon
                            icon={Time01Icon}
                            className="mr-1 inline w-4 -translate-y-0.5"
                        />
                        {`${hour12}:${minute} ${period.toLocaleLowerCase()} (${timezoneOffset})`}
                    </span>
                    <span className="flex gap-2">
                        <span className="text-sm">
                            <HugeiconsIcon
                                icon={Location01Icon}
                                className="mr-1 inline w-4 translate-y-[-0.2rem]"
                            />
                            {_address}
                        </span>
                    </span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                    <WeatherIcons
                        type={icon!}
                        strokeWidth={1}
                        className="align-end block h-12 w-12 text-primary"
                    />
                    <span className="flex flex-col">
                        <span className="border-b border-border text-xl text-primary">
                            {Math.round(temperature!)}
                            {tempUnit}
                        </span>

                        <span className="block pt-0.5 text-lg text-secondary-foreground">
                            {Math.round(feelsLike!)}
                            {tempUnit}
                        </span>
                    </span>
                </div>

                <span>
                    <span className="flex items-end gap-3">
                        <span className="text-lg">{description}</span>
                    </span>
                    <span></span>
                </span>

                <div className="flex justify-end">
                    <NavLink to="/forecast">
                        <Button className="mt-4 w-fit cursor-pointer border-primary bg-primary/10 py-4 text-base font-normal text-primary hover:bg-primary/20">
                            See Full Forecast
                        </Button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
