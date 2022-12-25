import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";
import Box from "./Box";

export interface LabelledInputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
}

const LabelledInput = React.forwardRef<HTMLInputElement, LabelledInputProps>(function LabelledInput(
    { id, label, ...props },
    ref,
) {
    return (
        <Box
            direction="row"
            spacing="1rem"
            style={{
                alignItems: "baseline",
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
            <Input ref={ref} id={id} {...props} />
        </Box>
    );
});

export default LabelledInput;

const Input = React.forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    function Input(props, ref) {
        return (
            <div
                style={{
                    flex: 1,
                    display: "inline-block",
                }}
            >
                <InputInner ref={ref} {...props} />
            </div>
        );
    },
);

const InputInner = styled.input`
    width: 100%;
    padding: 0.5rem 1rem;
    background-color: #1f2937;
    border-radius: 0.5rem;

    :enabled:hover {
        background-color: #1f2937aa;
    }

    ::placeholder {
        color: #4b5563;
    }
`;
