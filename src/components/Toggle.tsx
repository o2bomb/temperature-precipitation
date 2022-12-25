import React, { HTMLAttributes } from "react";

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
                    <button
                        onClick={(e) => onChange && onChange(o.value, e)}
                        style={{
                            width: "100%",
                            padding: ".5rem 1rem",
                            borderRadius: ".5rem",
                            backgroundColor: value === o.value ? "#1f2937" : undefined,
                        }}
                    >
                        {o.label || o.value}
                    </button>
                </li>
            ))}
        </menu>
    );
};
