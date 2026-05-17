import { z } from "zod";

export const LocationDataSchema = z.object({
    place_id: z.string(),

    lat: z.string(),
    lon: z.string(),

    display_name: z.string(),
    display_place: z.string().optional(),
    display_address: z.string().optional(),
});

export const LocationDataResponseSchema = z.array(LocationDataSchema);

export type TLocationData = z.infer<typeof LocationDataSchema>;
