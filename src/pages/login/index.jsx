import React, { useState } from "react";
import GoogleButton from "./GoogleButton";
import Form from "./Form";
import xLogo from "../../assets/x-logo.png";
const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleSignIn = () => {
    setIsSignUp(false);
    setIsOpen(true);
  };
  const handleSignUp = () => {
    setIsSignUp(true);
    setIsOpen(true);
  };

  return (
    <div className="h-screen grid place-items-center">
      <div className=" rounded-lg flex flex-col gap-6">
        <div className="flex justify-center">
          <img className="size-[100px]" src={xLogo} alt="x logo" />
        </div>
        <h1 className="text-2xl font-bold">Şu anda olup bitenler</h1>

        <div>
          <p className="text-base font-semibold mb-5">Hemen giriş yapın</p>

          <GoogleButton isSignUp={isSignUp} />
        </div>
        <div className="flex gap-2 items-center">
          <hr className="border-b w-full border-gray-500" />
          <span className="text-lg pb-1">veya</span>
          <hr className="border-b w-full border-gray-500" />
        </div>
        <button
          onClick={handleSignUp}
          className="flex justify-center py-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 cursor-pointer text-base whitespace-nowrap"
        >
          Hesap Oluşturun
        </button>
        <p>Zaten bir hesabınız var mı ?</p>
        <button
          onClick={handleSignIn}
          className="flex justify-center py-2 bg-zinc-900 text-white rounded-3xl hover:bg-zinc-800 cursor-pointer text-base whitespace-nowrap"
        >
          Giriş Yapın
        </button>
        {isOpen && (
          <Form
            close={() => setIsOpen(false)}
            isSignUp={isSignUp}
            setIsSignUp={setIsSignUp}
          />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
