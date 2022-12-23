import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Annual from "./routes/Annual";
import Monthly from "./routes/Monthly";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Annual />,
    },
    {
        path: "/annual",
        element: <Annual />,
    },
    {
        path: "/monthly",
        element: <Monthly />,
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
