import CurrentWeatherCard from "@/components/forecastPage/current-weather-card/CurrentWeatherCard";
import Charts from "@/components/forecastPage/hourly-weather-card/Charts";
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
            </main>
        </>
    );
}
