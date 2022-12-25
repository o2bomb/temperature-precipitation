import React, { TextareaHTMLAttributes } from "react";
import styled from "styled-components";
import Box from "./Box";

export interface LabelledInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string;
    label: string;
}

const LabelledTextArea = React.forwardRef<HTMLTextAreaElement, LabelledInputProps>(
    function LabelledTextArea({ id, label, ...props }, ref) {
        return (
            <Box
                direction="row"
                spacing="1rem"
                style={{
                    alignItems: "start",
                    whiteSpace: "nowrap",
                }}
            >
                <label
                    htmlFor={id}
                    style={{
                        display: "inline-block",
                        color: "#9ca3af",
                    }}
                >
                    {label}:
                </label>
                <Input ref={ref} id={id} {...props} />
            </Box>
        );
    },
);

export default LabelledTextArea;

const Input = React.forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
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

const InputInner = styled.textarea`
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
