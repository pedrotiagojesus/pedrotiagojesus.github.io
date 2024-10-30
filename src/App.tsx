import { Outlet } from "react-router";

// components
import BackgroundAnimated from "./components/BackgroundAnimated/BackgroundAnimated";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";

function App() {
    return (
        <>
            <h1 className="nocontent outline d-none">Pedro Jesus</h1>
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
