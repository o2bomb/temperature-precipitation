import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "components/Box";
import Button from "components/Button";
import Footer from "components/Footer";
import LabelledSelect, { Option } from "components/LabelledSelect";
import { Toggle } from "components/Toggle";
import { CountryEnum, PeriodEnum, ViewEnum } from "pure/enums";
import React, { useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import Main from "./Main";
import Topbar from "./Topbar";

export type ModeType = "annual" | "monthly";

export interface LayoutProps {
    disableDataEntry: boolean;
    mode: ModeType;
    view: ViewEnum;
    onViewChange: (view: ViewEnum) => void;
    country: CountryEnum;
    onCountryChange: (country: CountryEnum) => void;
    period: PeriodEnum;
    onPeriodChange: (period: PeriodEnum) => void;
    modal: {
        render: (handleClose: () => void) => React.ReactNode;
        width?: string;
    };
    children: React.ReactNode;
}

const Layout = ({
    disableDataEntry,
    mode,
    view,
    onViewChange,
    country,
    onCountryChange,
    period,
    onPeriodChange,
    modal,
    children,
}: LayoutProps) => {
    const [showEntryModal, setShowEntryModal] = useState(false);

    return (
        <>
            <Topbar country={country} mode={mode} />
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
                                label: `${ViewEnum.Temperature} (℃)`,
                                value: ViewEnum.Temperature,
                            },
                            {
                                label: `${ViewEnum.Precipitation} (mm)`,
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
                            <Option value={CountryEnum.Croatia}>{CountryEnum.Croatia}</Option>
                            <Option value={CountryEnum.Slovenia}>{CountryEnum.Slovenia}</Option>
                            <Option value={CountryEnum.Serbia}>{CountryEnum.Serbia}</Option>
                            <Option value={CountryEnum.BosniaHerzegovina}>
                                {CountryEnum.BosniaHerzegovina}
                            </Option>
                            <Option value={CountryEnum.Montenegro}>{CountryEnum.Montenegro}</Option>
                            <Option value={CountryEnum.Macedonia}>{CountryEnum.Macedonia}</Option>
                            <Option value={CountryEnum.Yugoslavia}>{CountryEnum.Yugoslavia}</Option>
                        </LabelledSelect>
                        <LabelledSelect
                            id="period"
                            label="Period"
                            value={period}
                            onChange={(e) => onPeriodChange(e.currentTarget.value as PeriodEnum)}
                        >
                            <Option value={PeriodEnum.Option1}>{PeriodEnum.Option1}</Option>
                            <Option value={PeriodEnum.Option2}>{PeriodEnum.Option2}</Option>
                            <Option value={PeriodEnum.Option3}>{PeriodEnum.Option3}</Option>
                            <Option value={PeriodEnum.Option4}>{PeriodEnum.Option4}</Option>
                        </LabelledSelect>
                    </ResponsiveBox>
                    <ResponsiveButton
                        disabled={disableDataEntry}
                        onClick={() => setShowEntryModal(true)}
                        style={{
                            marginLeft: "auto",
                        }}
                    >
                        Enter new datapoint
                    </ResponsiveButton>
                </ResponsiveBox>
            </Main>
            <Footer />
            <ReactModal
                shouldCloseOnEsc
                shouldCloseOnOverlayClick
                isOpen={showEntryModal}
                onRequestClose={() => setShowEntryModal(false)}
                style={{
                    content: {
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        width: "100%",
                        maxWidth: modal.width || 600,
                        padding: "2rem",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#111827",
                        border: "none",
                    },
                    overlay: {
                        zIndex: 9999,
                        backgroundColor: "rgba(0, 0, 0, .6)",
                    },
                }}
            >
                <CloseButton onClick={() => setShowEntryModal(false)}>
                    <FontAwesomeIcon icon={faClose} size="2x" />
                    <span className="visually-hidden">Close</span>
                </CloseButton>
                {modal.render(() => {
                    setShowEntryModal(false);
                })}
            </ReactModal>
        </>
    );
};

export default Layout;

const CloseButton = styled.button`
    position: absolute;
    top: 2rem;
    right: 2rem;
`;

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

    @media (max-width: 450px) {
        flex-direction: column;
    }
`;
