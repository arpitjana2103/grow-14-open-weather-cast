import { Outlet } from "react-router";

import NavBar from "../navbar/NavBar";

export default function AppLayout() {
    return (
        <div className="flex h-dvh flex-col">
            <NavBar />
            <div className="flex-1 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
}
