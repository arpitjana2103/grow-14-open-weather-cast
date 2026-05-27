import { MoonFastWindIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { CloudSun } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export default function LightDarkToggle() {
    const [isDark, setIsDark] = useState(function () {
        const storedMode = localStorage.getItem("theme");
        if (storedMode) return storedMode === "dark";
        else return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    function handleToggle() {
        setIsDark(!isDark);
    }
    return (
        <div>
            <Button
                className="h-10 w-10 cursor-pointer border border-primary/80 bg-primary/10 transition-colors hover:bg-primary/5"
                onClick={handleToggle}
            >
                {!isDark && <CloudSun strokeWidth={1.5} className="size-5.5 text-primary/90" />}

                {isDark && (
                    <HugeiconsIcon icon={MoonFastWindIcon} className="size-5.5 text-primary/90" />
                )}
            </Button>
        </div>
    );
}
