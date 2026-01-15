import { Outlet } from "react-router-dom";

// Components
import Navigation from "@components/Navigation/Navigation";
import Footer from "@components/Footer/Footer";
import HeaderMobile from "@components/HeaderMobile/HeaderMobile";
import ScrollToTop from "@components/ScrollToTop";
import ActivePage from "@components/ActivePage";
import Loading from "@components/Loading/Loading";

// Contexts
import { useVocabulary } from "@contexts/VocabularyContext";

// Analytics
import { initGA } from "./analytics";
import { usePageTracking } from "./analytics/usePageTracking";

function App() {
    const { isLoading } = useVocabulary();
    if (isLoading) return <Loading />;

    initGA();
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
