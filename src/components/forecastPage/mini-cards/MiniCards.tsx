import { Suspense } from "react";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useLocationContext } from "@/contexts/location.context";
import { useUnitContext } from "@/contexts/unit.context";
import { useWeatherQuery } from "@/queries/weather.query";
import { getTimeDetails } from "@/utils/time-fn.util";

import Clouds from "./Clouds";
import Humidity from "./Humidity";
import MoonRise from "./MoonRise";
import Precipitation from "./Precipitation";
import MiniCardsSkeleton from "./skeletons/MiniCardsSkeleton";
import SunRise from "./SunRise";
import UVIndex from "./UVIndex";
import Visibility from "./Visibility";
import Wind from "./Wind";

export default function MiniCard() {
    const { currentLatlng } = useLocationContext();
    const latlngKey = currentLatlng.join(",");
    return (
        <ErrorBoundary fallback={<MiniCardsSkeleton />} resetKey={latlngKey}>
            <Suspense fallback={<MiniCardsSkeleton />}>
                <MiniCardsComponent />
            </Suspense>
        </ErrorBoundary>
    );
}

export function MiniCardsComponent() {
    const {
        currentLatlng: [lat, lon],
    } = useLocationContext();
    const { unit } = useUnitContext();
    const { data } = useWeatherQuery(lat, lon, unit);
    const timezone = data.timezone;
    const sunRiseDt = data.current.sunrise;
    const sunSetDt = data.current.sunset;
    const currentTimeDt = data.current.dt;
    const moonRiseDt = data.daily[0].moonrise;
    const moonSetDt = data.daily[0].moonset;
    const windSpeed = data.current.wind_speed;
    const windDeg = data.current.wind_deg;
    const pop = data.daily[0].pop;
    const rain = data.daily[0].rain;
    const snow = data.daily[0].snow;
    const uvIndex = data.current.uvi;
    const visibility = data.current.visibility;
    const humidity = data.current.humidity;
    const dewPoint = data.current.dew_point;
    const clouds = data.current.clouds;
    const { hour12, minute, period, timezoneOffset } = getTimeDetails({
        utcTimestampInSeconds: currentTimeDt,
        timezone,
    });
    return (
        <div className="mt-12">
            <p className="text-secondary-foreground">{`Weather details - ${hour12}:${minute} ${period.toLocaleLowerCase()} (${timezoneOffset})`}</p>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:grid-rows-none md:grid-cols-4 lg:grid-cols-5 lgxl:grid-cols-6">
                <SunRise
                    sunRiseDt={sunRiseDt}
                    sunSetDt={sunSetDt}
                    currentTimeDt={currentTimeDt}
                    timezone={timezone}
                    className="aspect-square w-full overflow-auto rounded-md"
                />
                <MoonRise
                    timezone={timezone}
                    moonRiseDt={moonRiseDt}
                    moonSetDt={moonSetDt}
                    currentTimeDt={currentTimeDt}
                    className="aspect-square w-full overflow-auto rounded-md"
                />
                <Visibility
                    visibility={visibility}
                    className="aspect-square w-full overflow-auto rounded-md"
                />
                <Wind
                    unit={unit}
                    windSpeed={windSpeed}
                    windDeg={windDeg}
                    className="aspect-square w-full overflow-auto rounded-md"
                />
                <UVIndex
                    uvIndex={uvIndex}
                    className="aspect-square w-full overflow-auto rounded-md"
                />
                <Precipitation
                    pop={pop}
                    rain={rain}
                    snow={snow}
                    className="aspect-square w-full overflow-auto rounded-md"
                />

                <Humidity
                    humidity={humidity}
                    dewPoint={dewPoint}
                    unit={unit}
                    className="aspect-square w-full overflow-auto rounded-md"
                />
                <Clouds clouds={clouds} className="aspect-square w-full overflow-auto rounded-md" />
            </div>
        </div>
    );
}
