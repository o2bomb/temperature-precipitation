import React, { HTMLAttributes } from "react";

export interface ToggleProps extends Omit<HTMLAttributes<HTMLMenuElement>, "onChange"> {
    options: {
        value: string;
        label?: string;
    }[];
    value: string;
    onChange?: (key: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Toggle = ({ options, value, onChange, style, ...props }: ToggleProps) => {
    return (
        <menu
            style={{
                display: "inline-flex",
                padding: ".5rem",
                borderRadius: ".7rem",
                backgroundColor: "#111827aa",
                ...style,
            }}
            {...props}
        >
            {options.map((o, index) => (
                <li key={index}>
                    <button
                        onClick={(e) => onChange && onChange(o.value, e)}
                        style={{
                            backgroundColor: value === o.value ? "#1f2937" : undefined,
                            borderRadius: ".5rem",
                            padding: ".5rem 1rem",
                        }}
                    >
                        {o.label || o.value}
                    </button>
                </li>
            ))}
        </menu>
    );
};
