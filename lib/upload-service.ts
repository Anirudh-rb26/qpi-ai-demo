// lib/uploadService.ts

import { toast } from "react-toastify";
import { Bounce } from "react-toastify";

interface UploadService {
  uploadFiles(edgestore: any, files: File[]): void; // Accept edgestore as a parameter
}

const uploadService: UploadService = {
  async uploadFiles(edgestore, files) {
    for (const file of files) {
      await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          console.log(`${file.name} progress: ${progress}`);
          if (progress === 100) {
            toast.success(`${file.name} Uploaded`, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
              transition: Bounce,
            });
          }
        },
      });
    }
  },
};

export default uploadService;
