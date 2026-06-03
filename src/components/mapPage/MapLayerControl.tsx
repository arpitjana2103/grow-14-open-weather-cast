import {
    CloudFastWindIcon,
    DropletIcon,
    FastWindIcon,
    GlobalSearchIcon,
    TemperatureIcon,
    Timer01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type THugeiconsIcon = typeof CloudFastWindIcon;
export type TMapLayers =
    | "clouds_new"
    | "precipitation_new"
    | "pressure_new"
    | "wind_new"
    | "temp_new"
    | "search";

const layersIcon: Record<TMapLayers, THugeiconsIcon> = {
    search: GlobalSearchIcon,
    temp_new: TemperatureIcon,
    pressure_new: Timer01Icon,
    clouds_new: CloudFastWindIcon,
    precipitation_new: DropletIcon,
    wind_new: FastWindIcon,
};

export default function MapLayerControl({
    currentlayer,
    onSelectLayer,
}: {
    currentlayer: TMapLayers;
    onSelectLayer: (layer: TMapLayers) => void;
}) {
    return (
        <TooltipProvider>
            <ul className="flex w-fit gap-0 overflow-hidden rounded-md border-3 border-orange-500 bg-orange-500 dark:border-blue-500 dark:bg-blue-500">
                {(Object.keys(layersIcon) as TMapLayers[]).map((layer) => (
                    <Tooltip key={layer}>
                        <TooltipTrigger asChild>
                            <li
                                className={cn(
                                    "bg-orange-500 dark:bg-blue-500 p-2 cursor-pointer transition-colors text-white-foreground",
                                    "hover:bg-background hover:text-foreground hover:dark:bg-background rounded-sm",
                                    currentlayer === layer &&
                                        "bg-background dark:bg-background text-foreground",
                                )}
                                onClick={() => onSelectLayer(layer)}
                            >
                                <HugeiconsIcon size={21} icon={layersIcon[layer]} />
                            </li>
                        </TooltipTrigger>
                        <TooltipContent
                            className="z-1001 rounded-sm bg-background text-base text-foreground"
                            side="bottom"
                        >
                            <p>{layer.split("_")[0]?.replace(/^./, (c) => c.toUpperCase())}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </ul>
        </TooltipProvider>
    );
}
