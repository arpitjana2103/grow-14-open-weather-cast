import { cn } from "@/lib/utils";

type Props = {
    className?: string;
};

export default function Precipitation({ className }: Props) {
    return <div className={cn("", className)}></div>;
}

// const today = data.daily[0];

// const precipChance = Math.round(today.pop * 100);  // % probability
// const rainMm       = today.rain ?? 0;              // mm/day
// const snowMm       = today.snow ?? 0;              // mm/day
