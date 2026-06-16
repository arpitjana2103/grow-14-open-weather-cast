import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";

export default function GitHubBtn({ className }: { className?: string }) {
    return (
        <a
            href="https://github.com/arpitjana2103/grow-14-open-weather-cast"
            target="_blank"
            rel="noopener noreferrer"
            className={className}
        >
            <Button className="h-10 cursor-pointer bg-transparent text-base hover:bg-accent/20">
                <HugeiconsIcon
                    icon={GithubIcon}
                    size={19}
                    strokeWidth={1.7}
                    className="size-5 text-foreground"
                />
            </Button>
        </a>
    );
}
