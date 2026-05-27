import { LoaderCircle } from "lucide-react";

export default function Spinner() {
    return (
        <div className="">
            <LoaderCircle size={18} strokeWidth={2} className="animate-spin" />
        </div>
    );
}
