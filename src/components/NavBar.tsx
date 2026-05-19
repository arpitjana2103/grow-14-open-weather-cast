import LightDarkToggle from "./LightDarkToggle";
import LocationSearch from "./LocationSearch";
import Logo from "./Logo";

export default function NavBar() {
    return (
        <header className="w-screen">
            <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-8 py-4">
                <div>
                    <Logo />
                </div>

                <ul className="flex items-center gap-2.5">
                    <li>
                        <LocationSearch />
                    </li>
                    <li>
                        <LightDarkToggle />
                    </li>
                </ul>
            </div>
        </header>
    );
}
