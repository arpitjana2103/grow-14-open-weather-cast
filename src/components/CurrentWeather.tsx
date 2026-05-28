import { MapContainer, Marker, TileLayer } from "react-leaflet";

import { useLocationContext } from "@/contexts/location.context";
import { cn } from "@/lib/utils";
import { useWeatherQuery } from "@/queries/weather.query";
import { getTimeDetails, type TTimeDetails } from "@/utils/time-fn.util";

import WeatherIcons from "./WeatherIcons";

export default function CurrentWeather() {
    const { currentLocation } = useLocationContext();
    const { isFetching, data } = useWeatherQuery(
        Number(currentLocation?.lat || 0),
        Number(currentLocation?.lon || 0),
    );

    const icon = data?.current.weather[0].icon;
    const description = data?.current.weather[0].description;
    const temperature = data?.current.temp;
    const timeObj = getTimeDetails({
        utcTimestampInSeconds: data?.current.dt || 0,
        timezone: data?.timezone || "",
    });

    if (isFetching) return <div>Loading...</div>;

    return (
        <div className="bg-primary/15 p-4">
            <div
                className={cn(
                    "grid gap-4",
                    "h-124 grid-cols-[15rem_auto_auto] grid-rows-2",
                    "mdlg:h-64 mdlg:grid-cols-[16rem_auto_16rem] mdlg:grid-rows-1",
                )}
            >
                <ImageOverlay icon={icon!} className="aspect-square w-full" />
                <div className={cn("col-span-2 col-start-2", "mdlg:col-span-1")}>Green</div>
                <MiniMap
                    lat={Number(currentLocation?.lat || 0)}
                    lon={Number(currentLocation?.lon || 0)}
                    className={cn("w-full aspect-square, col-span-3", "mdlg:col-span-1", "")}
                />
            </div>
            {/*<ImageOverlay className="col-span-1" icon={icon!} />
            <div></div>
            <MiniMap
                className="col-span-1 -col-start-1"
                lat={Number(currentLocation?.lat || 0)}
                lon={Number(currentLocation?.lon || 0)}
            />*/}
            {/*<div>
                <WeatherIcons type={icon!} size="lg" />
                <span>{temperature}</span>
                <span>{description}</span>
            </div>*/}
        </div>
    );
}

function Time({ timeDetails }: { timeDetails: TTimeDetails }) {
    return <div>TimeDetails</div>;
}

const weatherImageDescription: Record<string, string> = {
    "01d": "Bright crystal clear sky",
    "01n": "Calm starlit clear night",

    "02d": "Sunny skies with clouds",
    "02n": "Cloudy calm night sky",

    "03d": "Soft scattered clouds",
    "03n": "Gentle cloudy evening",

    "04d": "Thick clouds overhead",
    "04n": "Heavy clouds at night",

    "09d": "Passing daytime showers",
    "09n": "Cool rainy night air",

    "10d": "Steady rain all around",
    "10n": "Relaxing nighttime rain",

    "11d": "Thunderstorms on horizon",
    "11n": "Loud stormy night sky",

    "13d": "Fresh snow covering tree",
    "13n": "Silent freezing snowfall",

    "50d": "Mist covering far views",
    "50n": "Foggy low visibility",
} as const;

function ImageOverlay({ icon, className }: { icon: string; className?: string }) {
    return (
        <div
            className={cn(
                "relative overflow-hidden border-3 border-primary/60 dark:border-primary ",
                className,
            )}
        >
            {/* Background weather image */}
            <img
                src={`/images/${icon}.jpg`}
                alt={weatherImageDescription[icon]}
                className="absolute inset-0 h-auto w-full object-cover"
            />

            {/* Dark gradient overlay (transparent → black, bottom-heavy) */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0), rgba(255,255,255,0), rgba(0,0,0,0.8))",
                }}
            />

            {/* Content pinned to bottom */}
            <div className="absolute bottom-0 z-10 px-4 py-2.5 text-left text-sm leading-5.5 text-white/95">
                <p>{weatherImageDescription[icon]}</p>
            </div>
        </div>
    );
}

function MiniMap({ lat, lon, className }: { lat: number; lon: number; className?: string }) {
    return (
        <div className={cn(className, "border-3 border-primary/60 dark:border-primary")}>
            <MapContainer
                center={[lat, lon]}
                zoom={7}
                scrollWheelZoom={true}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lon]} />
            </MapContainer>
        </div>
    );
}
