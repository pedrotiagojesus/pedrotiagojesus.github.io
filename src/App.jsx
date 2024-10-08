import { Outlet } from "react-router";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import BackgroundAnimated from "./components/BackgroundAnimated/BackgroundAnimated";

function App() {
    return (
        <>
            <BackgroundAnimated />
            <Header />
            <Menu />
            <main>
                <div className="content">
                    <Outlet />
                </div>
            </main>
        </>
    );
}

export default App;
