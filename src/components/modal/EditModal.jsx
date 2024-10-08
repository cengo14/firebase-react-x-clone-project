import React, { useEffect, useState } from "react";
import Modal from ".";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import uploadToStorage from "./../../firebase/uploadToStorage";

const EditModal = ({ isOpen, close, post, modalClose, value }) => {
  const [text, setText] = useState(post.textContent);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isPicDel, setIsPicDel] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value); // Burada girilen metni state'e kaydediyoruz.
  };
  const handleCancel = () => {
    setIsPicDel(false);
    close();
  };
  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [image]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const postRef = doc(db, "post", post.id);

    let updatedData = { textContent: text, isEdited: true };

    if (image) {
      const imageURL = await uploadToStorage(image, value);
      updatedData.imageContent = imageURL;
    }
    if (isPicDel) {
      updatedData.imageContent = null;
      setIsPicDel(false);
    }

    await updateDoc(postRef, updatedData)
      .then(() => toast.success("Gönderi güncelleme başarılı"))
      .catch((err) =>
        toast.error("Güncelleme işlemi başarısız oldu" + err.code)
      )
      .finally(() => modalClose());
    setIsPicDel(false);
    close();
  };
  return (
    <Modal isOpen={isOpen} close={close}>
      <form>
        <h1>Gönderiyi düzenle</h1>
        <div className="mt-5">
          <textarea
            defaultValue={post.textContent}
            maxLength="280"
            className="w-full h-auto bg-transparent shadow-none py-2 mt-0 mb-2 text-gray-100  border border-gray-600 rounded-xl p-2 outline-none resize-none"
            type="text"
            onChange={(e) => handleTextChange(e)}
          />
          {!isPicDel && post.imageContent && (
            <div className="flex gap-2 justify-between items-center">
              {post.imageContent && (
                <img
                  className="size-16 rounded-xl max-md:h-20 max-md:w-24"
                  src={preview ? preview : post.imageContent}
                  alt=""
                />
              )}
              <div className="flex max-md:flex-col gap-2">
                <label
                  className="bg-orange-500 rounded-full py-2 px-5 cursor-pointer max-md:py-1 max-md:px-3"
                  htmlFor="image-update"
                >
                  Görsel ekle/değiştir
                </label>
                <input
                  id="image-update"
                  className="shadow-none w-32 hidden"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <button
                  onClick={() => setIsPicDel(true)}
                  className="bg-red-500 rounded-full py-2 px-5 max-md:py-1 max-md:px-3"
                >
                  Görseli Kaldır
                </button>
              </div>
            </div>
          )}
          <div className="flex flex-col justify-center gap-3 mt-5 ">
            <button
              type="submit"
              onClick={handleUpdate}
              className="bg-blue-500 hover:bg-blue-600  py-2 rounded-full text-white"
            >
              Güncelle
            </button>
            <button
              className="py-2 rounded-full text-white border border-gray-700 hover:bg-gray-900"
              onClick={handleCancel}
              type="button"
            >
              İptal
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
