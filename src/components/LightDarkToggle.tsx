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
                className="h-10 w-10 cursor-pointer border border-primary/30 bg-primary/10 hover:bg-primary/20"
                onClick={handleToggle}
            >
                {!isDark && <CloudSun size={22} strokeWidth={1.5} className="text-primary/90" />}
                {/*{!isDark && <HugeiconsIcon icon={Sun01Icon} className="text-primary/80" />}*/}

                {isDark && <HugeiconsIcon icon={MoonFastWindIcon} className="text-primary/80" />}
            </Button>
        </div>
    );
}
