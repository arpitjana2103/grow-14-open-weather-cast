import { z } from "zod";

export const LocationDataSchema = z.object({
    place_id: z.string(),

    lat: z.string(),
    lon: z.string(),

    display_name: z.string(),
    display_place: z.string().optional(),
    display_address: z.string().optional(),
    address: z.object({
        country_code: z.string(),
        quarter: z.string().optional(),
        city: z.string().optional(),
        town: z.string().optional(),
        region: z.string().optional(),
        municipality: z.string().optional(),
        state_district: z.string().optional(),
        state: z.string().optional(),
        country: z.string().optional(),
        postcode: z.string().optional(),
    }),
});

export const LocationDataResponseSchema = z.array(LocationDataSchema);

export type TLocationData = z.infer<typeof LocationDataSchema>;
