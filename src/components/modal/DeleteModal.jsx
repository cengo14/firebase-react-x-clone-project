import React from "react";
import Modal from ".";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

const DeleteModal = ({ post, isOpen, close, modalClose }) => {
  const handleDelete = async () => {
    const postRef = doc(db, "post", post.id);
    await deleteDoc(postRef)
      .then(() => toast.success("Gönderi silindi"))
      .catch((err) => toast.error("Silme işlemi başarısız oldu " + err.code))
      .finally(() => modalClose());
    close();
  };
  return (
    <Modal isOpen={isOpen} close={close}>
      <h2 className="text-lg font-bold mb-2">Gönderi silinsin mi?</h2>
      <p className="text-gray-500  mb-5">
        Bu işlem geri alınamaz ve gönderi, profilinden, seni takip eden tüm
        hesapların zaman akışından silinir.
      </p>
      <div className="flex flex-col justify-center gap-3">
        <button
          className="bg-red-500 hover:bg-red-600  py-2 rounded-full text-white"
          onClick={handleDelete}
        >
          Sil
        </button>
        <button
          className="py-2 rounded-full text-white border border-gray-700 hover:bg-gray-900"
          onClick={close}
        >
          İptal
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
