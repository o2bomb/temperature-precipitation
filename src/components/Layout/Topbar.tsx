import { COUNTRY_DATA } from "pure/country";
import { CountryEnum } from "pure/enums";

interface TopbarProps {
    country: CountryEnum;
    mode: "annual" | "monthly";
}

const Topbar = ({ country, mode }: TopbarProps) => {
    return (
        <header
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    maxWidth: 1400,
                    padding: "1rem 2rem",
                    fontSize: "2rem",
                }}
            >
                <div>
                    <h1
                        style={{
                            fontWeight: 600,
                            letterSpacing: 1,
                        }}
                    >
                        {COUNTRY_DATA[country].flag} {COUNTRY_DATA[country].label}
                    </h1>
                    <p
                        style={{
                            fontSize: "1rem",
                        }}
                    >
                        {COUNTRY_DATA[country].long_lat}
                    </p>
                </div>
                <a
                    href={`/${mode === "annual" ? "monthly" : "annual"}`}
                    style={{
                        fontWeight: 600,
                        textTransform: "uppercase",
                        textAlign: "right",
                    }}
                >
                    {mode === "annual" ? "Annual" : "Monthly"}
                    <span
                        style={{
                            display: "block",
                            color: "#6b7280",
                            fontSize: "1rem",
                        }}
                    >
                        Click to view {mode === "annual" ? "monthly" : "annual"} data
                    </span>
                </a>
            </div>
        </header>
    );
};

export default Topbar;
