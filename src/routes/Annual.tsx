import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "components/Box";
import Button from "components/Button";
import Layout from "components/Layout/Layout";
import { WeatherTooltip } from "components/WeatherTooltip";
import getWeather, {
    AnnualDataCollection,
    processAnnual,
    ProcessedAnnualDataCollection,
} from "helpers/getWeather";
import useQueryState from "hooks/useQueryState";
import { CountryEnum, PeriodEnum, ViewEnum } from "pure/enums";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const GRAPH_HEIGHT = 600;

const Annual = () => {
    const navigate = useNavigate();
    const [view, setView] = useQueryState<ViewEnum>("view", ViewEnum.Temperature);
    const [country, setCountry] = useQueryState<CountryEnum>("country", CountryEnum.Croatia);
    const [period, setPeriod] = useQueryState<PeriodEnum>("period", PeriodEnum.Option1);

    const [data, setData] = useState<ProcessedAnnualDataCollection>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();

    const getData = useCallback(async () => {
        setLoading(true);
        try {
            setError(undefined);
            const resp = await getWeather("annualavg", country, view, period);

            setData(processAnnual(resp));
        } catch (e) {
            if (typeof e === "string") {
                setError(e);
            } else if (e instanceof Error) {
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    }, [country, period, view]);
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
                    spacing="1rem"
                    centerItems
                >
                    <FontAwesomeIcon icon={faExclamationCircle} size="6x" color="#9ca3af" />
                    <p style={{ fontSize: "1.6rem", color: "#9ca3af" }}>{error}</p>
                    <Button
                        onClick={() => {
                            navigate("/annual");
                        }}
                        style={{
                            padding: ".5rem 1rem",
                        }}
                    >
                        Retry
                    </Button>
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
                    overflowX: "auto",
                    marginLeft: "-1rem",
                    marginRight: "-1rem",
                }}
            >
                <ResponsiveContainer width="100%" minWidth={700} height={GRAPH_HEIGHT}>
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
                                        view === ViewEnum.Temperature ? "#f59e0b" : "#38bdf8"
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
                            content={<WeatherTooltip view={view} />}
                            contentStyle={{
                                color: "#111827",
                            }}
                        />
                        <Legend
                            formatter={(value) => {
                                if (value === "value") {
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
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="url(#colorUv)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }, [data, error, loading, setCountry, setPeriod, setView, view]);

    return (
        <Layout
            mode="annual"
            view={view}
            onViewChange={(v) => setView(v)}
            country={country}
            onCountryChange={(v) => setCountry(v)}
            period={period}
            onPeriodChange={(v) => setPeriod(v)}
        >
            {content}
        </Layout>
    );
};

export default Annual;

const DUMMY_DATA = [
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
] as AnnualDataCollection;
