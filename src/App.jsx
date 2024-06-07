import { Outlet } from "react-router";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";

function App() {
    return (
        <>
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
