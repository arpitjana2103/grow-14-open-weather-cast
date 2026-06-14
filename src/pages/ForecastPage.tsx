import CurrentWeatherCard from "@/components/forecastPage/current-weather-card/CurrentWeatherCard";
import DailyWeatherCard from "@/components/forecastPage/daily-weather-card/DailyWeatehrCard";
import Charts from "@/components/forecastPage/hourly-weather-card/Charts";
import Clouds from "@/components/forecastPage/mini-cards/Clouds";
import Humidity from "@/components/forecastPage/mini-cards/Humidity";
import MoonRise from "@/components/forecastPage/mini-cards/MoonRise";
import Precipitation from "@/components/forecastPage/mini-cards/Precipitation";
import Pressure from "@/components/forecastPage/mini-cards/Pressure";
import SunRise from "@/components/forecastPage/mini-cards/SunRise";
import UVIndex from "@/components/forecastPage/mini-cards/UVIndex";
import Visibility from "@/components/forecastPage/mini-cards/Visibility";
import Wind from "@/components/forecastPage/mini-cards/Wind";
import Sidebar from "@/components/forecastPage/Sidebar";

import CurrentLocation from "../components/forecastPage/CurrentLocation";
import Container from "../components/layout/Container";

export default function ForecastPage() {
    return (
        <>
            <main className="mt-8 pb-96">
                <Container>
                    <CurrentLocation />
                    <div className="mx-auto h-fit w-full max-w-full overflow-hidden lgxl:grid lgxl:w-full lgxl:grid-cols-4 lgxl:gap-6">
                        <div className="lgxl:col-span-3">
                            <CurrentWeatherCard className="w-full" />
                            <Charts className="mt-6 w-full" />
                        </div>

                        <div className="relative m-[0.2rem] mt-6 overflow-hidden rounded-md ring-2 ring-primary/50 lgxl:mt-[0.2rem]">
                            <Sidebar className="h-fit w-full lgxl:h-[53.35rem]" />
                            <div className="absolute bottom-0 left-0 hidden h-28 w-full rounded-b-md border-none border-primary/60 bg-[linear-gradient(180deg,transparent_1%,var(--card)_100%)] lgxl:block" />
                        </div>
                    </div>
                </Container>
                <DailyWeatherCard className="w-full" />

                <Container>
                    <div className="mt-12 grid grid-cols-2 grid-rows-5 gap-4 sm:grid-cols-3 sm:grid-rows-none md:grid-cols-4 lg:grid-cols-5 lgxl:grid-cols-6">
                        <SunRise className="aspect-square w-full rounded-md" />
                        <MoonRise className="aspect-square w-full rounded-md" />
                        <Wind className="aspect-square w-full rounded-md" />
                        <Precipitation className="aspect-square w-full rounded-md" />
                        <UVIndex className="aspect-square w-full rounded-md" />
                        <Visibility className="aspect-square w-full rounded-md bg-red-300" />
                        <Pressure className="aspect-square w-full rounded-md bg-red-300" />
                        <Clouds className="aspect-square w-full rounded-md bg-red-300" />
                        <Humidity className="aspect-square w-full rounded-md bg-red-300" />
                    </div>
                </Container>
            </main>
        </>
    );
}
