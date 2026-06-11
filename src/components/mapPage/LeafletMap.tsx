import type { TMapLayers } from "./MapLayerControl";

import { PlusSignIcon, MinusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import L from "leaflet";
import { useCallback, useEffect, useRef } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

import { useLocationContext } from "@/contexts/location.context";
import { useTheme } from "@/contexts/theme.context";
import { cn } from "@/lib/utils";
import { API_KEY as OPENWEATHERMAP_API_KEY } from "@/services/weather.service";

export function LeafletMap({ className, mapLayer }: { className?: string; mapLayer: TMapLayers }) {
    const { theme } = useTheme();
    const { currentLatlng, handleSetCurrentLatlng } = useLocationContext();
    const [lat, lon] = currentLatlng;

    async function onMapClick(latVal: number, lonVal: number) {
        const normalizedLon = L.Util.wrapNum(lonVal, [-180, 180], true);
        handleSetCurrentLatlng([latVal, normalizedLon]);
    }

    const lightMapLayer =
        "https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}@2x.jpg?key=RqBinbOIimuU9Q9zXtXK";
    const darkMapLayer =
        "https://api.maptiler.com/maps/openstreetmap-dark/256/{z}/{x}/{y}@2x.png?key=RqBinbOIimuU9Q9zXtXK";
    const baseMapLayer = theme === "dark" || mapLayer !== "search" ? darkMapLayer : lightMapLayer;

    return (
        <div className={cn("rounded-md overflow-hidden", className)}>
            <MapContainer
                center={[lat, lon]}
                zoom={10}
                scrollWheelZoom={true}
                className="h-full w-full"
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={baseMapLayer}
                />
                {mapLayer !== "search" && (
                    <TileLayer
                        url={`https://tile.openweathermap.org/map/${mapLayer}/{z}/{x}/{y}.png?appid=${OPENWEATHERMAP_API_KEY}`}
                        opacity={1}
                    />
                )}
                <MapClick lat={lat} lon={lon} onMapClick={onMapClick} />
                <Marker position={[lat, lon]} />
                <CustomZoomControl />
            </MapContainer>
        </div>
    );
}

function CustomZoomControl() {
    const map = useMap();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            L.DomEvent.disableClickPropagation(containerRef.current);
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute top-5 right-5 z-1000 flex cursor-pointer flex-col overflow-hidden rounded-sm shadow-lg"
        >
            <button
                onClick={() => map.zoomIn()}
                className="cursor-pointer bg-background p-2 transition-colors hover:bg-background/80"
            >
                <HugeiconsIcon strokeWidth={2} icon={PlusSignIcon} size={18} />
            </button>

            <button
                onClick={() => map.zoomOut()}
                className="cursor-pointer bg-background p-2 transition-colors hover:bg-background/80"
            >
                <HugeiconsIcon strokeWidth={2} icon={MinusSignIcon} size={18} />
            </button>
        </div>
    );
}

function MapClick({
    lat,
    lon,
    onMapClick,
}: {
    lat: number;
    lon: number;
    onMapClick: (lat: number, lon: number) => void;
}) {
    const map = useMap();

    map.panTo([lat, lon]);

    const stableOnMapClick = useCallback(onMapClick, [onMapClick]);

    useEffect(() => {
        function handleClick(e: L.LeafletMouseEvent) {
            stableOnMapClick(e.latlng.lat, e.latlng.lng);
        }

        map.on("click", handleClick);
        return () => {
            map.off("click", handleClick);
        };
    }, [map, stableOnMapClick]);

    return null;
}
