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
    const countryData = COUNTRY_DATA[country];

    if (!countryData) throw new Error("Failed to get weather data.");

    if (country === CountryEnum.Yugoslavia) {
        const yugsResp: ResponseType<DataType> = [];
        const gcmList = Object.values(GCMEnum) as GCMEnum[];
        const countryList = Object.values(CountryEnum).filter(
            (c) => c !== CountryEnum.Yugoslavia,
        ) as CountryEnum[];

        const allData: ResponseType<T>[] = [];
        for (let j = 0; j < countryList.length; j++) {
            const raw = await getWeather(type, countryList[j], view, period);
            allData.push(raw);
        }

        for (let i = 0; i < gcmList.length; i++) {
            switch (type) {
                case "annualavg": {
                    const entry: AnnualData = {
                        gcm: gcmList[i],
                        variable,
                        fromYear: periodObj.start,
                        toYear: periodObj.end,
                        annualData: [0],
                    };

                    // Get annual value per gcm by getting the annual gcm data of all countries and averaging them out
                    for (let j = 0; j < countryList.length; j++) {
                        const gcmData = allData[j][i] as AnnualData;
                        entry.annualData[0] += gcmData.annualData[0];
                    }
                    entry.annualData[0] = entry.annualData[0] / countryList.length;
                    (yugsResp as AnnualDataCollection).push(entry);
                    break;
                }
                case "mavg": {
                    const entry: MonthlyData = {
                        gcm: gcmList[i],
                        variable,
                        fromYear: periodObj.start,
                        toYear: periodObj.end,
                        monthVals: new Array(12).fill(0),
                    };

                    // Get monthly value per gcm by getting the monthly gcm data of all countries and averaging them out
                    for (let j = 0; j < countryList.length; j++) {
                        const gcmData = allData[j][i] as MonthlyData;
                        for (let k = 0; k < gcmData.monthVals.length; k++) {
                            entry.monthVals[k] += gcmData.monthVals[k];
                        }
                    }
                    for (let j = 0; j < entry.monthVals.length; j++) {
                        entry.monthVals[j] = entry.monthVals[j] / countryList.length;
                    }

                    (yugsResp as MonthlyDataCollection).push(entry);
                    break;
                }
            }
        }

        return yugsResp as ResponseType<T>;
    }

    const raw = await fetch(
        `${API_ENDPOINT}/country/${type}/${variable}/${periodObj.start}/${periodObj.end}/${countryData.iso_code}`,
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
