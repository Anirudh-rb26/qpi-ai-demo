import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import axios from "axios";

interface UploadService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadFiles(edgestore: any, files: File[]): Promise<void>;
}

// VirusTotal API configuration
const VIRUSTOTAL_API_KEY = process.env.NEXT_PUBLIC_APIKEY_VIRUSTOTAL_PERSONAL;
const VIRUSTOTAL_API_URL = "https://www.virustotal.com/api/v3";
const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const uploadService: UploadService = {
  async uploadFiles(edgestore, files) {
    // Process each file
    for (const file of files) {
      try {
        console.log(`Starting process for file: ${file.name}`);

        const response = await axios.get(`${VIRUSTOTAL_API_URL}/files/upload_url`, {
          headers: { "x-apikey": VIRUSTOTAL_API_KEY },
        });

        const uploadUrl = response.data.data;
        const formData = new FormData();
        formData.append("file", file);

        // Uploading file to VirusTotal
        const uploadResponse = await axios.post(uploadUrl, formData, {
          headers: {
            "x-apikey": VIRUSTOTAL_API_KEY,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(`File uploaded successfully: ${file.name}`, uploadResponse.data);

        // VirusTotal Results
        const analysisId = uploadResponse.data.data.id;
        let scanStatus = "queued";
        let scanResult;

        // Polling for the analysis result
        while (scanStatus === "queued" || scanStatus === "in_progress") {
          await delay(1000);
          scanResult = await axios.get(`${VIRUSTOTAL_API_URL}/analyses/${analysisId}`, {
            headers: { "x-apikey": VIRUSTOTAL_API_KEY },
          });

          scanStatus = scanResult.data.data.attributes.status;
          console.log("ScanStatus:", scanStatus);
          console.log("ScanResult Status:", scanResult.status);
        }

        // Check if the scan is completed and whether the file is clean
        const isMalicious = !(scanResult?.status === 200 && scanStatus === "completed");
        console.log("Scan result:", isMalicious);

        if (scanStatus === "completed" && !isMalicious) {
          console.log("file clean: uploading file");

          await edgestore.publicFiles.upload({
            file,
            onProgressChange: (progress: number) => {
              if (progress === 100) {
                toast.success(`File ${file.name} uploaded to edgestore successfully!`, {
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
        } else {
          console.warn(`File ${file.name} is potentially malicious.`);
          toast.error(`File ${file.name} failed virus scan. Not uploaded to edgestore.`, {
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
      } catch (error) {
        console.error(`Error processing ${file.name}:`, error);
        if (axios.isAxiosError(error)) {
          console.error("Error details:", error.response);
          if (error.response?.status === 401) {
            console.error("API Key is invalid or missing. Check your VIRUSTOTAL_API_KEY.");
          }
        }
        toast.error(`Error processing ${file.name}. Please try again.`, {
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
    }
  },
};

export default uploadService;
