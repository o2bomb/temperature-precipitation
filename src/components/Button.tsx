import styled from "styled-components";

const Button = styled.button`
    min-width: 8rem;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    background-color: #3b82f6;
    white-space: nowrap;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 1px;

    :enabled:hover {
        background-color: #2563eb;
    }
    :enabled:active {
        background-color: #1e40af;
    }

    :disabled {
        color: #6b7280;
        background-color: #1e3a8a;
    }
`;

export default Button;
