import { useNavigate } from "react-router-dom";
import useCustomAxios from "../hooks/useCustomAxios";

function RegisterPage() {
  const navigate = useNavigate();
  const customAxios = useCustomAxios();

  const handleRegister = async () => {
    try {
      const emailInput = document.querySelector('input[type="email"]').value;
      const passwordInput = document.querySelector('input[type="password"]').value;
      const response = await customAxios.post("/api/v1/auth/register", {
        email: emailInput,
        password: passwordInput,
      });
      if (response.status === 200) {
        alert("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (error) {
      console.log("error", error);
    }
    
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4 md:mt-[45px] px-4 md:px-0">
      <p className="text-2xl md:text-[32px] font-[350] tracking-wide text-tycheGrayBlack text-center mb-4 md:mb-[15px]">
        Sign up for Tyche
      </p>
      <div className="flex flex-col items-center justify-center gap-6 md:gap-[32px] px-4 md:px-[35px] py-6 md:py-[50px] bg-tycheLightGray w-full max-w-[443px] rounded-[20px]">
        <div className="flex flex-col items-start justify-between w-full gap-4 md:gap-[27px]">
          <div className="flex flex-col gap-2 md:gap-[7px] w-full">
           <p className="text-sm md:text-[16px] font-[300] text-black pl-2 md:pl-[15px]">
              Email
            </p>
            <input
              type="email"
              placeholder="Your e-mail address..."
              className="h-10 md:h-[48px] pl-2 md:pl-[15px] py-1 md:py-[7px] rounded-[5px] placeholder-tycheDarkGray focus:outline-none focus:ring-tychePrimary focus:border-tychePrimary focus:border-[1px] w-full"
            />
          </div>
          <div className="flex flex-col gap-2 md:gap-[7px] w-full">
            <p className="text-sm md:text-[16px] font-[300] text-black pl-2 md:pl-[15px]">
              Password
            </p>
            <input
              type="password"
              placeholder="Your password..."
              className="h-10 md:h-[48px] pl-2 md:pl-[15px] py-1 md:py-[7px] rounded-[5px] placeholder-tycheDarkGray focus:outline-none focus:ring-tychePrimary focus:border-tychePrimary focus:border-[1px] w-full"
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-between w-full gap-4 md:gap-[28px]">
          <button
            className="flex justify-center bg-tychePrimary font-[300] text-white text-lg md:text-[24px] py-2 md:py-[9px] px-4 md:px-[52px] tracking-wide rounded-[60px] w-full"
            onClick={handleRegister}
          >
            Register
          </button>
          <div className="flex flex-row items-center justify-center w-full">
            <p className="text-sm md:text-[16px] font-bold text-tycheBlue cursor-pointer" onClick={() => navigate("/login")}>
              Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
