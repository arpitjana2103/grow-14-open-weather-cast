import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";

export default function GitHubBtn() {
    return (
        <a
            href="https://github.com/arpitjana2103/grow-14-open-weather-cast"
            target="_blank"
            rel="noopener noreferrer"
        >
            <Button className="h-10 cursor-pointer border border-foreground bg-accent text-base hover:bg-accent/20">
                <HugeiconsIcon
                    icon={GithubIcon}
                    size={19}
                    strokeWidth={1.7}
                    className="size-5 text-foreground"
                />
                <span className="text-foreground/80">Github</span>
            </Button>
        </a>
    );
}
