import "./styles/index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { LocationProvider } from "./contexts/location.context.tsx";
import { ThemeProvider } from "./contexts/theme.context.tsx";
import { UnitProvider } from "./contexts/unit.context.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    //     <LocationProvider>
    //         <QueryClientProvider client={queryClient}>
    //             <ReactQueryDevtools initialIsOpen={false} />
    //             <App />
    //         </QueryClientProvider>
    //     </LocationProvider>
    // </StrictMode>,
    <ThemeProvider>
        <UnitProvider>
            <LocationProvider>
                <QueryClientProvider client={queryClient}>
                    {/*<ReactQueryDevtools initialIsOpen={false} />*/}
                    <App />
                </QueryClientProvider>
            </LocationProvider>
        </UnitProvider>
    </ThemeProvider>,
);
