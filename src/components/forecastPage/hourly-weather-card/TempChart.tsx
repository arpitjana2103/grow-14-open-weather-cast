import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Suspense, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, type ChartConfig } from "@/components/ui/chart";
import WeatherIcons from "@/components/WeatherIcons";
import { useLocationContext } from "@/contexts/location.context";
import { useUnitContext, WeatherUnits } from "@/contexts/unit.context";
import { useWeatherQuery } from "@/queries/weather.query";
import { getTimeDetails } from "@/utils/time-fn.util";

import TempChartSkeleton from "./skeletons/TempChartSkeleton";

const CustomToolTip = function ({ active, payload, label, tempUnit }: any) {
    if (!active || !payload?.length) return null;
    const time = new Date(label);
    const [hour12, minute, period] = time
        .toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        .split(/:| /);

    return (
        <div className="rounded-sm bg-opposite-background p-3 shadow-sm">
            <p className="mb-2 font-semibold text-opposite-foreground">{`${hour12}:${minute} ${period}`}</p>
            {payload.map((entry: any) => (
                <p key={entry.dataKey} style={{ color: entry.color }}>
                    {entry.name.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}
                    &nbsp;:&nbsp;{Math.round(entry.value)} {tempUnit}
                </p>
            ))}
        </div>
    );
};

const CustomXTick = function ({ x, y, payload, hourlyDataMap, tempUnit }: any) {
    const ISOKey = payload.value;
    const hourData = hourlyDataMap.get(ISOKey);
    const timeData = hourData.timeData;
    const icon = hourData.icon;
    const temp: number = hourData.temp;
    const feelsLike = hourData.feels_like;

    const timeTxt = timeData.isToday
        ? "Today"
        : timeData.isTomorrow
          ? "Tomorrow"
          : `${timeData.day} ${timeData.shortMonth}`;

    const iconSize = 16;
    return (
        <g transform={`translate(${x},${y})`}>
            <foreignObject
                x={-iconSize / 2}
                y={2}
                width={iconSize}
                height={iconSize}
                style={{ overflow: "visible" }}
            >
                <div className="flex w-20 -translate-x-8 flex-col items-center justify-center text-secondary-foreground">
                    <WeatherIcons
                        strokeWidth={1}
                        type={icon}
                        className="mb-[0.3rem] h-8 w-8 text-secondary-foreground"
                    />
                    <span>{timeTxt}</span>
                    <span>
                        {timeData.hour12}:{timeData.minute} {timeData.period}
                    </span>
                    <span className="mt-[0.3rem] flex">
                        <span className="font-semibold text-secondary-foreground">
                            {Math.round(temp)}
                            {tempUnit}
                        </span>
                        &nbsp;&nbsp;
                        <span>
                            {Math.round(feelsLike)}
                            {tempUnit}
                        </span>
                    </span>
                </div>
            </foreignObject>
        </g>
    );
};

export default function TempChart() {
    const { currentLatlng } = useLocationContext();
    const latlngKey = currentLatlng.join(",");
    return (
        <ErrorBoundary fallback={<TempChartSkeleton />} resetKey={latlngKey}>
            <Suspense fallback={<TempChartSkeleton />}>
                <TempChartComponent />
            </Suspense>
        </ErrorBoundary>
    );
}

function TempChartComponent() {
    const MIN_SLOT = 1;
    const MAX_SLOT = 4;
    const [slot, setSlot] = useState(MIN_SLOT);

    const { currentLatlng } = useLocationContext();
    const { unit: unitType } = useUnitContext();
    const tempUnit = WeatherUnits[unitType].temp;
    const { isFetching, data } = useWeatherQuery(currentLatlng[0], currentLatlng[1], unitType);
    const timezone = data?.timezone;
    const hourlyData = data?.hourly;
    const hourlyDataMap = useMemo(
        () =>
            new Map(
                hourlyData?.map((hour) => {
                    const timeData = getTimeDetails({
                        utcTimestampInSeconds: hour.dt,
                        timezone: timezone,
                    });

                    return [
                        timeData.ISOString,
                        {
                            timeData,
                            temp: hour.temp,
                            feels_like: hour.feels_like,
                            uvi: hour.uvi,
                            icon: hour.weather[0].icon,
                            tempUnit: tempUnit,
                        },
                    ];
                }),
            ),
        [hourlyData, timezone, tempUnit],
    );

    const completeChartData = useMemo(
        () =>
            Array.from(hourlyDataMap.entries()).map(([time, hour]) => ({
                time,
                actual: hour.temp,
                feels_like: hour.feels_like,
            })),
        [hourlyDataMap],
    );

    const chartData = completeChartData.slice(12 * (slot - 1), 12 * slot);

    const chartConfig = {
        actual: {
            label: "Temperature",
            color: "var(--chart-1)",
        },
        feels_like: {
            label: "Feels Like",
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig;

    const dataPoints = chartData.length;
    const minWidthPerPoint = 85;

    function handlePlusSlot() {
        setSlot((s) => Math.min(s + 1, MAX_SLOT));
    }

    function handleMinusSlot() {
        setSlot((s) => Math.max(s - 1, MIN_SLOT));
    }

    if (isFetching) {
        return <div>Loading...</div>;
    }
    return (
        <div className="w-full rounded-md border border-border/30 bg-card/30 p-4 shadow-2xs">
            <div className="mb-4 flex w-full justify-between gap-0">
                <span className="text-sm text-primary">Temperature ( Actual / Feels Like )</span>
                <div>
                    <Button
                        className="h-8 w-9 cursor-pointer rounded-sm bg-transparent hover:bg-transparent"
                        onClick={handleMinusSlot}
                    >
                        <HugeiconsIcon
                            className="size-5 text-secondary-foreground"
                            icon={ArrowLeft01Icon}
                            strokeWidth={2}
                        />
                    </Button>
                    <Button
                        className="h-8 w-9 cursor-pointer rounded-sm bg-transparent hover:bg-transparent"
                        onClick={handlePlusSlot}
                    >
                        <HugeiconsIcon
                            className="size-5 text-secondary-foreground"
                            icon={ArrowRight01Icon}
                            strokeWidth={2}
                        />
                    </Button>
                </div>
            </div>
            <div className="lite-scrollbar relative w-full overflow-x-auto">
                <div style={{ minWidth: `${(dataPoints || 0) * minWidthPerPoint}px` }}>
                    <ChartContainer config={chartConfig} className="h-108 w-full">
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: -20,
                                right: 40,
                                bottom: 65,
                            }}
                        >
                            <CartesianGrid vertical={false} horizontal={false} />
                            <XAxis
                                dataKey="time"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                interval={0}
                                tick={
                                    <CustomXTick
                                        hourlyDataMap={hourlyDataMap}
                                        tempUnit={tempUnit}
                                    />
                                }
                                height={44}
                            />
                            <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={5} />
                            <ChartTooltip
                                cursor={true}
                                content={<CustomToolTip tempUnit={tempUnit} />}
                            />
                            <Area
                                dataKey="actual"
                                type="natural"
                                fill="url(#fillActual)"
                                fillOpacity={0.8}
                                stroke="var(--color-actual)"
                                strokeWidth={2}
                            />
                            <Area
                                dataKey="feels_like"
                                type="natural"
                                fill="url(#fillFeelsLike)"
                                fillOpacity={0}
                                stroke="var(--color-feels_like)"
                                strokeWidth={3}
                            />
                            <defs>
                                <linearGradient id="fillActual" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="10%"
                                        stopColor="var(--color-actual)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="90%"
                                        stopColor="var(--color-actual)"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                                <linearGradient id="fillFeelsLike" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-feels_like)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-feels_like)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>
                        </AreaChart>
                    </ChartContainer>
                </div>
            </div>
        </div>
    );
}
