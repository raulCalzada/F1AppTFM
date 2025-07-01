import axios from "axios";

const IMGBB_API_KEY = "75a1e064e99e7379b9dfedd0152c867c";
const UPLOAD_URL = "https://api.imgbb.com/1/upload";

export const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await axios.post(`${UPLOAD_URL}?key=${IMGBB_API_KEY}`, formData);
    console.log("Image upload response:", response.data);
    return response.data.data.url;
};

