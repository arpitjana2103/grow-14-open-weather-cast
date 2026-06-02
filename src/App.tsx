import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";

import AppLayout from "./components/layout/AppLayout";
import ForecastPage from "./pages/ForecastPage";
import MapPage from "./pages/MapPage";

function App() {
    return (
        <RouterProvider
            router={createBrowserRouter([
                {
                    path: "/",
                    element: <AppLayout />,
                    children: [
                        { index: true, element: <Navigate replace to="forecast" /> },
                        { path: "forecast", element: <ForecastPage /> },
                        { path: "map", element: <MapPage /> },
                    ],
                },
            ])}
        />
    );
}

export default App;
