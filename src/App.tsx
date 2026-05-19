import LightDarkToggle from "./components/LightDarkToggle";
import LocationSearch from "./components/LocationSearch";
import Logo from "./components/Logo";
import NavBar from "./components/NavBar";
import { useLocationContext } from "./contexts/location.context";

function App() {
    const { currentLocation } = useLocationContext();

    return (
        <div>
            <NavBar />
            <div>
                <div>
                    <div></div>
                    {/*<div className="border bg-green-500 p-5">
                        Current Location : {currentLocation?.display_name}
                    </div>*/}
                    {/*<div>Current Weather</div>
                    <div>Map</div>
                    <div>Hourly Weather</div>*/}
                </div>
            </div>
        </div>
    );
}

export default App;
