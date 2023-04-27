import api from "./apiAxios";

class UploadService {
  async upload(file, token, onUploadProgress) {
    const imageType = file.type;
    const imageName = file.name;

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
    const base64 = await toBase64(file);
    return await api.post(
      "/upload",
      { file: base64, imageType, imageName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress,
      }
    );
  }
}

export default new UploadService();
