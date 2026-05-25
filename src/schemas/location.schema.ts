import { z } from "zod";

export const LocationDataSchema = z.object({
    place_id: z.string(),

    lat: z.string(),
    lon: z.string(),

    display_name: z.string(),
    display_place: z.string(),
    display_address: z.string(),
    address: z.object({
        country_code: z.string(),
    }),
});

export const LocationDataResponseSchema = z.array(LocationDataSchema);

export type TLocationData = z.infer<typeof LocationDataSchema>;
