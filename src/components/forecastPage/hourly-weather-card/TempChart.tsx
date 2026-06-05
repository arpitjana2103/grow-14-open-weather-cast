"use client";

import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import WeatherIcons from "@/components/WeatherIcons";
import { useLocationContext } from "@/contexts/location.context";
import { useUnitContext } from "@/contexts/unit.context";
import { useWeatherQuery } from "@/queries/weather.query";
import { getTimeDetails } from "@/utils/time-fn.util";

const CustomToolTip = function ({ active, payload, label }: any) {
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
        <div className="rounded-sm bg-slate-900 p-3 shadow-sm dark:bg-slate-50">
            <p className="mb-2 font-semibold text-slate-300 dark:text-slate-800">{`${hour12}:${minute} ${period}`}</p>
            {payload.map((entry: any) => (
                <p key={entry.dataKey} style={{ color: entry.color }}>
                    {entry.name.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}
                    &nbsp;:&nbsp;{Math.round(entry.value)}°
                </p>
            ))}
        </div>
    );
};

// Custom tick renders a HugeIcon above the tick value
const CustomXTick = ({ x, y, payload, hourlyDataMap }: any) => {
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
                <div className="flex w-20 translate-x-[-2rem] flex-col items-center justify-center text-secondary-foreground">
                    <WeatherIcons
                        strokeWidth={1}
                        type={icon}
                        className="mb-[0.3rem] h-8 w-8 text-primary"
                    />
                    <span>{timeTxt}</span>
                    <span>
                        {timeData.hour12}:{timeData.minute} {timeData.period}
                    </span>
                    <span className="mt-[0.3rem] flex">
                        <span className="font-semibold text-primary">{Math.round(temp)}°</span>
                        &nbsp;/&nbsp;
                        <span>{Math.round(feelsLike)}°</span>
                    </span>
                </div>
            </foreignObject>
            <text
                x={0}
                y={iconSize + 14}
                textAnchor="middle"
                fill="currentColor"
                fontSize={11}
                opacity={0.7}
            >
                <tspan></tspan>
                <tspan> </tspan>
            </text>
        </g>
    );
};

export const description = "An area chart with axes";

const MIN_SLOT = 1;
const MAX_SLOT = 4;
export function TempChart() {
    const [slot, setSlot] = useState(MIN_SLOT);

    const { currentLocation } = useLocationContext();
    const { unit: unitType } = useUnitContext();
    const { isFetching, data } = useWeatherQuery(
        Number(currentLocation?.lat || 0),
        Number(currentLocation?.lon || 0),
        unitType,
    );
    const timezone = data?.timezone;
    const hourlyData = data?.hourly;
    const hourlyDataMap = useMemo(
        () =>
            new Map(
                hourlyData?.map((hour) => {
                    const timeData = getTimeDetails({
                        utcTimestampInSeconds: hour.dt,
                        timezone: timezone!,
                    });

                    return [
                        timeData.ISOString,
                        {
                            timeData,
                            temp: hour.temp,
                            feels_like: hour.feels_like,
                            uvi: hour.uvi,
                            icon: hour.weather[0].icon,
                        },
                    ];
                }),
            ),
        [hourlyData, timezone],
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
    const minWidthPerPoint = 80;

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
        <div className="mt-6 w-full max-w-280 rounded-md border border-border/30 bg-slate-100 p-4 shadow-2xs dark:bg-slate-900">
            <div className="mb-4 flex w-full justify-between gap-0">
                <span className="text-sm">Temperature ( Actual / Feels Like )</span>
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
                            <CartesianGrid vertical={true} horizontal={true} />
                            <XAxis
                                dataKey="time"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                interval={0}
                                tick={<CustomXTick hourlyDataMap={hourlyDataMap} />}
                                height={44}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickCount={5}
                                height={50}
                            />
                            <ChartTooltip cursor={true} content={<CustomToolTip />} />
                            {/*<ChartTooltip cursor={true} content={<ChartTooltipContent />} />*/}
                            <Area
                                dataKey="actual"
                                type="natural"
                                fill="var(--color-actual)"
                                fillOpacity={0.4}
                                stroke="var(--color-actual)"
                                stackId="a"
                            />
                            <Area
                                dataKey="feels_like"
                                type="natural"
                                fill="var(--color-feels_like)"
                                fillOpacity={0.4}
                                stroke="var(--color-feels_like)"
                                stackId="a"
                            />
                        </AreaChart>
                    </ChartContainer>
                </div>
            </div>
        </div>
    );
}
