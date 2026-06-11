import type { TAirPoluctants } from "@/schemas/weather.schema";

import { FastWindIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Triangle } from "lucide-react";

import { useLocationContext } from "@/contexts/location.context";
import { cn } from "@/lib/utils";
import { useAirPollutionQuery } from "@/queries/weather.query";

import { TooltipProvider } from "../ui/tooltip";

type Props = { className?: string };

type TAirQualityLevel = "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor";
type TAriQualityRanges = Record<TAirQualityLevel, { min: number; max: number }>;
type TAirQualityRanges = Record<TAirPoluctants, TAriQualityRanges>;
// const obj = {
//     so2: {
//         range: [
//             [0, 20],
//             [20, 80],
//             [80, 250],
//             [250, 350],
//             [350, Infinity],
//         ],
//         level: ["Good", "Fair", "Moderate", "Poor", "Very Poor"],
//         maxVal: 350,
//         minVal: 0,
//     },
// };

const airQualityRanges: TAirQualityRanges = {
    so2: {
        Good: { min: 0, max: 20 },
        Fair: { min: 20, max: 80 },
        Moderate: { min: 80, max: 250 },
        Poor: { min: 250, max: 350 },
        "Very Poor": { min: 350, max: Infinity },
    },
    no2: {
        Good: { min: 0, max: 40 },
        Fair: { min: 40, max: 70 },
        Moderate: { min: 70, max: 150 },
        Poor: { min: 150, max: 200 },
        "Very Poor": { min: 200, max: Infinity },
    },
    pm10: {
        Good: { min: 0, max: 20 },
        Fair: { min: 20, max: 50 },
        Moderate: { min: 50, max: 100 },
        Poor: { min: 100, max: 200 },
        "Very Poor": { min: 200, max: Infinity },
    },
    pm2_5: {
        Good: { min: 0, max: 10 },
        Fair: { min: 10, max: 25 },
        Moderate: { min: 25, max: 50 },
        Poor: { min: 50, max: 75 },
        "Very Poor": { min: 75, max: Infinity },
    },
    o3: {
        Good: { min: 0, max: 60 },
        Fair: { min: 60, max: 100 },
        Moderate: { min: 100, max: 140 },
        Poor: { min: 140, max: 180 },
        "Very Poor": { min: 180, max: Infinity },
    },
    co: {
        Good: { min: 0, max: 4400 },
        Fair: { min: 4400, max: 9400 },
        Moderate: { min: 9400, max: 12400 },
        Poor: { min: 12400, max: 15400 },
        "Very Poor": { min: 15400, max: Infinity },
    },
    no: {
        Good: { min: 0, max: 20 },
        Fair: { min: 20, max: 40 },
        Moderate: { min: 40, max: 60 },
        Poor: { min: 60, max: 80 },
        "Very Poor": { min: 80, max: Infinity },
    },
    nh3: {
        Good: { min: 0, max: 40 },
        Fair: { min: 40, max: 70 },
        Moderate: { min: 70, max: 150 },
        Poor: { min: 150, max: 200 },
        "Very Poor": { min: 200, max: Infinity },
    },
};

const pollutantNameMapping: Record<TAirPoluctants, string> = {
    so2: "Sulfur dioxide",
    no2: "Nitrogen dioxide",
    pm10: "Particulate matter 10",
    pm2_5: "Fine particles matter",
    o3: "Ozone",
    co: "Carbon monoxide",
    no: "Nitrogen monoxide",
    nh3: "Ammonia",
};

const aqiDescription = {
    des: "AQI (Air Quality Index) measures how clean or polluted the air is and its health effects.",
    rate: {
        "1": ["Good", "Air is clean, no risk"],
        "2": ["Fair", "Acceptable, minor concern for sensitive groups"],
        "3": ["Moderate", "Sensitive groups may experience health effects"],
        "4": ["Poor", "Unhealthy for most people, limit outdoor activity"],
        "5": ["Very Poor", "Serious health effects for all, avoid outdoor exposure"],
    },
};

const getPoluctantStats = function (poluctant: TAirPoluctants, value: number) {
    const poluctantName = pollutantNameMapping[poluctant];
    let maxValue = 0;
    let minValue = Infinity;
    let level = "";

    for (let key in airQualityRanges[poluctant]) {
        const mx = airQualityRanges[poluctant][key as TAirQualityLevel].max;
        const mn = airQualityRanges[poluctant][key as TAirQualityLevel].min;
        minValue = Math.min(minValue, mn);
        if (mx < Infinity) {
            maxValue = Math.max(maxValue, mx);
        }
        if (mn <= value && value <= mx) {
            level = key;
        }
    }

    return {
        poluctantName,
        level,
        minValue,
        maxValue,
    };
};

export default function Sidebar({ className }: Props) {
    const {
        currentLatlng: [lat, lon],
    } = useLocationContext();
    const { data } = useAirPollutionQuery(lat, lon);
    const aqi = data?.list[0].main?.aqi;
    const components = Object.entries(data?.list[0].components) as [[TAirPoluctants, number]];
    const [label, detail] = aqiDescription.rate[aqi.toString() as keyof typeof aqiDescription.rate];

    if (!data) return <div>Loading</div>;
    return (
        <div
            className={cn(
                "relative lite-scrollbar overflow-y-scroll rounded-md bg-card p-4 pb-10 smmd:pb-4 lgxl:pb-10",
                className,
            )}
        >
            <span className="absolute top-4 right-4">
                <HugeiconsIcon
                    icon={FastWindIcon}
                    className="h-10 w-10 text-primary"
                    strokeWidth={1.3}
                />
            </span>
            <div>
                <TooltipProvider>
                    <h1 className="text-primary">Air Quality</h1>
                    <div className="mt-1 mb-4 text-4xl">
                        <div>
                            <span className="text-secondary-foreground">AQI</span>
                            <span className="ml-2 font-bold text-primary">{aqi} </span>
                        </div>
                    </div>
                    <div className="mb-4 text-sm text-secondary-foreground">
                        <p>
                            {aqiDescription.des} <br />
                            AQI : {aqi} ( {label} ) — {detail}.
                        </p>
                    </div>
                </TooltipProvider>
            </div>
            <div className="grid grid-cols-1 gap-0 smmd:grid-cols-2 smmd:gap-4 mdlg:grid-cols-3 lgxl:grid-cols-1 lgxl:gap-0">
                {components.map(function ([poluctant, value]) {
                    const poluctantName = pollutantNameMapping[poluctant];
                    const { level, minValue, maxValue } = getPoluctantStats(poluctant, value);

                    return (
                        <PoluctantCard
                            key={poluctant}
                            poluctant={poluctant}
                            poluctantName={poluctantName}
                            level={level}
                            value={value}
                            minValue={minValue}
                            maxValue={maxValue}
                        />
                    );
                })}
            </div>
        </div>
    );
}

const PoluctantCard = function ({
    poluctant,
    poluctantName,
    value,
    minValue,
    maxValue,
}: {
    poluctant: string;
    poluctantName: string;
    level: string;
    value: number;
    minValue: number;
    maxValue: number;
}) {
    const _value = Math.min(maxValue, value);
    // const _value = maxValue;
    const percentage = ((_value - minValue) / (maxValue - minValue)) * 100;
    const _percentage = percentage < 1.5 ? 1.5 : percentage > 98.5 ? 98.5 : percentage;

    return (
        <div
            className={cn(
                "border-t smmd:border border-dashed border-border py-4 smmd:px-4 smmd:rounded-md lgxl:rounded-none lgxl:border-x-0 lgxl:border-b-0 lgxl:px-0",
            )}
        >
            <span className="font-semibold text-secondary-foreground">{poluctantName}</span>
            <div className="mb-6 flex items-center justify-between text-secondary-foreground">
                <span>{poluctant}</span>

                <span className="text-sm">{value} μg/m3</span>
            </div>
            <div className="relative mb-1 h-1.5 w-full rounded-full bg-[linear-gradient(90deg,#2B7FFF_0%,#00C950_25%,#BBF451_50%,#F0B100_75%,#FF0D0D_100%)] opacity-95">
                <div
                    style={{ left: `${_percentage}%` }}
                    className="absolute -top-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-transparent"
                >
                    <Triangle
                        fill="currentColor"
                        className="h-3 w-3 rotate-180 text-secondary-foreground"
                    />
                </div>
            </div>
            <div className="flex w-full items-center justify-between text-xs text-secondary-foreground/90">
                <span>GOOD </span>
                <span>FAIR </span>
                <span>MODERATE </span>
                <span>POOR </span>
                <span>WORST</span>
            </div>
        </div>
    );
};

// function AQITooltip({ aqi }: { aqi: number }) {
//     const [label, detail] = aqiDescription.rate[aqi.toString() as keyof typeof aqiDescription.rate];
//     return (
//         <Tooltip>
//             <TooltipTrigger asChild>
//                 <span className="ml-4 -translate-y-1.5 cursor-pointer text-secondary-foreground transition-colors hover:text-primary">
//                     <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} size={13} />
//                 </span>
//             </TooltipTrigger>
//             <CustomToolTipContent>
//                 <div>
//                     <div className="">{aqiDescription.des}</div>
//                     <div>
//                         AQI : {aqi} ( {label} ) — {detail}.
//                     </div>
//                 </div>
//             </CustomToolTipContent>
//         </Tooltip>
//     );
// }

// function ColorToolTip({ className, message }: { className: string; message: string }) {
//     return (
//         <Tooltip>
//             <TooltipTrigger asChild>
//                 <span className={cn("cursor-pointer rounded-full", className)} />
//             </TooltipTrigger>
//             <CustomToolTipContent>
//                 <div>{message}</div>
//             </CustomToolTipContent>
//         </Tooltip>
//     );
// }
