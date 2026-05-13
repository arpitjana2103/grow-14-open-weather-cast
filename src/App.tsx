import { useQuery } from "@tanstack/react-query";

import { getWeather } from "./api";
import { Button } from "./components/ui/button";

function App() {
    const { data } = useQuery({
        queryKey: ["weather"],
        queryFn: () => getWeather({ lat: 33.44, lon: -94.04 }),
    });

    console.log(data);

    return (
        <div>
            <div className="flex min-h-svh flex-col items-center justify-center bg-destructive">
                <Button>Click me</Button>
            </div>
        </div>
    );
}

export default App;
