import { z } from "zod";

const WeatherConditionSchema = z.object({
    id: z.number().int(),
    main: z.string(),
    description: z.string(),
    icon: z.string(),
});

const CurrentWeatherSchema = z.object({
    dt: z.number().int(),
    sunrise: z.number().int(),
    sunset: z.number().int(),
    temp: z.number(),
    feels_like: z.number(),
    pressure: z.number().int(),
    humidity: z.number().int().min(0).max(100),
    dew_point: z.number(),
    uvi: z.number().min(0),
    clouds: z.number().int().min(0).max(100),
    visibility: z.number().int().min(0),
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
    humidity: z.number().int().min(0).max(100),
    dew_point: z.number(),
    uvi: z.number().min(0),
    clouds: z.number().int().min(0).max(100),
    visibility: z.number().int().min(0),
    wind_speed: z.number().min(0),
    wind_deg: z.number().int().min(0).max(360),
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
    moonrise: z.number().int(),
    moonset: z.number().int(),
    moon_phase: z.number().min(0).max(1),
    summary: z.string().optional(),
    temp: DailyTempSchema,
    feels_like: DailyFeelsLikeSchema,
    pressure: z.number().int(),
    humidity: z.number().int().min(0).max(100),
    dew_point: z.number(),
    wind_speed: z.number().min(0),
    wind_deg: z.number().int().min(0).max(360),
    wind_gust: z.number().min(0).optional(),
    weather: z.array(WeatherConditionSchema).min(1),
    clouds: z.number().int().min(0).max(100),
    pop: z.number().min(0).max(1),
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

export type OneCallResponse = z.infer<typeof OneCallResponseSchema>;
export type CurrentWeather = z.infer<typeof CurrentWeatherSchema>;
export type HourlyWeather = z.infer<typeof HourlyWeatherSchema>;
export type DailyWeather = z.infer<typeof DailyWeatherSchema>;
export type WeatherCondition = z.infer<typeof WeatherConditionSchema>;
export type DailyTemp = z.infer<typeof DailyTempSchema>;
export type DailyFeelsLike = z.infer<typeof DailyFeelsLikeSchema>;
