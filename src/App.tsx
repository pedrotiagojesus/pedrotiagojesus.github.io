import { Outlet } from "react-router";

// components
import BackgroundAnimated from "./components/BackgroundAnimated/BackgroundAnimated";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";

function App() {
    return (
        <>
            <BackgroundAnimated />
            <Header />
            <Menu />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default App;
