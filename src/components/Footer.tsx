import { ArrowUpRight01Icon, FavouriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { useTheme } from "@/contexts/theme.context";

import Container from "./layout/Container";
import Logo from "./Logo";

export default function Footer() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    return (
        <div className="mt-12 bg-border/20 py-6">
            <Container>
                <div className="mb-2 pt-4">
                    <Logo className="scale-[0.9] grayscale" />
                </div>
                <p className="max-w-120 text-sm text-stone-500">
                    MistCast is a real-time weather app that shows current conditions, hourly &
                    7-day forecasts, air quality data, and an interactive weather map — for any
                    location worldwide, with dark mode and metric/imperial support.
                </p>
                <div>
                    <p className="pt-2 text-sm text-stone-500">build with - </p>
                    <div className="mt-4 flex items-center gap-3">
                        <div className="h-6">
                            <img className="h-full -translate-y-1" src="/images/atom.png" />
                        </div>
                        <div className="h-10 opacity-90">
                            <img
                                key={theme}
                                className="h-full -translate-y-3"
                                src={
                                    isDark
                                        ? "/images/open_weather.webp"
                                        : "/images/open_weather_dark.png"
                                }
                            />
                        </div>
                        <div className="h-4">
                            <img className="h-full" src="/images/tailwindcss.png" />
                        </div>
                        <div className="h-6">
                            <img className="h-full" src="/images/leaflet.png" />
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex items-end justify-end">
                    <div className="flex gap-1 text-sm text-secondary-foreground">
                        <span>Made with </span>
                        <span>
                            <HugeiconsIcon
                                fill="#ff6467"
                                icon={FavouriteIcon}
                                className="size-4 translate-y-0.5 text-red-400"
                            />
                        </span>
                        <span>by </span>
                        <a href="https://www.linkedin.com/in/arpitjana2103/" target="_blank">
                            <span className="flex gap-1 border-b-2 font-bold">
                                <span>Arpit Jana</span>
                                <span>
                                    <HugeiconsIcon
                                        className="size-4 -translate-x-0.5 translate-y-0.5"
                                        strokeWidth={2.5}
                                        icon={ArrowUpRight01Icon}
                                    />
                                </span>
                            </span>
                        </a>
                    </div>
                </div>
            </Container>
        </div>
    );
}
