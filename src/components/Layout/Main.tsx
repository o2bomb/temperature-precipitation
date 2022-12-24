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
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    maxWidth: 1400,
                    padding: "2rem",
                }}
            >
                {children}
            </div>
        </main>
    );
};

export default Main;
