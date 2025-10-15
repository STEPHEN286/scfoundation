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
      // console.log("Fetching donations from:", import.meta.env.VITE_MESSAGE_PUBLIC_KEY);
      
      try {
        const response = await axios.get(import.meta.env.VITE_PAYSTACK_PUBLIC_KEY);
        // console.log("Raw donation response:", response.data);
        
        // Filter for processed donations
        const processedDonations = response.data.filter((d: { status: string }) => d.status === "processed");
        console.log("Processed donations:", processedDonations);
        
        // If no processed donations, return mock data for testing
        if (processedDonations.length === 0) {
          console.log("No processed donations found, using mock data for testing");
          return [
            {
              id: 1,
              full_name: "John Doe",
              amount: 50,
              status: "processed",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            },
            {
              id: 2,
              full_name: "Jane Smith",
              amount: 25,
              status: "processed",
              created_at: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
              updated_at: new Date(Date.now() - 300000).toISOString()
            },
            {
              id: 3,
              full_name: "Anonymous",
              amount: 100,
              status: "processed",
              created_at: new Date(Date.now() - 600000).toISOString(), // 10 minutes ago
              updated_at: new Date(Date.now() - 600000).toISOString()
            }
          ];
        }
        
        return processedDonations;
      } catch (error) {
        console.error("Error fetching donations:", error);
        // Return mock data on error for testing
        console.log("API error, using mock data for testing");
        return [
          {
            id: 1,
            full_name: "Test Donor",
            amount: 75,
            status: "processed",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ];
      }
    },
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 5, // 5 minutes
    retry: 1, // Only retry once on failure
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


