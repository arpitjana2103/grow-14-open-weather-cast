import { useState } from "react";

import { cn } from "@/lib/utils";

import { LeafletMap } from "./LeafletMap";
import MapLayerControl, { type TMapLayers } from "./MapLayerControl";
import WeatherCardOnMap from "./WeatherCardOnMap";

export default function MapLayout({ className }: { className?: string }) {
    const [currentlayer, setCurrentLayer] = useState<TMapLayers>("search");
    function onSelectLayer(layer: TMapLayers) {
        setCurrentLayer(layer);
    }
    return (
        <div className={cn("relative", className)}>
            <LeafletMap className={cn("w-full h-full")} mapLayer={currentlayer} />
            <div className="absolute top-5 left-5 z-1000 flex flex-col items-start gap-3">
                <WeatherCardOnMap />
                <MapLayerControl currentlayer={currentlayer} onSelectLayer={onSelectLayer} />
            </div>
        </div>
    );
}
