import path from "path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import oxlint from "vite-plugin-oxlint";

/**
 * Injects a blocking <style> + <script> into <head> at build/serve time.
 *
 * Why this is needed:
 *  - Vite bundles CSS into JS modules, so there is a window between HTML parse
 *    and JS execution where the page has no styles at all (flash of light bg).
 *  - `transition-colors` on every `*` element causes the initial theme colour
 *    to animate in rather than appear instantly (animated flash).
 *
 * What it does:
 *  1. Critical <style> hard-codes html / html.dark bg+text colours so the
 *     correct colour is visible before the Vite CSS bundle loads.
 *  2. Blocking <script> reads localStorage / system preference and adds .dark
 *     to <html> synchronously — before the first paint.
 *  3. Adds .no-transition to suppress all CSS transitions during page load,
 *     then removes it after the load event so user-triggered animations work.
 */
function darkModeFoucFix(): Plugin {
    const criticalStyle = `
    <style>
      html { background-color: oklch(1 0 0); color: oklch(0.145 0 0); }
      html.dark { background-color: oklch(0.145 0 0); color: oklch(0.985 0 0); }
      html.no-transition * { transition: none !important; }
    </style>`;

    const blockingScript = `
    <script>
      (function () {
        var root = document.documentElement;
        var stored = localStorage.getItem("theme");
        var isDark =
          stored === "dark" ||
          (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
        if (isDark) root.classList.add("dark");
        root.classList.add("no-transition");
        window.addEventListener("load", function () {
          setTimeout(function () { root.classList.remove("no-transition"); }, 0);
        });
      })();
    </script>`;

    return {
        name: "dark-mode-fouc-fix",
        transformIndexHtml(html) {
            return html.replace("</head>", `${criticalStyle}${blockingScript}\n  </head>`);
        },
    };
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [darkModeFoucFix(), react(), oxlint(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
