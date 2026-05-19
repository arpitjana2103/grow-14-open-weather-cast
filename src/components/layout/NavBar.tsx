import { NavLink } from "react-router";

import Container from "../Container";
import GitHubBtn from "../GitHubBtn";
import LightDarkToggle from "../LightDarkToggle";
import LocationSearch from "../LocationSearch";
import Logo from "../Logo";
import Nav from "../Nav";

export default function NavBar() {
    return (
        <header className="w-screen">
            <Container>
                <div className="flex flex-col items-center justify-between gap-4 py-4 mdlg:flex-row">
                    <div>
                        <NavLink to="/">
                            <Logo />
                        </NavLink>
                    </div>

                    <ul className="flex flex-col items-center gap-2.5 sm:flex-row">
                        <li>
                            <LocationSearch />
                        </li>
                        <div className="flex items-center gap-4.5 sm:flex-row sm:gap-2.5">
                            <li>
                                <Nav />
                            </li>
                            <li>
                                <LightDarkToggle />
                            </li>
                            <li>
                                <GitHubBtn />
                            </li>
                        </div>
                    </ul>
                </div>
            </Container>
        </header>
    );
}
