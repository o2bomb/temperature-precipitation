import React, { HTMLAttributes } from "react";
import styled from "styled-components";

export interface ToggleProps extends Omit<HTMLAttributes<HTMLMenuElement>, "onChange"> {
    options: {
        value: string;
        label?: string;
    }[];
    value: string;
    onChange?: (key: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    fullWidth?: boolean;
}

export const Toggle = ({ options, value, onChange, fullWidth, style, ...props }: ToggleProps) => {
    return (
        <menu
            style={{
                display: "inline-flex",
                padding: ".5rem",
                borderRadius: ".7rem",
                backgroundColor: "#111827aa",
                width: fullWidth ? "100%" : undefined,
                ...style,
            }}
            {...props}
        >
            {options.map((o, index) => (
                <li
                    key={index}
                    style={{
                        flex: 1,
                    }}
                >
                    <ToggleButton
                        onClick={(e) => onChange && onChange(o.value, e)}
                        style={{
                            backgroundColor: value === o.value ? "#1f2937" : undefined,
                        }}
                    >
                        {o.label || o.value}
                    </ToggleButton>
                </li>
            ))}
        </menu>
    );
};

const ToggleButton = styled.button`
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;

    :enabled:hover {
        background-color: #1f2937aa;
    }
`;
