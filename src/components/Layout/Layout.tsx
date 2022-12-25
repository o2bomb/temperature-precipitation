import Box from "components/Box";
import Button from "components/Button";
import LabelledSelect from "components/Select";
import { Toggle } from "components/Toggle";
import { CountryEnum, PeriodEnum, ViewEnum } from "pure/enums";
import React from "react";
import styled from "styled-components";
import Main from "./Main";
import Topbar from "./Topbar";

export interface LayoutProps {
    view: ViewEnum;
    onViewChange: (view: ViewEnum) => void;
    country: CountryEnum;
    onCountryChange: (country: CountryEnum) => void;
    period: PeriodEnum;
    onPeriodChange: (period: PeriodEnum) => void;
    children: React.ReactNode;
}

const Layout = ({
    view,
    onViewChange,
    country,
    onCountryChange,
    period,
    onPeriodChange,
    children,
}: LayoutProps) => {
    return (
        <>
            <Topbar country={country} mode="annual" />
            <Main>
                <ResponsiveBox
                    direction="row"
                    spacing="2rem"
                    breakpoint="750px"
                    reverse
                    style={{
                        alignItems: "baseline",
                        marginBottom: "1rem",
                    }}
                >
                    <p
                        style={{
                            fontSize: "1.6rem",
                        }}
                    >
                        Years {period}
                    </p>
                    <ResponsiveToggle
                        options={[
                            {
                                value: ViewEnum.Temperature,
                            },
                            {
                                value: ViewEnum.Precipitation,
                            },
                        ]}
                        value={view}
                        onChange={(key) => onViewChange(key as ViewEnum)}
                        style={{
                            marginLeft: "auto",
                        }}
                    />
                </ResponsiveBox>
                {children}
                <ResponsiveBox
                    direction="row"
                    spacing="2rem"
                    breakpoint="750px"
                    style={{
                        alignItems: "baseline",
                        marginTop: "1rem",
                    }}
                >
                    <ResponsiveBox direction="row" spacing="1rem" breakpoint="950px">
                        <LabelledSelect
                            id="country"
                            label="Country"
                            value={country}
                            onChange={(e) => onCountryChange(e.currentTarget.value as CountryEnum)}
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
                            onChange={(e) => onPeriodChange(e.currentTarget.value as PeriodEnum)}
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
                    </ResponsiveBox>
                    <ResponsiveButton
                        style={{
                            marginLeft: "auto",
                        }}
                    >
                        Enter new datapoint
                    </ResponsiveButton>
                </ResponsiveBox>
            </Main>
        </>
    );
};

export default Layout;

interface ResponsiveBoxProps {
    breakpoint: string;
    reverse?: boolean;
}

const ResponsiveBox = styled(Box)<ResponsiveBoxProps>`
    @media (max-width: ${(props) => props.breakpoint}) {
        flex-direction: ${(props) => (props.reverse ? "column-reverse" : "column")};

        > *:not(:last-child) {
            ${(props) => (props.reverse ? "margin-top: 1rem;" : "margin-bottom: 1rem;")}
        }
    }
`;

const ResponsiveButton = styled(Button)`
    @media (max-width: 750px) {
        width: 100%;
        margin-left: 0;
    }
`;

const ResponsiveToggle = styled(Toggle)`
    @media (max-width: 750px) {
        width: 100%;
        margin-left: 0;
    }
`;
