import { useState } from "react";
import {
    Area,
    AreaChart,
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

enum PeriodEnum {
    Option1 = "2020-2039",
    Option2 = "2040-2059",
    Option3 = "2060-2079",
    Option4 = "2080-2099",
}

enum RegionEnum {
    Croatia = "Croatia",
    Slovenia = "Slovenia",
    Serbia = "Serbia",
    BosniaHerzegovina = "Bosnia & Herzegovina",
    Montenegro = "Montenegro",
    Macedonia = "Macedonia",
    Yugoslavia = "Yugoslavia",
}

enum ViewEnum {
    Temperature = "Temperature",
    Precipitation = "Precipitation",
}

const Annual = () => {
    const [view, setView] = useState(ViewEnum.Temperature);

    const data = [
        {
            name: "Page A",
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

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
                            Croatia ※
                        </h1>
                        <p
                            style={{
                                fontSize: "1rem",
                            }}
                        >
                            45.1000° N, 15.2000° E
                        </p>
                    </div>
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
                    <ResponsiveContainer width="100%" height={600}>
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
                    </ResponsiveContainer>
                </div>
                <Box
                    direction="row"
                    spacing="2rem"
                    style={{
                        alignItems: "baseline",
                        marginTop: "1rem",
                    }}
                >
                    <LabelledSelect id="country" label="Country">
                        <LabelledSelect.Option value={RegionEnum.Croatia}>
                            {RegionEnum.Croatia}
                        </LabelledSelect.Option>
                        <LabelledSelect.Option value={RegionEnum.Slovenia}>
                            {RegionEnum.Slovenia}
                        </LabelledSelect.Option>
                        <LabelledSelect.Option value={RegionEnum.Serbia}>
                            {RegionEnum.Serbia}
                        </LabelledSelect.Option>
                        <LabelledSelect.Option value={RegionEnum.BosniaHerzegovina}>
                            {RegionEnum.BosniaHerzegovina}
                        </LabelledSelect.Option>
                        <LabelledSelect.Option value={RegionEnum.Montenegro}>
                            {RegionEnum.Montenegro}
                        </LabelledSelect.Option>
                        <LabelledSelect.Option value={RegionEnum.Macedonia}>
                            {RegionEnum.Macedonia}
                        </LabelledSelect.Option>
                        <LabelledSelect.Option value={RegionEnum.Yugoslavia}>
                            {RegionEnum.Yugoslavia}
                        </LabelledSelect.Option>
                    </LabelledSelect>
                    <LabelledSelect id="period" label="Period">
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
