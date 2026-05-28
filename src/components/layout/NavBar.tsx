import { NavLink } from "react-router";

import GitHubBtn from "../GitHubBtn";
import LightDarkToggle from "../LightDarkToggle";
import LocationSearch from "../LocationSearch";
import Logo from "../Logo";
import Nav from "../Nav";
import UnitSystemToggle from "../UnitSystemToggle";
import Container from "./Container";

export default function NavBar() {
    return (
        <header className="w-screen">
            <div className="fixed z-1000 w-full border-b border-border/20 bg-background">
                <Container>
                    <div className="flex flex-col items-center justify-between gap-4 py-4 mdlg:flex-row">
                        <div>
                            <NavLink to="/">
                                <Logo />
                            </NavLink>
                        </div>

                        <ul className="flex flex-col items-center gap-3 md:flex-row md:gap-5">
                            <li>
                                <LocationSearch />
                            </li>
                            <div className="flex items-center justify-between gap-3 sm:flex-row">
                                <li>
                                    <Nav />
                                </li>
                                <li>
                                    <LightDarkToggle />
                                </li>

                                <li>
                                    <UnitSystemToggle />
                                </li>

                                <li>
                                    <GitHubBtn />
                                </li>
                            </div>
                        </ul>
                    </div>
                </Container>
            </div>
        </header>
    );
}
