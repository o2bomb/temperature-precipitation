import { COUNTRY_DATA } from "pure/country";
import { CountryEnum } from "pure/enums";
import styled from "styled-components";

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
            <ResponsiveWrap>
                <div
                    style={{
                        whiteSpace: "nowrap",
                    }}
                >
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
                <Switch href={`/${mode === "annual" ? "monthly" : "annual"}`}>
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
                </Switch>
            </ResponsiveWrap>
        </header>
    );
};

export default Topbar;

const Switch = styled.a`
    font-weight: 600;
    text-transform: uppercase;
    text-align: right;
`;

const ResponsiveWrap = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1400px;
    padding: 1rem 2rem;
    font-size: 2rem;

    @media (max-width: 750px) {
        flex-direction: column-reverse;

        ${Switch} {
            margin-bottom: 1rem;
            text-align: left;
        }
    }
`;
