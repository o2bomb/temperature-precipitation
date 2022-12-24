import { useCallback, useEffect, useMemo, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import Box from "../components/Box";
import Button from "../components/Button";
import LabelledSelect from "../components/Select";
import { Toggle } from "../components/Toggle";
import { CommonData } from "../helpers/getWeather";
import { COUNTRY_DATA } from "../pure/country";
import { CountryEnum, PeriodEnum, ViewEnum } from "../pure/enums";

interface CleanAnnualData extends CommonData {
    processedData: number;
}

const GRAPH_HEIGHT = 600;

const Annual = () => {
    // todo read from url params
    const [view, setView] = useState(ViewEnum.Temperature);
    const [country, setCountry] = useState(CountryEnum.Croatia);
    const [period, setPeriod] = useState(PeriodEnum.Option1);

    const [data, setData] = useState<CleanAnnualData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();

    const getData = useCallback(async () => {
        setLoading(true);
        try {
            // const resp = await getWeather("annualavg", country, view, period);
            const resp: any = [
                {
                    gcm: "access1-0",
                    variable: "tas",
                    fromYear: 2020,
                    toYear: 2039,
                    annualData: [12.55],
                },
                {
                    gcm: "bnu-esm",
                    variable: "tas",
                    fromYear: 2020,
                    toYear: 2039,
                    annualData: [12.29],
                },
                {
                    gcm: "canesm2",
                    variable: "tas",
                    fromYear: 2020,
                    toYear: 2039,
                    annualData: [12.63],
                },
                {
                    gcm: "csiro-mk3-6-0",
                    variable: "tas",
                    fromYear: 2020,
                    toYear: 2039,
                    annualData: [12.16],
                },
                {
                    gcm: "gfdl-cm3",
                    variable: "tas",
                    fromYear: 2020,
                    toYear: 2039,
                    annualData: [13.63],
                },
                {
                    gcm: "hadgem2-ao",
                    variable: "tas",
                    fromYear: 2020,
                    toYear: 2039,
                    annualData: [12.57],
                },
                {
                    gcm: "ipsl-cm5a-mr",
                    variable: "tas",
                    fromYear: 2020,
                    toYear: 2039,
                    annualData: [12.59],
                },
                {
                    gcm: "miroc5",
                    variable: "tas",
                    fromYear: 2020,
                    toYear: 2039,
                    annualData: [13.18],
                },
                {
                    gcm: "mri-cgcm3",
                    variable: "tas",
                    fromYear: 2020,
                    toYear: 2039,
                    annualData: [12.1],
                },
                {
                    gcm: "noresm1-m",
                    variable: "tas",
                    fromYear: 2020,
                    toYear: 2039,
                    annualData: [12.64],
                },
            ];

            const processed: CleanAnnualData[] = [];
            resp.forEach((r: any) => {
                if (r.annualData.length < 1) return;
                processed.push({
                    ...r,
                    processedData: r.annualData[0],
                });
            });

            setData(processed);
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
    }, []);
    useEffect(() => {
        getData();
    }, [getData]);

    const content = useMemo(() => {
        if (error) {
            return (
                <Box
                    style={{
                        minHeight: GRAPH_HEIGHT,
                    }}
                    centerItems
                >
                    {/* todo: large error icon here */}
                    <p>{error}</p>
                    <Button onClick={getData}>Reload Data</Button>
                </Box>
            );
        }

        if (loading) {
            return (
                <Box
                    style={{
                        minHeight: GRAPH_HEIGHT,
                    }}
                    centerItems
                >
                    <p>Loading weather data...</p>
                </Box>
            );
        }

        return (
            <div
                style={{
                    marginLeft: "-1rem",
                    marginRight: "-1rem",
                }}
            >
                <ResponsiveContainer width="100%" height={GRAPH_HEIGHT}>
                    <BarChart
                        data={data}
                        margin={{
                            right: 20,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="30%"
                                    stopColor={
                                        view === ViewEnum.Temperature ? "#fb923c" : "#3b82f6"
                                    }
                                    stopOpacity={0.9}
                                />
                                <stop offset="100%" stopColor="transparent" stopOpacity={0.2} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#f5f5f522" />
                        <XAxis dataKey="gcm" stroke="#f9fafb" />
                        <YAxis stroke="#f9fafb" />
                        <Tooltip
                            labelStyle={{
                                color: "#111827",
                            }}
                            contentStyle={{
                                color: "#111827",
                            }}
                        />
                        <Legend
                            formatter={(value) => {
                                if (value === "processedData") {
                                    switch (view) {
                                        case ViewEnum.Temperature:
                                            return "Temperature (℃)";
                                        case ViewEnum.Precipitation:
                                            return "Precipitation (mm)";
                                    }
                                }
                                return value;
                            }}
                        />
                        <Bar dataKey="processedData" radius={[4, 4, 0, 0]} fill="url(#colorUv)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }, [data, error, getData, loading, view]);

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
                <div
                    style={{
                        marginBottom: "1rem",
                    }}
                >
                    <label
                        style={{
                            display: "inline-block",
                            marginRight: "1rem",
                            color: "#9ca3af",
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
                {content}
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
