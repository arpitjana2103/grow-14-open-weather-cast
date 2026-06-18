# MistCast - Modern Weather Dashboard

<p align="center">
  <a href="https://mistcast-weather.netlify.app/forecast" rel="noopener noreferrer">
    <img width=300px style="border-radius:0.4rem" src="https://i.imghippo.com/files/vlWA1885Ceo.png">
  </a>
</p>

<div align="center">

[![Live](https://img.shields.io/badge/Live-mistcast--weather.netlify.app%2Fforecast-00C7B7?style=flat&logo=netlify)](https://mistcast-weather.netlify.app/forecast)

<h4>MistCast is a modern, responsive weather dashboard built with React and the OpenWeatherMap API. It provides real-time weather conditions, a 48-hour hourly temperature chart, an 8-day daily forecast, and detailed atmospheric metrics - including UV index, wind compass, humidity, visibility, precipitation, sunrise/sunset arcs, and air quality (AQI) - all in one clean interface. The app supports metric/imperial unit switching, light/dark themes, custom location search with geolocation, and an interactive weather map with multiple overlay layers.</h4>

[![Repo Type](https://img.shields.io/badge/repo_type-Public-fcc419?logo=applepodcasts&style=flat)](https://github.com/arpitjana2103/grow-14-open-weather-cast)
[![License](https://img.shields.io/badge/license-MIT-85e2cd.svg?logo=unlicense&logoColor=white)](https://opensource.org/license/mit/)

</div>

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React--Router-7-CA4245?style=flat&logo=reactrouter)](https://reactrouter.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2-22B5BF?style=flat&logo=chartdotjs)](https://recharts.org/)
[![React Leaflet](https://img.shields.io/badge/React--Leaflet-5-3FB526?style=flat&logo=leaflet)](https://react-leaflet.js.org/)
[![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-OneCall_3.0_API-EB6E4B?style=flat&logo=accuweather)](https://openweathermap.org/api)
[![LocationIQ](https://img.shields.io/badge/LocationIQ-Geocoding_API-6B46C1?style=flat&logo=googlemaps)](https://locationiq.com/)

</div>

## Gallery

<img style="width:100%" src="https://i.imghippo.com/files/LBBT9671dik.webp">
<img style="width:100%" src="https://i.imghippo.com/files/oj7680PXs.webp">
<img style="width:100%" src="https://i.imghippo.com/files/cDZ6318lBg.webp">
<img style="width:100%" src="https://i.imghippo.com/files/eNbe6901w.webp">

## Application Features

MistCast is a client-side weather dashboard built with React and the OpenWeatherMap API,
delivering real-time weather intelligence through a clean, visually rich interface.

**1. Complete Weather Intelligence**: Current conditions, a 48-hour interactive temperature chart (Actual vs Feels Like) built with **Recharts**, and an 8-day daily forecast - all powered by the **OpenWeatherMap OneCall v3.0 API**.\
**2. Rich Detail Cards**: Eight dedicated mini-cards - Sunrise/Sunset arc, Moonrise arc, Wind compass, UV Index scale, Humidity bars, Precipitation, Visibility, and Cloud cover.\
**3. Air Quality Index**: Full AQI breakdown with per-pollutant gradient scale indicators (SO₂, NO₂, PM2.5, PM10, O₃ and more) - powered by the **OpenWeatherMap Air Pollution API**.\
**4. Live Weather Map**: Interactive map built with **React Leaflet** with switchable overlay layers - Temperature, Precipitation, Clouds, Pressure, and Wind.\
**5. Location Search**: Search any city worldwide via **LocationIQ Geocoding API**, or detect your current position using the browser's Geolocation API.\
**6. Fully Personalized**: Switch between Metric / Imperial units and toggle Light / Dark theme - all persisted across sessions via localStorage.\
**7. Responsive**: Optimized across all screen sizes - desktop, tablet, and mobile.

## Run Locally

**Step 1 :** Clone the repository

```bash
git clone https://github.com/arpitjana2103/grow-14-open-weather-cast.git
cd grow-14-open-weather-cast
```

**Step 2 :** Install `npm packages`

```bash
npm install
```

**Step 3 :** Create a `.env.local` file in the project root with the following variable

```
VITE_OPENWEATHERMAP_API_KEY={{YourOpenWeatherMapAPIKey}}
VITE_LOCATIONIQ_API_KEY={{YourLocationIQAPIKey}}
```

> Get OpenWeather API key at [openweathermap.org](https://openweathermap.org/api). The app uses the **One Call API 3.0** and **Air Pollution API**.

> Get LocationIQ API key at [locationiq.com](https://locationiq.com/). The app uses **Autocomplete** & **Reverse Geocoding** API.

**Step 4 :** Start the development server

```bash
npm run dev
```

```
// Output :
Local : http://localhost:5173/
```

## Tech Stack & Tools

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React--Router-7-CA4245?style=flat&logo=reactrouter)](https://reactrouter.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2-22B5BF?style=flat&logo=chartdotjs)](https://recharts.org/)
[![React Leaflet](https://img.shields.io/badge/React--Leaflet-5-3FB526?style=flat&logo=leaflet)](https://react-leaflet.js.org/)
[![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-OneCall_3.0_API-EB6E4B?style=flat&logo=accuweather)](https://openweathermap.org/api)
[![LocationIQ](https://img.shields.io/badge/LocationIQ-Geocoding_API-6B46C1?style=flat&logo=googlemaps)](https://locationiq.com/)

[![Zed](https://img.shields.io/badge/Zed-Editor-084CCF?style=flat&logo=zedindustries&logoColor=white)](https://zed.dev/)
[![Git](https://img.shields.io/badge/Git-VCS-F05032?style=flat&logo=git&logoColor=white)](https://git-scm.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?style=flat&logo=github&logoColor=white)](https://github.com/)
[![Claude](https://img.shields.io/badge/Claude-Sonnet%204.6-CC785C?style=flat&logo=anthropic&logoColor=white)](https://www.anthropic.com/)

## Contact Me

[![Gmail ](https://img.shields.io/badge/Email-arpitjana2103@gmail.com-ffc9c9?style=flat&logo=gmail&logoColor=white&link=mailto:arpitjana2103@gmail.com)](mailto:arpitjana2103@gmail.com)
[![LinkedIn ](https://img.shields.io/badge/LinkedIn-@arpitjana2103-0077b5?style=flat&logo=signal&logoColor=white&link=https://www.linkedin.com/in/arpitjana2103/)](https://www.linkedin.com/in/arpitjana2103/)

## License

[![License](https://img.shields.io/badge/license-MIT-85e2cd.svg?logo=unlicense&logoColor=white)](https://opensource.org/license/mit/)

Copyright (c) 2026 Arpit Jana
