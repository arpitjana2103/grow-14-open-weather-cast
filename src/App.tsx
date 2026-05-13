import { useQuery } from "@tanstack/react-query";

import { getWeather } from "./api";

function App() {
    const { data } = useQuery({
        queryKey: ["weather"],
        queryFn: () => getWeather({ lat: 33.44, lon: -94.04 }),
    });

    console.log(data);

    return <></>;
}

export default App;
