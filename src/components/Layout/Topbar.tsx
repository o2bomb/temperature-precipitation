import { COUNTRY_DATA } from "pure/country";
import { CountryEnum } from "pure/enums";
import styled from "styled-components";

interface TopbarProps {
    country: CountryEnum;
    mode: "annual" | "monthly";
}

const Topbar = ({ country, mode }: TopbarProps) => {
    const countryData = COUNTRY_DATA[country];
    return (
        <header
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <ResponsiveWrap>
                {countryData && (
                    <div>
                        <h1
                            style={{
                                fontWeight: 600,
                                letterSpacing: 1,
                            }}
                        >
                            {countryData.flag} {countryData.label}
                        </h1>
                        <p
                            style={{
                                fontSize: "1rem",
                            }}
                        >
                            {countryData.long_lat}
                        </p>
                    </div>
                )}
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
    margin-left: auto;
`;

const ResponsiveWrap = styled.div`
    display: flex;
    width: 100%;
    max-width: 1400px;
    padding: 1rem 2rem;
    font-size: 2rem;

    @media (max-width: 750px) {
        flex-direction: column-reverse;

        ${Switch} {
            margin-bottom: 1rem;
            margin-left: 0;
            text-align: left;
        }
    }
`;
