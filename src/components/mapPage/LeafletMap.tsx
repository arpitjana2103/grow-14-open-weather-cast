import type { TMapLayers } from "./MapLayerControl";

import { MapContainer, Marker, TileLayer, useMap, ZoomControl } from "react-leaflet";

import { useLocationContext } from "@/contexts/location.context";
import { cn } from "@/lib/utils";
import { useLocationByLatLng } from "@/queries/locations.query";
import { API_KEY as OPENWEATHERMAP_API_KEY } from "@/services/weather.service";

export function LeafletMap({ className, mapLayer }: { className?: string; mapLayer: TMapLayers }) {
    const { currentLocation, setCurrentLocation } = useLocationContext();
    const lat = Number(currentLocation?.lat) || 0;
    const lon = Number(currentLocation?.lon) || 0;

    const { fetchLocationByLatLng } = useLocationByLatLng();

    async function onMapClick(latVal: number, lonVal: number) {
        const data = await fetchLocationByLatLng(latVal, lonVal);
        setCurrentLocation(data);
    }

    return (
        <div className={cn("rounded-md overflow-hidden", className)}>
            <MapContainer
                center={[lat, lon]}
                zoom={6}
                scrollWheelZoom={true}
                className="h-full w-full"
                zoomControl={false}
            >
                {/* DEFAULT */}
                {/*<TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />*/}
                {/* DARK */}
                {/*<TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://api.maptiler.com/maps/streets-v4-dark/256/{z}/{x}/{y}@2x.png?key=RqBinbOIimuU9Q9zXtXK"
                />*/}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={
                        mapLayer === "search"
                            ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            : "https://api.maptiler.com/maps/openstreetmap-dark/256/{z}/{x}/{y}@2x.png?key=RqBinbOIimuU9Q9zXtXK"
                    }
                />
                <TileLayer
                    url={`https://tile.openweathermap.org/map/${mapLayer}/{z}/{x}/{y}.png?appid=${OPENWEATHERMAP_API_KEY}`}
                />
                <MapClick lat={lat} lon={lon} onMapClick={onMapClick} />
                <Marker position={[lat, lon]} />
                <ZoomControl position="topright" />
            </MapContainer>
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
    map.on("click", function (e) {
        const { lat: latVal, lng: lonVal } = e.latlng;
        onMapClick(latVal, lonVal);
    });

    return null;
}
