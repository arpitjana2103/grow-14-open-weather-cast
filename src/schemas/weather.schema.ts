import { z } from "zod";

const WeatherIconSchema = z.enum([
    "01d",
    "01n",
    "02d",
    "02n",
    "03d",
    "03n",
    "04d",
    "04n",
    "09d",
    "09n",
    "10d",
    "10n",
    "11d",
    "11n",
    "13d",
    "13n",
    "50d",
    "50n",
]);

const WeatherConditionSchema = z.object({
    id: z.number().int(),
    main: z.string(),
    description: z.string(),
    icon: WeatherIconSchema,
});

const CurrentWeatherSchema = z.object({
    dt: z.number().int(),
    sunrise: z.number().int().optional(),
    sunset: z.number().int().optional(),
    temp: z.number(),
    feels_like: z.number(),
    pressure: z.number().int(),
    humidity: z.number().int(),
    dew_point: z.number(),
    uvi: z.number().min(0),
    clouds: z.number().int(),
    visibility: z.number().int().min(0).optional().default(0),
    wind_speed: z.number().min(0),
    wind_deg: z.number().int().min(0).max(360),
    wind_gust: z.number().min(0).optional(),
    weather: z.array(WeatherConditionSchema).min(1),
});

const HourlyWeatherSchema = z.object({
    dt: z.number().int(),
    temp: z.number(),
    feels_like: z.number(),
    pressure: z.number().int(),
    humidity: z.number().int(),
    dew_point: z.number(),
    uvi: z.number().min(0).optional().default(0),
    clouds: z.number().int(),
    visibility: z.number().int().min(0).optional().default(0),
    wind_speed: z.number().min(0),
    wind_deg: z.number().int(),
    wind_gust: z.number().min(0).optional(),
    weather: z.array(WeatherConditionSchema).min(1),
    pop: z.number().min(0).max(1),
    rain: z.object({ "1h": z.number().min(0) }).optional(),
    snow: z.object({ "1h": z.number().min(0) }).optional(),
});

const DailyTempSchema = z.object({
    day: z.number(),
    min: z.number(),
    max: z.number(),
    night: z.number(),
    eve: z.number(),
    morn: z.number(),
});

const DailyFeelsLikeSchema = z.object({
    day: z.number(),
    night: z.number(),
    eve: z.number(),
    morn: z.number(),
});

const DailyWeatherSchema = z.object({
    dt: z.number().int(),
    sunrise: z.number().int(),
    sunset: z.number().int(),
    moonrise: z.number().int().optional().default(0),
    moonset: z.number().int().optional().default(0),
    moon_phase: z.number().min(0).max(1),
    summary: z.string().optional(),
    temp: DailyTempSchema,
    feels_like: DailyFeelsLikeSchema,
    pressure: z.number().int(),
    humidity: z.number().int(),
    dew_point: z.number(),
    wind_speed: z.number().min(0),
    wind_deg: z.number().int().min(0).max(360),
    wind_gust: z.number().min(0).optional(),
    weather: z.array(WeatherConditionSchema).min(1),
    clouds: z.number().int(),
    pop: z.number().min(0).max(1), // Precipitation
    rain: z.number().min(0).optional(),
    snow: z.number().min(0).optional(),
    uvi: z.number().min(0),
});

export const OneCallResponseSchema = z.object({
    lat: z.number().min(-90).max(90),
    lon: z.number().min(-180).max(180),
    timezone: z.string(),
    timezone_offset: z.number().int(),
    current: CurrentWeatherSchema,
    hourly: z.array(HourlyWeatherSchema),
    daily: z.array(DailyWeatherSchema),
});

export type TOneCallResponse = z.infer<typeof OneCallResponseSchema>;
export type TCurrentWeather = z.infer<typeof CurrentWeatherSchema>;
export type THourlyWeather = z.infer<typeof HourlyWeatherSchema>;
export type TDailyWeather = z.infer<typeof DailyWeatherSchema>;
export type TWeatherCondition = z.infer<typeof WeatherConditionSchema>;
export type TDailyTemp = z.infer<typeof DailyTempSchema>;
export type TDailyFeelsLike = z.infer<typeof DailyFeelsLikeSchema>;
export type TWeatherIcon = z.infer<typeof WeatherIconSchema>;

// ─── Air Pollution API ───────────────────────────────────────────────────────

/**
 * Air Quality Index (AQI) scale:
 * 1 = Good | 2 = Fair | 3 = Moderate | 4 = Poor | 5 = Very Poor
 */
const AirQualityIndexSchema = z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
]);

const AirPollutionComponentsSchema = z.object({
    co: z.number().min(0),
    no: z.number().min(0),
    no2: z.number().min(0),
    o3: z.number().min(0),
    so2: z.number().min(0),
    pm2_5: z.number().min(0),
    pm10: z.number().min(0),
    nh3: z.number().min(0),
});

const AirPollutionItemSchema = z.object({
    dt: z.number().int(),
    main: z.object({ aqi: AirQualityIndexSchema }),
    components: AirPollutionComponentsSchema,
});

export const AirPollutionResponseSchema = z.object({
    coord: z.object({
        lon: z.number().min(-180).max(180),
        lat: z.number().min(-90).max(90),
    }),
    list: z.array(AirPollutionItemSchema).min(1),
});

export type TAirPoluctants = keyof z.infer<typeof AirPollutionComponentsSchema>;
export type TAirPollutionResponse = z.infer<typeof AirPollutionResponseSchema>;
export type TAirPollutionItem = z.infer<typeof AirPollutionItemSchema>;
export type TAirPollutionComponents = z.infer<typeof AirPollutionComponentsSchema>;
export type TAirQualityIndex = z.infer<typeof AirQualityIndexSchema>;
