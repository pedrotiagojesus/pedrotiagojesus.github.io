import { Outlet } from "react-router-dom";

// Components
import Navigation from "@components/Navigation/Navigation";
import Footer from "@components/Footer/Footer";
import HeaderMobile from "@components/HeaderMobile/HeaderMobile";
import ScrollToTop from "@components/ScrollToTop/ScrollToTop";
import ActivePage from "@components/ActivePage/ActivePage";

// Analytics
import { usePageTracking } from "./analytics/usePageTracking";

function App() {
    // Track page views
    usePageTracking();

    return (
        <>
            <ScrollToTop />
            <ActivePage />
            <HeaderMobile />
            <Navigation />
            <main>
                <div className="container">{<Outlet />}</div>
            </main>
            <Footer />
        </>
    );
}

export default App;
