import logoImg from "./../assets/logo.png";

export default function Logo() {
    return (
        <div className="flex w-fit items-end font-mono">
            <img
                src={logoImg}
                alt="openweathercast-logo"
                className="mr-0.5 h-6 translate-y-[-0.4rem]"
            />
            <span className="bg-linear-to-r from-[#2b7fff] to-[#00bcff] bg-clip-text text-2xl font-black tracking-normal text-transparent">
                penCast
            </span>
        </div>
    );
}
