import { useNavigate } from "react-router-dom";

function PasswordResetPage(){
    const navigate = useNavigate();
    return (
        <>
        <div className="flex flex-col items-center justify-center mt-[76px] gap-[15px]">
          <p className="text-[32px] font-[350] tracking-wide text-tycheGrayBlack w-[446px] text-center">
            Enter your email to reset password
          </p>
          <div className="flex flex-col items-center justify-center gap-[32px] px-[35px] py-[50px] bg-tycheLightGray w-[446px] rounded-[20px]">
            <div className="flex flex-col items-start justify-between w-full gap-[27px]">
              <div className="flex flex-col gap-[7px] w-full">
                <p className="text-[16px] font-[300] text-black pl-[15px]">
                    E-mail
                </p>
                <input
                  type="email"
                  placeholder="Your e-mail address..."
                  className="h-[48px] pl-[15px] py-[7px] rounded-[5px] placeholder-tycheDarkGray focus:outline-none focus:ring-tychePrimary focus:border-tychePrimary focus:border-[1px]"
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-between w-full gap-[28px]">
                <button
                    className="flex justify-center bg-tychePrimary font-[300] text-white text-[24px] py-[9px] px-[52px] tracking-wide rounded-[60px] w-full"
                    onClick={() => navigate("/login")}
                    >
                    Reset Password
                </button>
                <div className="flex flex-row items-center justify-center w-full">
                    <p className="text-[16px] font-bold text-tycheBlue cursor-pointer" onClick={() => navigate("/login")}>
                        Cancel
                    </p>
                </div>
            </div>
          </div>
        </div>
        </>
      );
}

export default PasswordResetPage;