import { CountryEnum } from "./enums";

interface Country {
    label: CountryEnum;
    long_lat: string;
    iso_code: string;
    flag: string;
}

export const COUNTRY_DATA: Record<CountryEnum, Country> = {
    [CountryEnum.Croatia]: {
        label: CountryEnum.Croatia,
        long_lat: "45.1000° N, 15.2000° E",
        iso_code: "HRV",
        flag: "🇭🇷",
    },
    [CountryEnum.Slovenia]: {
        label: CountryEnum.Slovenia,
        long_lat: "46.1512° N, 14.9955° E",
        iso_code: "SVN",
        flag: "🇸🇮",
    },
    [CountryEnum.Serbia]: {
        label: CountryEnum.Serbia,
        long_lat: "44.0165° N, 21.0059° E",
        iso_code: "SRB",
        flag: "🇷🇸",
    },
    [CountryEnum.BosniaHerzegovina]: {
        label: CountryEnum.BosniaHerzegovina,
        long_lat: "43.9159° N, 17.6791° E",
        iso_code: "BIH",
        flag: "🇧🇦",
    },
    [CountryEnum.Montenegro]: {
        label: CountryEnum.Montenegro,
        long_lat: "42.7087° N, 19.3744° E",
        iso_code: "MNE",
        flag: "🇲🇪",
    },
    [CountryEnum.Macedonia]: {
        label: CountryEnum.Macedonia,
        long_lat: "41.6086° N, 21.7453° E",
        iso_code: "MKD",
        flag: "🇲🇰",
    },
    [CountryEnum.Yugoslavia]: {
        label: CountryEnum.Yugoslavia,
        long_lat: "44.8190° N, 20.4573° E",
        iso_code: "",
        flag: "🌍",
    },
};
