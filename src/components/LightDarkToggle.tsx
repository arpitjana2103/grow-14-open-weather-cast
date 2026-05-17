import { useEffect, useState } from "react";

export default function DarkModeToggle() {
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
            <input type="checkbox" id="toggle" checked={isDark} onChange={handleToggle} />
            <label htmlFor="toggle">Mode</label>
        </div>
    );
}
