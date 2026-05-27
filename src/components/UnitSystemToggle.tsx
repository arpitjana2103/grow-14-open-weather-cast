import {
    ArrowDown01Icon,
    CelsiusIcon,
    FahrenheitIcon,
    Setting07Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUnitContext, type TUnit } from "@/contexts/unit.context";
import { cn } from "@/lib/utils";

import { Label } from "./ui/label";

export default function UnitSystemToggle() {
    const { unit, setUnit } = useUnitContext();
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="h-10 cursor-pointer border border-border bg-accent text-foreground hover:bg-accent/20 focus-visible:border-border focus-visible:ring-0 data-[state=open]:border data-[state=open]:border-primary/80 data-[state=open]:bg-primary/10 data-[state=open]:text-primary/90">
                        <span className="flex items-center gap-1">
                            <HugeiconsIcon
                                icon={Setting07Icon}
                                size={19}
                                color="currentColor"
                                className="size-5"
                                strokeWidth={1.7}
                            />
                            <HugeiconsIcon
                                icon={ArrowDown01Icon}
                                size={17}
                                color="currentColor"
                                className="size-4"
                                strokeWidth={1.7}
                            />
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="shadow-ring-foreground mt-[0.20rem] no-scrollbar w-fit border-3 border-background bg-accent px-2.5 py-2 text-foreground shadow-none">
                    <p className="mb-1.5 text-sm text-secondary-foreground">Unit Settings</p>
                    <RadioGroup
                        defaultValue={unit}
                        onValueChange={(value: TUnit) => setUnit(value)}
                        className="flex flex-col items-start gap-1"
                    >
                        <div className="flex items-center gap-1">
                            <RadioGroupItem
                                value="metric"
                                id="r1"
                                className="cursor-pointer border-3 border-secondary-foreground/50 bg-secondary-foreground/10 transition-colors data-checked:border-primary/70 data-checked:bg-primary/40 dark:data-checked:border-primary/90 dark:data-checked:bg-primary/40"
                            />
                            <Label htmlFor="r1" className="cursor-pointer text-base">
                                <div className="flex items-center gap-2">
                                    <span>
                                        <HugeiconsIcon
                                            icon={CelsiusIcon}
                                            size={15.5}
                                            strokeWidth={unit === "metric" ? 2.5 : 2}
                                            className={cn(unit === "metric" && "text-primary")}
                                        />
                                    </span>
                                    <span>Metric</span>
                                </div>
                            </Label>
                        </div>
                        <div className="flex items-center gap-1">
                            <RadioGroupItem
                                value="imperial"
                                id="r2"
                                className="cursor-pointer border-3 border-secondary-foreground/50 bg-secondary-foreground/10 transition-colors data-checked:border-primary/70 data-checked:bg-primary/40 dark:data-checked:border-primary/90 dark:data-checked:bg-primary/40"
                            />
                            <Label htmlFor="r2" className="cursor-pointer text-base">
                                <div className="flex items-center gap-2">
                                    <span>
                                        <HugeiconsIcon
                                            icon={FahrenheitIcon}
                                            size={16}
                                            strokeWidth={unit === "imperial" ? 2.5 : 2}
                                            className={cn(unit === "imperial" && "text-primary")}
                                        />
                                    </span>
                                    <span>Imperial</span>
                                </div>
                            </Label>
                        </div>
                    </RadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
