import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


// const DONATION_LIST_ENDPOINT = ;

export default function useDonation() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const initializeDonation = useCallback(async ({ full_name, email, amount, callback_url }: { full_name: string, email: string, amount: number, callback_url: string }) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Fetch USD->GHS rate from settings endpoint (POST as requested)
      const settingsRes = await axios.post(import.meta.env.VITE_SETTINGS_API   , { "action": "get_settings"},  { headers: { "Content-Type": "application/json" } });
      const rate = Number(settingsRes?.data?.rate) ;
      const amount_in_cedis = Number((Number(amount) * rate).toFixed(2));

      // Send amount in cedis to initialize donation API
      const payload = { full_name, email, amount: amount_in_cedis, callback_url };
      const response = await axios.post(
        import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        payload,
        { headers: { "Content-Type": "application/json" } 
      });
      return response?.data;
    } catch (err) {
      setError(err as Error);
      throw err as Error;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { initializeDonation, isSubmitting, error };
}



export function useGetProcessedDonations() {
  return useQuery({
    queryKey: ["donations", "processed"],
    queryFn: async () => {
      const response = await axios.get(import.meta.env.VITE_PAYSTACK_PUBLIC_KEY);
      // only return processed
      return response.data.filter((d: { status: string }) => d.status === "processed");
    },
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
}


// export function useGetDonations() {
//   return useQuery({
//     queryKey: ["donations", "all"],
//     queryFn: async () => {
//       const response = await axios.get(DONATION_LIST_ENDPOINT);
//       return response.data ;
//     },
//     staleTime: 1000 * 60,
//     gcTime: 1000 * 60 * 5,
//   });
// }


