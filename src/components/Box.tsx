import { HTMLAttributes } from "react";
import styled from "styled-components";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    direction?: "row" | "column";
    spacing?: string;
    centerItems?: boolean;
}

const Box = styled.div<BoxProps>(({ direction = "column", spacing, centerItems }) => {
    let result = `
display: flex;
flex-direction: ${direction};`;

    if (centerItems) {
        result += `\nalign-items: center;
justify-content: center;`;
    }

    if (spacing) {
        result += `\n> *:not(:last-child) {
    ${direction === "column" ? `margin-bottom: ${spacing};` : `margin-right: ${spacing};`}
}`;
    }

    return result;
});

export default Box;
