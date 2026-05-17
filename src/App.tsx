import LocationSearch from "./components/LocationSearch";
import SavedLocations from "./components/SavedLocations";
import { LocationProvider } from "./contexts/location.context";
import { useLocationsCache } from "./hooks/useLocationCache";

function App() {
    const { savedLocations, handleSaveLocation } = useLocationsCache();

    return (
        <LocationProvider>
            <div>
                <div>
                    <div>
                        <div>
                            <SavedLocations savedLocations={savedLocations} />
                            <LocationSearch handleSaveLocation={handleSaveLocation} />
                        </div>
                        <div>Current Weather</div>
                        <div>Map</div>
                        <div>Hourly Weather</div>
                    </div>
                </div>
            </div>
        </LocationProvider>
    );
}

export default App;
