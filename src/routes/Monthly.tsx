import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "components/Box";
import Button from "components/Button";
import Layout from "components/Layout/Layout";
import { MonthlyMutationForm, MonthlyMutationType } from "components/Monthly/MonthlyMutationForm";
import { MonthlyTable } from "components/Monthly/MonthlyTable";
import getWeather, {
    MonthlyDataCollection,
    ProcessedMonthlyData,
    ProcessedMonthlyDataCollection,
    processMonthly,
} from "helpers/getWeather";
import useQueryState from "hooks/useQueryState";
import { CountryEnum, GCMEnum, PeriodEnum, ViewEnum } from "pure/enums";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const TABLE_HEIGHT = 600;

const Monthly = () => {
    const navigate = useNavigate();
    const [view, setView] = useQueryState<ViewEnum>("view", ViewEnum.Temperature);
    const [country, setCountry] = useQueryState<CountryEnum>("country", CountryEnum.Croatia);
    const [period, setPeriod] = useQueryState<PeriodEnum>("period", PeriodEnum.Option1);

    const [data, setData] = useState<ProcessedMonthlyDataCollection>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();

    const getData = useCallback(async () => {
        setLoading(true);
        try {
            setError(undefined);
            const resp = await getWeather("mavg", country, view, period);

            setData(processMonthly(resp));
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

    const mutateData = useCallback((data: MonthlyMutationType) => {
        setData((prev) => {
            switch (data.type) {
                case "new": {
                    const result = prev.map((p) => p);
                    const monthlyValues = new Array(12).fill(0);
                    const rawValues = data.newValues.split(",");
                    for (let i = 0; i < rawValues.length; i++) {
                        monthlyValues[i] = parseFloat(rawValues[i]);
                    }
                    result.push({
                        gcm: data.gcmName as GCMEnum,
                        jan: monthlyValues[0],
                        feb: monthlyValues[1],
                        mar: monthlyValues[2],
                        apr: monthlyValues[3],
                        may: monthlyValues[4],
                        jun: monthlyValues[5],
                        jul: monthlyValues[6],
                        aug: monthlyValues[7],
                        sep: monthlyValues[8],
                        oct: monthlyValues[9],
                        nov: monthlyValues[10],
                        dec: monthlyValues[11],
                    });
                    return result;
                }
                case "modify":
                    const result = prev.map((p) => p);
                    const i = result.findIndex((r) => r.gcm === data.selectedGCM);
                    (result[i][
                        data.selectedMonth.slice(0, 3).toLowerCase() as keyof ProcessedMonthlyData
                    ] as number) = data.modifiedValue;
                    return result;
            }
        });
    }, []);

    const content = useMemo(() => {
        if (error) {
            return (
                <Box
                    style={{
                        minHeight: TABLE_HEIGHT,
                    }}
                    spacing="1rem"
                    centerItems
                >
                    <FontAwesomeIcon icon={faExclamationCircle} size="6x" color="#9ca3af" />
                    <p style={{ fontSize: "1.6rem", color: "#9ca3af" }}>{error}</p>
                    <Button
                        onClick={() => {
                            navigate("/monthly");
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
                        minHeight: TABLE_HEIGHT,
                    }}
                    centerItems
                >
                    <p className="loading-text">Loading weather data</p>
                </Box>
            );
        }

        return <MonthlyTable data={data} view={view} />;
    }, [data, error, loading, navigate, view]);

    return (
        <Layout
            disableDataEntry={loading || !!error}
            mode="monthly"
            view={view}
            onViewChange={(v) => setView(v)}
            country={country}
            onCountryChange={(v) => setCountry(v)}
            period={period}
            onPeriodChange={(v) => setPeriod(v)}
            modal={{
                render: (handleClose) => {
                    return (
                        <ModalContent spacing="1rem">
                            <h2>Submit new data point</h2>
                            <MonthlyMutationForm
                                data={data}
                                onSubmit={(data) => {
                                    mutateData(data);
                                    handleClose();
                                }}
                            />
                        </ModalContent>
                    );
                },
            }}
        >
            {content}
        </Layout>
    );
};

const ModalContent = styled(Box)`
    h2 {
        font-size: 1.6rem;
    }
`;

export default Monthly;

const DUMMY_DATA = [
    {
        gcm: "access1-0",
        variable: "tas",
        fromYear: 2020,
        toYear: 2039,
        monthVals: [2.04, 3.27, 6.29, 10.84, 15.67, 21.02, 23.85, 23.73, 18.73, 12.34, 7.83, 5.01],
    },
    {
        gcm: "bnu-esm",
        variable: "tas",
        fromYear: 2020,
        toYear: 2039,
        monthVals: [3.99, 3.46, 5.24, 8.95, 13.64, 19.4, 23.22, 24.38, 18.81, 13.08, 8.04, 5.31],
    },
    {
        gcm: "canesm2",
        variable: "tas",
        fromYear: 2020,
        toYear: 2039,
        monthVals: [3.94, 4.87, 7.25, 10.82, 15.58, 22.03, 24.89, 23.88, 16.48, 10.15, 6.53, 5.15],
    },
    {
        gcm: "csiro-mk3-6-0",
        variable: "tas",
        fromYear: 2020,
        toYear: 2039,
        monthVals: [2.2, 3.18, 5.87, 9.42, 14.44, 20.7, 24.03, 23.59, 18.2, 12.29, 7.64, 4.39],
    },
    {
        gcm: "gfdl-cm3",
        variable: "tas",
        fromYear: 2020,
        toYear: 2039,
        monthVals: [4.33, 4.78, 7.69, 11.6, 15.95, 20.42, 23.93, 24.79, 20.42, 14.78, 9.02, 5.83],
    },
    {
        gcm: "hadgem2-ao",
        variable: "tas",
        fromYear: 2020,
        toYear: 2039,
        monthVals: [-0.78, 1.58, 6.47, 12.72, 17.85, 23.54, 25.63, 25.6, 18.62, 12.44, 5.39, 1.76],
    },
    {
        gcm: "ipsl-cm5a-mr",
        variable: "tas",
        fromYear: 2020,
        toYear: 2039,
        monthVals: [3.39, 3.62, 6.42, 10.2, 14.97, 19.95, 23.36, 23.1, 19.22, 13.29, 8.88, 4.73],
    },
    {
        gcm: "miroc5",
        variable: "tas",
        fromYear: 2020,
        toYear: 2039,
        monthVals: [1.54, 2.89, 7.59, 12.79, 18.56, 22.94, 25.85, 24.26, 18.91, 13.3, 6.94, 2.57],
    },
    {
        gcm: "mri-cgcm3",
        variable: "tas",
        fromYear: 2020,
        toYear: 2039,
        monthVals: [3.48, 5.52, 6.83, 10.88, 14.95, 19.53, 22.11, 21.09, 16.72, 11.58, 7.78, 4.78],
    },
    {
        gcm: "noresm1-m",
        variable: "tas",
        fromYear: 2020,
        toYear: 2039,
        monthVals: [5.46, 5.92, 7.74, 10.88, 15.14, 19.69, 22.29, 22.06, 17.37, 11.08, 8.02, 6.05],
    },
] as MonthlyDataCollection;
