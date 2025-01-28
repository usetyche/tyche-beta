// import { useNavigate } from "react-router-dom";
// import NetworkSelect from "./NetworkSelect";
// import SearchBar from "./SearchBar";
// import GeneralSettingsPopup from "../Popups/GeneralSettingsPopup";
// import usePopupState from "../../hooks/usePopupState";
// import tyche_abi from "../../utils/TychePremiumContractABI";
// import { ethers } from "ethers";
// import { useWeb3ModalProvider } from '@web3modal/ethers/react'
import { useNavigate } from "react-router-dom";
import tycheLogo from "../../assets/images/tyche.svg"; // logoyu svg olarak aldım png çözünürlüğü düşük
import settingsIcon from "../../assets/images/icons/settingsIcon.svg";
import SearchBar from "./SearchBar";
import { useState } from "react";
import SettingsPopup from "../Content/SettingsPopup";

//current routeninin adresine göre burası değişecek
function Header() {
  const navigate = useNavigate();
  let currentRoute = window.location.pathname;
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  //check localstorage if includes token
  const loggedIn = localStorage.getItem("token") ? true : false;

  return (
    <>
      {currentRoute === "/search" ? (
        <> </>
      ) : currentRoute === "/" ||
        currentRoute === "/login" ||
        currentRoute === "/register" ||
        currentRoute === "/register/username" ||
        currentRoute === "/resetPassword" ||
        currentRoute === "/notFound"
        ? (
        <header className="flex items-center justify-center px-4 md:px-0">
          <div className="flex flex-col md:flex-row bg-tycheLightGray w-full max-w-[915px] py-6 md:h-[152px] mt-4 md:mt-[40px] rounded-[30px] md:rounded-[60px] items-center px-4 md:px-[35px] justify-between">
            <div className="flex flex-col md:flex-row items-center md:w-full justify-between">
              <div
                className="flex flex-col md:flex-row items-center cursor-pointer mb-4 md:mb-0"
                onClick={() => navigate("/")}
              >
                <img
                  src={tycheLogo}
                  alt="Tyche Logo"
                  className="w-16 md:w-24 h-16 md:h-24"
                />
                <div className="flex flex-col mt-2 md:mt-0 md:ml-[52px] text-center md:text-left">
                  <h1 className="text-tychePrimary text-3xl md:text-[48px] font-[850] tracking-wide">
                    TYCHE
                  </h1>
                  <p className="text-black text-lg md:text-[24px] font-[310] tracking-wide">
                    TRACK YOUR ASSETS
                  </p>
                </div>
              </div>
              {currentRoute === "/" && (
                <button
                  className="flex items-center justify-center bg-tychePrimary text-white text-lg md:text-[24px] font-[300] w-full md:w-[142px] h-[54px] tracking-wide rounded-[60px] mt-4 md:mt-0"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </header>
      ) : (
        <header className="flex flex-col md:flex-row items-center justify-between mt-4 md:mt-[40px] max-w-[915px] w-full mx-auto gap-4 md:gap-[20px] px-4 md:px-0">
          <div className="flex justify-between items-center w-full md:w-auto">
            {/* Logo */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center w-12 h-12 md:w-[52px] md:h-[52px]"
            >
              <img src={tycheLogo} alt="Tyche Logo" className="w-full h-full" />
            </button>

            {/* Settings and Login for mobile */}
            <div className="flex items-center gap-4 md:hidden">
              {/* Settings Icon */}
              <button onClick={() => setShowSettingsPopup(true)} className="w-10 h-10 flex items-center justify-center">
                <img
                  src={settingsIcon}
                  alt="Settings"
                  className="w-8 h-8"
                />
              </button>

              {/* Login Button */}
              {loggedIn ? (
                
                  <button
                    className="flex items-center justify-center bg-tycheDarkGray text-black text-lg font-[300] w-10 h-10 rounded-full"
                    onClick={() => {
                      console.log("Logout button clicked");
                      localStorage.removeItem("token");
                      localStorage.removeItem("savedWallets");
                      localStorage.removeItem("settings");
                      window.location.reload();
                    }}
                  >
                    <p>A</p> {/* User's first letter of the name  */}
                  </button>
                
              ) : (
                <button
                  className="flex items-center justify-center bg-tychePrimary font-[300] text-white text-lg px-4 py-2 tracking-wide rounded-[60px]"
                  onClick={() => navigate("/login")}
                >
                  <p>Login</p>
                </button>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-auto md:flex-grow">
            <SearchBar />
          </div>

          {/* Settings and Login for desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* Settings Icon */}
            <button onClick={() => setShowSettingsPopup(true)} className="w-[44px] h-[44px] flex items-center justify-center">
              <img
                src={settingsIcon}
                alt="Settings"
                className="w-[36px] h-[36px]"
              />
            </button>

            {/* Login Button */}
            {loggedIn ? (
              <button className="w-[52px] h-[52px]">
                <div
                  className="flex items-center justify-center bg-tycheDarkGray text-black text-[20px] font-[300] w-full h-full rounded-full"
                  onClick={() => {
                    console.log("Logout button clicked");
                    localStorage.removeItem("token");
                    localStorage.removeItem("savedWallets");
                    localStorage.removeItem("settings");
                    window.location.reload();
                  }}
                >
                  <p>A</p> {/* User's first letter of the name  */}
                </div>
              </button>
            ) : (
              <button
                className="flex items-center justify-center bg-tychePrimary font-[300] text-white text-[20px] px-[24px] py-[14px] tracking-wide rounded-[60px]"
                onClick={() => navigate("/login")}
              >
                <p>Login</p>
              </button>
            )}
          </div>
        </header>
      )}
      {showSettingsPopup && (
        <SettingsPopup onClose={() => setShowSettingsPopup(false)} preferredTab={"settings"} newWallet={null} walletToEdit={null} />
      )}
    </>
  );
}

export default Header;
