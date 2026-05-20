import { NavLink } from "react-router";

import { cn } from "@/lib/utils";

export default function Nav() {
    return (
        <ul className="flex h-10 items-center gap-[0.3rem] border px-[0.29rem]">
            <li>
                <NavLink to="forecast">
                    {({ isActive }) => (
                        <div
                            className={cn(
                                "border px-2 py-0.5 transition-colors flex items-center gap-1",
                                "hover:bg-primary/10 hover:text-primary bg-accent/30",
                                isActive && "bg-primary/10 text-primary border-primary/30",
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
                                "hover:bg-primary/10 hover:text-primary bg-accent/30",
                                isActive && "bg-primary/10 text-primary border-primary/30",
                            )}
                        >
                            <span>Map</span>
                        </div>
                    )}
                </NavLink>
            </li>
        </ul>
    );
}
