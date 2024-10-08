import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MailModal from "../../components/modal/MailModal";
import { BiSolidHide } from "react-icons/bi";
import { FaEye } from "react-icons/fa";

const Form = ({ isSignUp, setIsSignUp, close }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("Hesap oluşturuldu");
          navigate("/feed");
        })
        .catch((err) => toast.error("Hata oluştu " + err.code));
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("Hesaba giriş yapıldı");
          navigate("/feed");
        })
        .catch((err) => toast.error("Hata oluştu " + err.code));
    }
  };
  return (
    <div className="fixed inset-0 pt-5 bg-zinc-700/25 grid place-items-center z-[999]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  gap-3 bg-black px-24 py-16 w-3/4 max-w-[700px] rounded-2xl"
      >
        <button
          type="button"
          onClick={close}
          className="text-end text-xl font-bold  "
        >
          X
        </button>
        <img className="w-20 mx-auto" src="./public/x-logo.png" alt="" />
        {isSignUp && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label htmlFor="nickname">Kulanıcı Adı</label>
              <input
                onChange={(e) => setNickname(e.target.value)}
                id="nickname"
                type="text"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name">İsminiz</label>
              <input
                onChange={(e) => setName(e.target.value)}
                id="name"
                type="text"
              />
            </div>
          </div>
        )}
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="Email adresi giriniz"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Şifre</label>
          <div className="flex items-center gap-2 bg-white rounded-md shadow-lg hover:shadow-[gray]">
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type={isPassword ? "text" : "password"}
              placeholder="Şifre giriniz"
              className="shadow-none w-[90%]"
            />
            <button
              type="button"
              onClick={() => setIsPassword(!isPassword)}
              className="text-black cursor-pointer"
            >
              {isPassword ? (
                <BiSolidHide color="gray" size={21} />
              ) : (
                <FaEye color="gray" size={18} />
              )}
            </button>
          </div>
          {!isSignUp && (
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="text-sm font-light text-gray-400 hover:underline cursor-pointer mt-2 text-end"
            >
              Şifrenizi mi unuttunuz ?
            </button>
          )}
        </div>
        <button
          className={
            isSignUp
              ? "mt-2 border border-transparent py-2 bg-blue-500 hover:bg-blue-600  rounded-3xl"
              : "mt-2 border border-gray-500 py-2 text-blue-500 hover:bg-zinc-900  rounded-3xl"
          }
        >
          {isSignUp ? "Kayıt Olun" : "Giriş Yapın"}
        </button>
        <p>
          <span>{isSignUp ? "Hesabınız var mı?" : "Hesabınız yoksa"}</span>
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-500 ms-1 font-semibold cursor-pointer"
          >
            {isSignUp ? "giriş yapın" : "kayıt olun"}
          </span>
        </p>
      </form>

      <MailModal isOpen={isOpen} close={() => setIsOpen(false)} />
    </div>
  );
};

export default Form;
