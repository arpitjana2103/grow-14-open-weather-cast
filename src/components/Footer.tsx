import { ArrowUpRight01Icon, FavouriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { useTheme } from "@/contexts/theme.context";

import GitHubBtn from "./GitHubBtn";
import Container from "./layout/Container";
import { Logo2, LogoSVG, LogoSV2 } from "./Logo";

export default function Footer() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    return (
        <div className="mt-12 border-t border-border/30 bg-accent/30">
            <Container className="relative overflow-hidden pt-4">
                <span className="absolute top-[-13%] right-0 hidden h-160 w-160 opacity-30 mdlg:block dark:opacity-10">
                    {isDark && <LogoSVG />}
                    {!isDark && <LogoSV2 />}
                </span>
                <div className="mb-2 flex items-center gap-2 pt-4">
                    <Logo2 className="" />
                    <GitHubBtn className="opacity-60" />
                </div>
                <p className="max-w-120 text-sm text-secondary-foreground/80">
                    MistCast is a real-time weather app that shows current conditions, hourly &
                    eight-day forecasts, air quality data, and an interactive weather map for any
                    location worldwide, with dark mode and metric/imperial support.
                </p>
                <div>
                    <p className="pt-2 text-sm text-secondary-foreground/80">build with - </p>
                    <div className="mt-4 flex items-center gap-3">
                        <a
                            className="transition-opacity hover:opacity-80 hover:grayscale"
                            href="https://react.dev/"
                            target="_blank"
                        >
                            <div className="h-6">
                                <img className="h-full -translate-y-1" src="/images/atom.png" />
                            </div>
                        </a>
                        <a
                            className="transition-opacity hover:opacity-80 hover:grayscale"
                            href="https://openweathermap.org/"
                            target="_blank"
                        >
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
                        </a>
                        <a
                            className="transition-opacity hover:opacity-80 hover:grayscale"
                            href="https://tailwindcss.com/"
                            target="_blank"
                        >
                            <div className="h-4">
                                <img className="h-full" src="/images/tailwindcss.png" />
                            </div>
                        </a>
                        <a
                            className="transition-opacity hover:opacity-80 hover:grayscale"
                            href="https://leafletjs.com/"
                            target="_blank"
                        >
                            <div className="h-6">
                                <img className="h-full" src="/images/leaflet.png" />
                            </div>
                        </a>
                    </div>
                </div>

                <div className="mt-10 flex items-end justify-end pb-8">
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
                        <a
                            href="https://www.linkedin.com/in/arpitjana2103/"
                            className="z-1000 cursor-pointer transition-opacity hover:opacity-80"
                            target="_blank"
                        >
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
