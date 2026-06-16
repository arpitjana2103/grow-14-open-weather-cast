import { cn } from "@/lib/utils";

import logoImg from "./../assets/icons/logo.png";
import logoImg3 from "./../assets/icons/logo3.png";

export default function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("flex w-fit items-center gap-0", className)}>
            {/*<div className="bg-linear-to-r from-blue-600 to-blue-400 p-4">*/}
            <img src={logoImg} alt="openweathercast-logo" className="h-5 translate-y-[-0.7rem]" />
            <span className="z-1000 bg-linear-to-r from-blue-600 to-blue-500 bg-clip-text text-2xl font-bold tracking-normal text-transparent">
                mistcast
            </span>
        </div>
    );
}

export function Logo2({ className }: { className?: string }) {
    return (
        <div className={cn("flex w-fit items-center gap-0", className)}>
            {/*<div className="bg-linear-to-r from-blue-600 to-blue-400 p-4">*/}
            <img src={logoImg3} alt="openweathercast-logo" className="h-5 translate-y-[-0.7rem]" />
            <span className="z-1000 bg-linear-to-r from-slate-600 to-slate-400 bg-clip-text text-2xl font-bold tracking-normal text-transparent">
                mistcast
            </span>
        </div>
    );
}

export function LogoSVG() {
    return (
        <svg viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M30.6563 0C33.6937 1.32771e-07 36.1561 2.46259 36.1563 5.5V17.3789L44.5557 8.97949C46.7036 6.83186 50.1862 6.83169 52.334 8.97949C54.4813 11.1272 54.4811 14.609 52.334 16.7568L43.9346 25.1562H55.8125C58.8499 25.1563 61.3123 27.6188 61.3125 30.6562C61.3125 33.6938 58.85 36.1562 55.8125 36.1562H43.9336L52.333 44.5557C54.4809 46.7035 54.4809 50.1861 52.333 52.334C50.1851 54.4815 46.7025 54.4818 44.5547 52.334L36.1563 43.9346V55.8125C36.1561 58.8499 33.6937 61.3125 30.6563 61.3125C27.6188 61.3125 25.1564 58.8499 25.1563 55.8125V43.9346L16.7578 52.334C14.61 54.4818 11.1274 54.4815 8.97949 52.334C6.83161 50.1861 6.83161 46.7035 8.97949 44.5557L17.3789 36.1562H5.5C2.46259 36.1561 -2.65542e-07 33.6937 0 30.6562C0.000154323 27.6189 2.46269 25.1564 5.5 25.1562H17.3779L8.97852 16.7568C6.83135 14.609 6.83118 11.1272 8.97852 8.97949C11.1263 6.83169 14.6089 6.83186 16.7568 8.97949L25.1563 17.3789V5.5C25.1564 2.46259 27.6188 -2.84283e-09 30.6563 0Z"
                fill="url(#paint0_linear_258_236)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_258_236"
                    x1="30.6562"
                    y1="0"
                    x2="30.6563"
                    y2="61.3125"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stop-color="white" stop-opacity="0.77" />
                    <stop offset="1" stop-color="white" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export function LogoSV2() {
    return (
        <svg viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M30.6563 0C33.6937 1.32771e-07 36.1561 2.46259 36.1563 5.5V17.3789L44.5557 8.97949C46.7036 6.83186 50.1862 6.83169 52.334 8.97949C54.4813 11.1272 54.4811 14.609 52.334 16.7568L43.9346 25.1562H55.8125C58.8499 25.1563 61.3123 27.6188 61.3125 30.6562C61.3125 33.6938 58.85 36.1562 55.8125 36.1562H43.9336L52.333 44.5557C54.4809 46.7035 54.4809 50.1861 52.333 52.334C50.1851 54.4815 46.7025 54.4818 44.5547 52.334L36.1563 43.9346V55.8125C36.1561 58.8499 33.6937 61.3125 30.6563 61.3125C27.6188 61.3125 25.1564 58.8499 25.1563 55.8125V43.9346L16.7578 52.334C14.61 54.4818 11.1274 54.4815 8.97949 52.334C6.83161 50.1861 6.83161 46.7035 8.97949 44.5557L17.3789 36.1562H5.5C2.46259 36.1561 -2.65541e-07 33.6937 0 30.6562C0.000154323 27.6189 2.46269 25.1564 5.5 25.1562H17.3779L8.97852 16.7568C6.83135 14.609 6.83118 11.1272 8.97852 8.97949C11.1263 6.83169 14.6089 6.83186 16.7568 8.97949L25.1563 17.3789V5.5C25.1564 2.46259 27.6188 -2.84283e-09 30.6563 0Z"
                fill="url(#paint0_linear_256_221)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_256_221"
                    x1="30.6562"
                    y1="0"
                    x2="30.6563"
                    y2="61.3125"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stop-color="#90A1B9" stop-opacity="0.77" />
                    <stop offset="1" stop-color="#314158" />
                </linearGradient>
            </defs>
        </svg>
    );
}
