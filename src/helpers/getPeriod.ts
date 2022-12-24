import { PeriodEnum } from "../pure/enums";

export default function getPeriod(period: PeriodEnum) {
    const raw = period.split("-").map((p) => parseInt(p));

    if (raw.length < 2) throw new Error("Invalid period enum provided:" + period);

    return {
        start: raw[0],
        end: raw[1],
    };
}
