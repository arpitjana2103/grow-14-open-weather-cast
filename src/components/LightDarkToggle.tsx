import { Moon, Sun } from "lucide-react";
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
            <Button className="h-10 w-10 cursor-pointer border" onClick={handleToggle}>
                {!isDark && <Sun size={19} />}
                {isDark && <Moon size={19} />}
            </Button>
        </div>
    );
}
