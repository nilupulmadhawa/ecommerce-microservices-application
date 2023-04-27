import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaymentPortalHome from "../components/payments/PaymentPortalHome";
import PaymentPortal from "../components/payments/PaymentPortal";
import Payments from "../components/payments/Payments";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/paymentportal' element={<PaymentPortalHome />} />
        <Route path='/paymentportal/pay' element={<PaymentPortal />} />
        <Route path='/payments' element={<Payments />} />
      </Routes>
    </BrowserRouter>
  );
}
