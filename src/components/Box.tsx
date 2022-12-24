import { HTMLAttributes } from "react";
import styled from "styled-components";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    direction?: "row" | "column";
    spacing?: string;
    centerItems?: boolean;
}

const Box = styled.div<BoxProps>(
    ({ direction = "column", spacing, centerItems }) => `
display: flex;
flex-direction: ${direction};
${
    centerItems
        ? `
        align-items: center;
        justify-content: center;
    `
        : undefined
}

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
