import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import WalletDetailsPage from "./pages/WalletDetailsPage";
import NotFound from "./pages/NotFound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UsernamePage from "./pages/UsernamePage";
import PasswordResetPage from "./pages/PasswordResetPage";
import TransactionDetailsPage from "./pages/TransactionDetailsPage";

function App() {
  return (
    <div className="app-container bg-white min-h-screen flex-grow w-full flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/resetPassword" element={<PasswordResetPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register/username" element={<UsernamePage />} />
          <Route
            path="/:network/address/:address"
            element={<WalletDetailsPage />}
          />
          <Route
            path="/:network/tx/:hash"
            element={<TransactionDetailsPage />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
