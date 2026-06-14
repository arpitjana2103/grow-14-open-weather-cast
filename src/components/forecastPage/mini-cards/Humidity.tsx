import { cn } from "@/lib/utils";

type Props = {
    className?: string;
};

export default function Humidity({ className }: Props) {
    return <div className={cn("", className)}></div>;
}
