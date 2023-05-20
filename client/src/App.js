import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
// import Router from './routes';
// theme
import ThemeProvider from './theme';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import Router from './router';

export default function App() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <ThemeProvider>
                    <ToastContainer />
                    <ScrollToTop />
                    <StyledChart />
                    <Router />
                </ThemeProvider>
            </BrowserRouter>
        </HelmetProvider>
    );
}
