import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from ".";
import { v4 } from "uuid";

const uploadToStorage = async (image, value) => {
  console.log(value);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  // 1) dosya resim değilse fonksiyonu durdur
  if (!image || !image.type.startsWith("image")) return null;
  if (image && image.size > MAX_FILE_SIZE) {
    toast.warn("Avatar dosyası 5MB'dan büyük olamaz.");
    return;
  }
  // 2) dosyanın yükleneceği konumun referansını al

  const imageRef = ref(
    storage,
    `post/${value.userData ? value.userData.uid : value.currentUser.uid}/${
      v4() + image.name
    }`
  );
  // 3) referansını oluşturduğumuz konuma dosyayı yükle
  await uploadBytes(imageRef, image);

  //  4) yüklenen dosyanın url'ini al ve return et
  const ImageURL = getDownloadURL(imageRef);
  return ImageURL;
};
export default uploadToStorage;
