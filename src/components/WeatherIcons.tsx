import type { TWeatherIcon } from "../schemas/weather.schema";

import clsx from "clsx";

import img01d from "../assets/01d.png";
import img01n from "../assets/01n.png";
import img02d from "../assets/02d.png";
import img02n from "../assets/02n.png";
import img03d from "../assets/03d.png";
import img03n from "../assets/03n.png";
import img04d from "../assets/04d.png";
import img04n from "../assets/04n.png";
import img09d from "../assets/09d.png";
import img09n from "../assets/09n.png";
import img10d from "../assets/10d.png";
import img10n from "../assets/10n.png";
import img11d from "../assets/11d.png";
import img11n from "../assets/11n.png";
import img13d from "../assets/13d.png";
import img13n from "../assets/13n.png";
import img50d from "../assets/50d.png";
import img50n from "../assets/50n.png";
import imgFullmoon from "../assets/fullmoon.png";
import imgHumidity from "../assets/humidity.png";
import imgMoonphase from "../assets/moonphase.png";
import imgMoonrise from "../assets/moonrise.png";
import imgMoonset from "../assets/moonset.png";
import imgPressure from "../assets/pressure.png";
import imgRainchance from "../assets/rainchance.png";
import imgSunrise from "../assets/sunrise.png";
import imgSunset from "../assets/sunset.png";
import imgUvindex from "../assets/uvindex.png";
import imgWindspeed from "../assets/windspeed.png";

type TIcons =
    | TWeatherIcon
    | "fullmoon"
    | "humidity"
    | "moonphase"
    | "moonrise"
    | "moonset"
    | "pressure"
    | "rainchance"
    | "sunrise"
    | "sunset"
    | "uvindex"
    | "windspeed";

type TIconSize = "sm" | "md" | "lg";

type TProps = {
    type: TIcons;
    size?: TIconSize;
    className?: string;
};

const ICONS: Record<TIcons, string> = {
    "01d": img01d,
    "01n": img01n,
    "02d": img02d,
    "02n": img02n,
    "03d": img03d,
    "03n": img03n,
    "04d": img04d,
    "04n": img04n,
    "09d": img09d,
    "09n": img09n,
    "10d": img10d,
    "10n": img10n,
    "11d": img11d,
    "11n": img11n,
    "13d": img13d,
    "13n": img13n,
    "50d": img50d,
    "50n": img50n,
    fullmoon: imgFullmoon,
    humidity: imgHumidity,
    moonphase: imgMoonphase,
    moonrise: imgMoonrise,
    moonset: imgMoonset,
    pressure: imgPressure,
    rainchance: imgRainchance,
    sunrise: imgSunrise,
    sunset: imgSunset,
    uvindex: imgUvindex,
    windspeed: imgWindspeed,
} as const satisfies Record<TIcons, string>;

const sizes = {
    sm: "h-[4.5rem] w-[4.5rem]",
    md: "h-[6rem] w-[6rem]",
    lg: "h-[9rem] w-[9rem]",
} as const satisfies Record<TIconSize, string>;

export default function WeatherIcons({ type, size = "sm", className = "" }: TProps) {
    return <img className={clsx(sizes[size], className)} src={ICONS[type]} alt={type} />;
}
