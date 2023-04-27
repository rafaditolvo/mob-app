import api from "./apiAxios";

class UploadService {
  upload(file, token, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return api.post("/upload", formData, {
      headers: {
        "Content-Type": "application/octet-stream",
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress,
    });
  }
}

export default new UploadService();
