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
                        <SavedLocations savedLocations={savedLocations} />
                        <LocationSearch handleSaveLocation={handleSaveLocation} />
                    </div>
                    <div>{JSON.stringify(currentLocation)}</div>
                    <div>Current Weather</div>
                    <div>Map</div>
                    <div>Hourly Weather</div>
                </div>
            </div>
        </div>
    );
}

export default App;
