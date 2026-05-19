import logoImg from "./../assets/logo.png";

export default function Logo() {
    return (
        <div className="flex w-fit items-end font-mono">
            <img
                src={logoImg}
                alt="openweathercast-logo"
                className="mr-0.5 h-6 translate-y-[-0.4rem]"
            />
            <span className="bg-linear-to-r from-(--blue600) to-(--sky600) bg-clip-text text-2xl font-black tracking-normal text-transparent">
                skycast
            </span>
        </div>
    );
}
