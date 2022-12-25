import React, { SelectHTMLAttributes } from "react";
import styled from "styled-components";

interface LabelledSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    id: string;
    label: string;
}

const LabelledSelect = React.forwardRef<HTMLSelectElement, LabelledSelectProps>(
    function LabelledSelect({ id, label, ...props }, ref) {
        return (
            <div
                style={{
                    whiteSpace: "nowrap",
                }}
            >
                <label
                    htmlFor={id}
                    style={{
                        display: "inline-block",
                        color: "#9ca3af",
                        marginRight: "1rem",
                    }}
                >
                    {label}:
                </label>
                <Select ref={ref} id={id} {...props} />
            </div>
        );
    },
);

export default LabelledSelect;

export const Select = React.forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
    function Select(props, ref) {
        return (
            <div
                style={{
                    position: "relative",
                    display: "inline-block",
                }}
            >
                <InnerSelect ref={ref} {...props} />
                <span
                    style={{
                        position: "absolute",
                        top: "50%",
                        right: "1rem",
                        transform: "translate(0, -50%)",
                        fontSize: ".6rem",
                        pointerEvents: "none",
                        userSelect: "none",
                    }}
                >
                    &#9660;
                </span>
            </div>
        );
    },
);

const InnerSelect = styled.select`
    position: relative;
    padding: 0.5rem 1rem;
    padding-right: 3rem;
    background-color: #1f2937;
    border-radius: 0.5rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;

    :enabled:hover {
        background-color: #1f2937aa;
    }
`;

export const Option = styled.option``;
