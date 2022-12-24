import { HTMLAttributes } from "react";
import styled from "styled-components";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    direction?: "row" | "column";
    spacing?: string;
}

const Box = styled.div<BoxProps>(
    ({ direction = "column", spacing }) => `
display: flex;
flex-direction: ${direction};

${
    spacing
        ? `
    > *:not(:last-child) {
        ${direction === "column" ? `margin-bottom: ${spacing};` : `margin-right: ${spacing}`}
    }
`
        : undefined
}
`,
);

export default Box;
