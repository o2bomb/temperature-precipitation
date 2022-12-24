import { HTMLAttributes } from "react";
import styled from "styled-components";

interface LabelledSelectProps extends HTMLAttributes<HTMLSelectElement> {
    id: string;
    label: string;
}

const LabelledSelect = ({ id, label, ...props }: LabelledSelectProps) => {
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
                    marginRight: "1rem",
                }}
            >
                {label}:
            </label>
            <Select id={id} {...props} />
        </div>
    );
};

const Select = styled((props) => (
    <div
        style={{
            position: "relative",
            display: "inline-block",
        }}
    >
        <select {...props} />
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
))`
    position: relative;
    padding: 0.5rem 1rem;
    padding-right: 3rem;
    background-color: #1f2937;
    border-radius: 0.5rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
`;

LabelledSelect.Select = Select;

const Option = styled.option``;

LabelledSelect.Option = Option;

export default LabelledSelect;