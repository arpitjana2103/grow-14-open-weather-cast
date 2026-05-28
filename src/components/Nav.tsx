import { MapsLocation02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { NavLink } from "react-router";

import { cn } from "@/lib/utils";

export default function Nav() {
    return (
        <ul className="flex h-10 items-center gap-[0.3rem] border border-primary/60 px-[0.29rem]">
            <li>
                <NavLink to="forecast">
                    {({ isActive }) => (
                        <div
                            className={cn(
                                "border px-2 py-0.5 transition-colors flex items-center gap-1",
                                "hover:bg-accent/20 bg-accent",
                                isActive &&
                                    "hover:bg-primary/10 bg-primary/10 text-primary border-primary/60",
                            )}
                        >
                            <span>Forecast</span>
                        </div>
                    )}
                </NavLink>
            </li>
            <li>
                <NavLink to="map">
                    {({ isActive }) => (
                        <div
                            className={cn(
                                "border px-2 py-0.5 transition-colors flex items-center gap-1",
                                "hover:bg-accent/20 bg-accent",
                                isActive &&
                                    "hover:bg-primary/10 bg-primary/10 text-primary border-primary/60",
                            )}
                        >
                            <HugeiconsIcon icon={MapsLocation02Icon} size={17} />
                            <span>Map</span>
                        </div>
                    )}
                </NavLink>
            </li>
        </ul>
    );
}
