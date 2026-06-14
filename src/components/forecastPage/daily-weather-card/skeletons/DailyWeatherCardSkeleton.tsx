import Container from "@/components/layout/Container";
import { cn } from "@/lib/utils";

import DayCardSkeleton from "./DayCardSkeleton";

type Props = {
    className?: string;
};

export default function DailyWeatherCardSkeleton({ className }: Props) {
    return (
        <div className={cn("bg-primary/10 py-6 mt-6", className)}>
            <Container>
                <div className="relative w-full">
                    <div
                        className={cn(
                            "absolute right-0 z-1000 h-full w-30 lgxl:block",
                            "bg-[linear-gradient(90deg,transparent_0%,#FFF3E5_100%)]",
                            "dark:bg-[linear-gradient(90deg,transparent_0%,#05122F_100%)]",
                        )}
                    />
                    <div className="lite-scrollbar relative w-auto overflow-y-scroll pr-20">
                        <div className="flex w-fit gap-4 rounded-sm bg-transparent">
                            {Array.from({ length: 8 })
                                .fill(0)
                                .map(function (_, i) {
                                    return <DayCardSkeleton key={i} />;
                                })}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
