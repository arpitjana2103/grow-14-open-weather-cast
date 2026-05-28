import { Outlet } from "react-router";

import NavBar from "@/components/layout/NavBar";

export default function MainPage() {
    return (
        <>
            <NavBar />
            <div className="pt-[11.52rem] md:pt-[8rem] mdlg:pt-[5rem]">
                <Outlet />
            </div>
        </>
    );
}
