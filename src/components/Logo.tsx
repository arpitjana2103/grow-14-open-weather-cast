import { cn } from "@/lib/utils";

import logoImg from "./../assets/icons/logo.png";

export default function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("flex w-fit items-center gap-0", className)}>
            {/*<div className="bg-linear-to-r from-blue-600 to-blue-400 p-4">*/}
            <img src={logoImg} alt="openweathercast-logo" className="h-5 translate-y-[-0.7rem]" />
            <span className="z-1000 bg-linear-to-r from-blue-600 to-blue-500 bg-clip-text text-2xl font-bold tracking-normal text-transparent">
                mistcast
            </span>
            {/*</div>*/}
            <span className="text-[1.8rem] font-bold tracking-tight text-blue-500"></span>
        </div>
    );
}
