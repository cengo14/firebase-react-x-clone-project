import React from "react";
import Modal from ".";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const MailModal = ({ isOpen, close }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    sendPasswordResetEmail(auth, email)
      .then(() => toast.success("Sıfırlama bağlantısı içeren email gönderildi"))
      .catch((err) => toast.error("İşlem başarısız oldu" + err.code));
    close();
  };
  return (
    <Modal isOpen={isOpen} close={close}>
      <h1 className="text-3xl mb-10">Şifrenizi mi unuttunuz?</h1>
      <p className="text-sm mb-5">
        Sıfırlamak için mailinize bir bağlantı göndereceğiz
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
        <input className="rounded-xl" type="email" placeholder="Email" />
        <div className="flex flex-col gap-3">
          <button
            className="bg-white hover:bg-gray-200 text-black rounded-xl transition-all py-2"
            type="submit"
          >
            Şifre sıfırlama linkini gönder
          </button>
          <button
            onClick={close}
            className="bg-zinc-800 hover:bg-zinc-900 transition-all py-2 rounded-xl"
            type="button"
          >
            İptal et
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default MailModal;
