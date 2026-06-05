import { TempChart } from "@/components/forecastPage/hourly-weather-card/TempChart";

import CurrentWeatherCard from "../components/forecastPage/current-weather-card/CurrentWeatherCard";
import CurrentLocation from "../components/forecastPage/CurrentLocation";
import Container from "../components/layout/Container";

export default function ForecastPage() {
    return (
        <>
            <main className="pt-4">
                <Container>
                    <CurrentLocation />
                    <div className="xl:grid xl:grid-cols-4 xl:gap-6">
                        <div className="col-span-3">
                            <CurrentWeatherCard />
                            <TempChart />
                            <div>Daily</div>
                        </div>
                        <div className="bg-amber-200"></div>
                    </div>
                </Container>
            </main>
        </>
    );
}
