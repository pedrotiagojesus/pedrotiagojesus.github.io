import { Outlet } from "react-router";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";

// Fontawesome
import "./assets/fontawesome-free-6.6.0-web/css/all.min.css";

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
