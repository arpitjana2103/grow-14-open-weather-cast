import type { TDailyWeather } from "@/schemas/weather.schema";

import { Suspense } from "react";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useLocationContext } from "@/contexts/location.context";
import { useUnitContext } from "@/contexts/unit.context";
import { cn } from "@/lib/utils";
import { useWeatherQuery } from "@/queries/weather.query";

import Container from "../../layout/Container";
import DayCard from "./DayCard";
import DailyWeatherCardSkeleton from "./skeletons/DailyWeatherCardSkeleton";

type Props = {
    className?: string;
};

export default function DailyWeatherCard({ className }: Props) {
    const { currentLatlng } = useLocationContext();
    const latlngKey = currentLatlng.join(",");
    return (
        <ErrorBoundary
            fallback={<DailyWeatherCardSkeleton className={className} />}
            resetKey={latlngKey}
        >
            <Suspense fallback={<DailyWeatherCardSkeleton className={className} />}>
                <DailyWeatherCardComponent className={className} />
            </Suspense>
        </ErrorBoundary>
    );
}

function DailyWeatherCardComponent({ className }: Props) {
    const {
        currentLatlng: [lat, lon],
    } = useLocationContext();
    const { unit } = useUnitContext();
    const { data } = useWeatherQuery(lat, lon, unit);
    const timezone = data.timezone;
    const dailyWeather = data.daily;

    if (!data) return null;

    return (
        <div className={cn("bg-primary/10 py-6 mt-6", className)}>
            <Container>
                <div className="relative w-full">
                    <div
                        className={cn(
                            "absolute right-0 z-1000 h-full w-10 sm:w-20 md:w-30 lgxl:block",
                            "bg-[linear-gradient(90deg,transparent_0%,#FFF3E5_90%,#FFF3E5_100%)]",
                            "dark:bg-[linear-gradient(90deg,transparent_0%,#05122F_90%,#05122F_100%)]",
                        )}
                    />
                    <div className="lite-scrollbar relative w-auto overflow-y-scroll pr-20">
                        <div className="flex w-fit gap-4 rounded-sm bg-transparent">
                            {dailyWeather.map(function (weather: TDailyWeather) {
                                return (
                                    <DayCard
                                        key={weather.dt}
                                        unit={unit}
                                        timezone={timezone}
                                        weather={weather}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
