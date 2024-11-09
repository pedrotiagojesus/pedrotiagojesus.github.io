import { Outlet } from "react-router";

// Components
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import HeaderMobile from "./components/HeaderMobile/HeaderMobile";
import ScrollToTop from "./components/ScrollToTop";
import ActivePage from "./components/ActivePage";

function App() {
    return (
        <>
            <ScrollToTop />
            <ActivePage />
            <HeaderMobile />
            <Navigation />
            <main>
                <div className="container">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    );
}

export default App;
