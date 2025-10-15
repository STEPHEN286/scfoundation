import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Function to send message using FormData
const sendMessage = async ({ name, email, phone, subject, message }: ContactPayload) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone || "");
  formData.append("subject", subject);
  formData.append("message", message);

  const { data } = await axios.post(
    "https://presidentialrtc.site/secondchance/api.php?resource=messages",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// React Query mutation hook
export default function useContactMessage() {
  return useMutation({
    mutationKey: ["contact", "send"],
    mutationFn: sendMessage,
  });
}
