import styled from "styled-components";

interface MainProps {
    children: React.ReactNode;
}

const Main = ({ children }: MainProps) => {
    return (
        <main
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <ResponsiveContent>{children}</ResponsiveContent>
        </main>
    );
};

export default Main;

const ResponsiveContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1400px;
    padding: 2rem;

    @media (max-width: 750px) {
        padding: 1rem 2rem;
    }
`;
