import { MapContainer, Marker, TileLayer, useMap, ZoomControl } from "react-leaflet";

import { useLocationContext } from "@/contexts/location.context";
import { cn } from "@/lib/utils";
import { useLocationByLatLng } from "@/queries/locations.query";

export function LeafletMap({ className }: { className?: string }) {
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
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
