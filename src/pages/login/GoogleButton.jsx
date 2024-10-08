import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GoogleButton = ({ isSignUp }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Hesaba giriş başarılı");
        navigate("/feed");
      })
      .catch((err) => toast.err("Bir hata oluştu: " + err.code));
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center px-10 justify-center py-1 bg-slate-50 text-black rounded-3xl hover:bg-slate-200 cursor-pointer text-base whitespace-nowrap"
    >
      <img className="size-8 " src="/public/G-logo.png" alt="google logo" />
      <p>Google ile giriş yapın</p>
    </div>
  );
};

export default GoogleButton;
