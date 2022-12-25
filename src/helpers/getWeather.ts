import { API_ENDPOINT } from "../constants";
import { COUNTRY_DATA } from "../pure/country";
import { CountryEnum, GCMEnum, PeriodEnum, ViewEnum } from "../pure/enums";
import getPeriod from "./getPeriod";
import getVariable from "./getVariable";

type VariableType = "tas" | "pr";

type DataType = "annualavg" | "mavg";

export interface CommonData {
    gcm: GCMEnum;
    variable: VariableType;
    fromYear: number;
    toYear: number;
}

export interface AnnualData extends CommonData {
    annualData: number[];
}

export interface MonthlyData extends CommonData {
    monthVals: number[];
}

export type AnnualDataCollection = AnnualData[];

export type MonthlyDataCollection = MonthlyData[];

// https://stackoverflow.com/a/54166010/15993536
type ResponseType<T> = T extends "annualavg"
    ? AnnualDataCollection
    : T extends "mavg"
    ? MonthlyDataCollection
    : never;

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

    if (!raw.ok || raw.status !== 200) throw new Error("Failed to get weather data.");

    const resp = await raw.json();
    return resp as ResponseType<T>;
}

export interface ProcessedAnnualData {
    gcm: GCMEnum;
    value: number;
}

export type ProcessedAnnualDataCollection = ProcessedAnnualData[];

export function processAnnual(raw: AnnualDataCollection) {
    const arr: ProcessedAnnualDataCollection = [];
    for (const r of raw) {
        arr.push({
            gcm: r.gcm,
            value: r.annualData[0],
        });
    }

    return arr;
}

export interface ProcessedMonthlyData {
    gcm: GCMEnum;
    jan: number;
    feb: number;
    mar: number;
    apr: number;
    may: number;
    jun: number;
    jul: number;
    aug: number;
    sep: number;
    oct: number;
    nov: number;
    dec: number;
}

export type ProcessedMonthlyDataCollection = ProcessedMonthlyData[];

export function processMonthly(raw: MonthlyDataCollection) {
    const arr: ProcessedMonthlyDataCollection = [];
    for (const r of raw) {
        arr.push({
            gcm: r.gcm,
            jan: r.monthVals[0],
            feb: r.monthVals[1],
            mar: r.monthVals[2],
            apr: r.monthVals[3],
            may: r.monthVals[4],
            jun: r.monthVals[5],
            jul: r.monthVals[6],
            aug: r.monthVals[7],
            sep: r.monthVals[8],
            oct: r.monthVals[9],
            nov: r.monthVals[10],
            dec: r.monthVals[11],
        });
    }

    return arr;
}
