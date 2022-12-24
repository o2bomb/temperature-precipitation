import { API_ENDPOINT } from "../constants";
import { COUNTRY_DATA } from "../pure/country";
import { CountryEnum, GCMEnum, PeriodEnum, ViewEnum } from "../pure/enums";
import getPeriod from "./getPeriod";
import getVariable from "./getVariable";

type VariableType = "tas" | "pr";

type DataType = "annualavg" | "mavg";

interface CommonData {
    gcm: GCMEnum;
    variable: VariableType;
    fromYear: number;
    toYear: number;
}

export type AnnualData = CommonData & {
    annualData: number[];
};

export type MonthlyData = CommonData & {
    monthVals: number[];
};

// https://stackoverflow.com/a/54166010/15993536
type ResponseType<T> = T extends "annualavg" ? AnnualData : T extends "mavg" ? MonthlyData : never;

export default async function getWeather<T extends DataType>(
    type: T,
    country: CountryEnum,
    view: ViewEnum,
    period: PeriodEnum,
) {
    const periodObj = getPeriod(period);
    const variable = getVariable(view);
    const raw = await fetch(
        `${API_ENDPOINT}/country/${type}/${variable}/${periodObj.start}/${periodObj.end}/${COUNTRY_DATA[country].iso_code}`,
    );

    if (!raw.ok || raw.status !== 200) throw new Error("Failed to get weather data");

    const resp = await raw.json();
    return resp as ResponseType<T>;
}
