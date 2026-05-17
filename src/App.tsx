import LightDarkToggle from "./components/LightDarkToggle";
import LocationSearch from "./components/LocationSearch";
import SavedLocations from "./components/SavedLocations";
import { useLocationContext } from "./contexts/location.context";
import { useLocationsCache } from "./hooks/useLocationCache";

function App() {
    const { savedLocations, handleSaveLocation } = useLocationsCache();
    const { currentLocation } = useLocationContext();

    return (
        <div>
            <div>
                <div>
                    <div>
                        <LocationSearch handleSaveLocation={handleSaveLocation} />
                        <SavedLocations savedLocations={savedLocations} />
                        <LightDarkToggle />
                    </div>
                    <div className="border bg-green-500 p-5">
                        Current Location : {currentLocation?.display_name}
                    </div>
                    <div>Current Weather</div>
                    <div>Map</div>
                    <div>Hourly Weather</div>
                </div>
            </div>
        </div>
    );
}

export default App;
