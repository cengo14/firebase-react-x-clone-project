import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../../firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MailModal from "../../components/modal/MailModal";
import { BiSolidHide } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import xLogo from "../../assets/x-logo.png";
import uploadImage from "../../assets/image-upload.png";

const Form = ({ isSignUp, setIsSignUp, close }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];
  useEffect(() => {
    if (avatar) {
      // Dosya türü ve boyut kontrolü
      if (!ALLOWED_TYPES.includes(avatar.type)) {
        toast.warn(
          "Sadece JPEG, PNG ve GIF formatındaki dosyalar kabul edilmektedir."
        );
        setAvatar(null);
        setPreview(null);
        return;
      }

      if (avatar.size > MAX_FILE_SIZE) {
        toast.warn("Avatar dosyası 2MB'dan büyük olamaz.");
        setAvatar(null);
        setPreview(null);
        return;
      }

      // Önizleme URL'si oluşturma
      const objectUrl = URL.createObjectURL(avatar);
      setPreview(objectUrl);

      // Temizlik: Bileşen unmount olduğunda veya avatar değiştiğinde URL'yi serbest bırakma
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [avatar]);
  const capitalizeName = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    setLoading(true);
    if (isSignUp) {
      // Kullanıcı oluştur
      try {
        // Kullanıcı oluştur
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const formattedName = capitalizeName(name);
        let avatarURL = "";

        if (avatar) {
          // Avatarı Firebase Storage'a yükle
          const avatarStorageRef = storageRef(
            storage,
            `avatars/${user.uid}/${avatar.name}`
          );
          const snapshot = await uploadBytes(avatarStorageRef, avatar);
          avatarURL = await getDownloadURL(snapshot.ref);
        }

        // Ek kullanıcı bilgilerini Firestore'a kaydet
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: formattedName,
          nickname,
          email,
          avatarURL: avatarURL || null,
          createdAt: new Date(),
        });

        toast.success("Kayıt başarılı!");
        // İsteğe bağlı olarak yönlendirme yapabilirsiniz
      } catch (error) {
        console.error("Kayıt sırasında hata oluştu:", error);
        toast.error(`Kayıt başarısız: ${error.message}`);
      } finally {
        setLoading(false);
        setIsSignUp(false);
      }
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
      <div className="bg-black w-4/6 max-w-[700px] rounded-2xl text-end p-4">
        <button type="button" onClick={close} className="text-xl font-bold  ">
          X
        </button>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-start gap-3 py-12 px-28 max-md:px-16 max-md:py-8 "
        >
          <img className="w-20 mx-auto" src={xLogo} alt="" />
          {isSignUp && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="flex flex-col w-10/12 max-md:w-7/12 ">
                  <label htmlFor="nickname">Kulanıcı Adı</label>
                  <input
                    required
                    onChange={(e) => setNickname(e.target.value)}
                    id="nickname"
                    type="text"
                    className="rounded-2xl"
                  />
                </div>
                <div className=" flex justify-center">
                  <label
                    className="px-2 mt-[24px] py-[2px] rounded-2xl cursor-pointer "
                    htmlFor="avatar"
                  >
                    {preview ? (
                      <img className="w-24 rounded-full" src={preview} alt="" />
                    ) : (
                      <img className="w-24" src={uploadImage} alt="" />
                    )}
                  </label>
                  <input
                    className="shadow-none w-32 hidden"
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="name">İsminiz</label>
                <input
                  required
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  type="text"
                  className="rounded-2xl"
                />
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              className="rounded-2xl"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="password">Şifre</label>
            <div className="flex items-center gap-2 bg-white  shadow-lg hover:shadow-[gray] rounded-2xl">
              <input
                required
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type={isPassword ? "text" : "password"}
                className="shadow-none w-[90%] rounded-2xl"
              />
              <button
                type="button"
                onClick={() => setIsPassword(!isPassword)}
                className="text-black cursor-pointer"
              >
                {isPassword ? (
                  <BiSolidHide
                    className="animate-none"
                    color="gray"
                    size={21}
                  />
                ) : (
                  <FaEye className="animate-none" color="gray" size={19} />
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
            type="submit"
            disabled={loading}
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
      </div>

      <MailModal isOpen={isOpen} close={() => setIsOpen(false)} />
    </div>
  );
};

export default Form;
