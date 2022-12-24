import { useEffect, useState } from "react";
import Box from "../components/Box";
import Button from "../components/Button";
import LabelledSelect from "../components/Select";
import { Toggle } from "../components/Toggle";
import getWeather, { AnnualData } from "../helpers/getWeather";
import { COUNTRY_DATA } from "../pure/country";
import { CountryEnum, PeriodEnum, ViewEnum } from "../pure/enums";

const Annual = () => {
    // todo read from url params
    const [view, setView] = useState(ViewEnum.Temperature);
    const [country, setCountry] = useState(CountryEnum.Croatia);
    const [period, setPeriod] = useState(PeriodEnum.Option1);

    const [data, setData] = useState<AnnualData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const resp = await getWeather("annualavg", country, view, period);
                console.log(resp);
                setData(resp);
                setError(undefined);
            } catch (e) {
                if (typeof e === "string") {
                    setError(e);
                } else if (e instanceof Error) {
                    setError(e.message);
                }
            } finally {
                setLoading(false);
            }
        })();
    }, [country, period, view]);

    return (
        <>
            <Topbar>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
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
                        href="/monthly"
                        style={{
                            fontWeight: 600,
                            textTransform: "uppercase",
                            textAlign: "right",
                        }}
                    >
                        Annual
                        <span
                            style={{
                                display: "block",
                                color: "#6b7280",
                                fontSize: "1rem",
                            }}
                        >
                            Click to view monthly data
                        </span>
                    </a>
                </div>
            </Topbar>
            <Main>
                <div>
                    <label
                        style={{
                            display: "inline-block",
                            marginRight: "1rem",
                        }}
                    >
                        View:
                    </label>
                    <Toggle
                        options={[
                            {
                                value: ViewEnum.Temperature,
                            },
                            {
                                value: ViewEnum.Precipitation,
                            },
                        ]}
                        value={view}
                        onChange={(key) => setView(key as ViewEnum)}
                    />
                </div>
                <div
                    style={{
                        marginLeft: "-1rem",
                        marginRight: "-1rem",
                    }}
                >
                    {/* <ResponsiveContainer width="100%" height={600}>
                        <AreaChart
                            data={data}
                            margin={{
                                right: 20,
                            }}
                        >
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Legend verticalAlign="top" height={36} />
                            <Tooltip
                                labelStyle={{
                                    color: "#111827",
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="uv"
                                stroke="#8884d8"
                                fillOpacity={1}
                                fill="url(#colorUv)"
                            />
                            <Area
                                type="monotone"
                                dataKey="pv"
                                stroke="#82ca9d"
                                fillOpacity={1}
                                fill="url(#colorPv)"
                            />
                        </AreaChart>
                    </ResponsiveContainer> */}
                </div>
                <Box
                    direction="row"
                    spacing="2rem"
                    style={{
                        alignItems: "baseline",
                        marginTop: "1rem",
                    }}
                >
                    <LabelledSelect
                        id="country"
                        label="Country"
                        value={country}
                        onChange={(e) => setCountry(e.currentTarget.value as CountryEnum)}
                    >
                        <LabelledSelect.Option value={CountryEnum.Croatia}>
                            {CountryEnum.Croatia}
                        </LabelledSelect.Option>
                        <LabelledSelect.Option value={CountryEnum.Slovenia}>
                            {CountryEnum.Slovenia}
                        </LabelledSelect.Option>
                        <LabelledSelect.Option value={CountryEnum.Serbia}>
                            {CountryEnum.Serbia}
                        </LabelledSelect.Option>
                        <LabelledSelect.Option value={CountryEnum.BosniaHerzegovina}>
                            {CountryEnum.BosniaHerzegovina}
                        </LabelledSelect.Option>
                        <LabelledSelect.Option value={CountryEnum.Montenegro}>
                            {CountryEnum.Montenegro}
                        </LabelledSelect.Option>
                        <LabelledSelect.Option value={CountryEnum.Macedonia}>
                            {CountryEnum.Macedonia}
                        </LabelledSelect.Option>
                        <LabelledSelect.Option value={CountryEnum.Yugoslavia}>
                            {CountryEnum.Yugoslavia}
                        </LabelledSelect.Option>
                    </LabelledSelect>
                    <LabelledSelect
                        id="period"
                        label="Period"
                        value={period}
                        onChange={(e) => setPeriod(e.currentTarget.value as PeriodEnum)}
                    >
                        <LabelledSelect.Option value={PeriodEnum.Option1}>
                            {PeriodEnum.Option1}
                        </LabelledSelect.Option>
                        <LabelledSelect.Option value={PeriodEnum.Option2}>
                            {PeriodEnum.Option2}
                        </LabelledSelect.Option>
                        <LabelledSelect.Option value={PeriodEnum.Option3}>
                            {PeriodEnum.Option3}
                        </LabelledSelect.Option>
                        <LabelledSelect.Option value={PeriodEnum.Option4}>
                            {PeriodEnum.Option4}
                        </LabelledSelect.Option>
                    </LabelledSelect>
                    <Button
                        style={{
                            marginLeft: "auto",
                        }}
                    >
                        Enter new datapoint
                    </Button>
                </Box>
            </Main>
        </>
    );
};

interface TopbarProps {
    children: React.ReactNode;
}

const Topbar = ({ children }: TopbarProps) => {
    return (
        <header
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 1400,
                    padding: "1rem 2rem",
                    fontSize: "2rem",
                }}
            >
                {children}
            </div>
        </header>
    );
};

interface MainProps {
    children: React.ReactNode;
}

const Main = ({ children }: MainProps) => {
    return (
        <main
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    maxWidth: 1400,
                    padding: "2rem",
                }}
            >
                {children}
            </div>
        </main>
    );
};

export default Annual;
