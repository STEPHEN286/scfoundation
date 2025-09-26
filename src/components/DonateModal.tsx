"use client"

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { CreditCard, Shield } from "lucide-react";
// axios not used here; API calls are handled in the hook
import useDonation from "@/hooks/use-donation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface DonationModalProps {
  trigger: React.ReactNode;
}

const DonationModal = ({ trigger }: DonationModalProps) => {
  const [amount, setAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  // const [PaystackComponent, setPaystackComponent] = useState(null); // commented out while using API directly
  const [submitting, setSubmitting] = useState(false);

  const donationAmounts = [
    { value: 10, label: "$10" },
    { value: 25, label: "$25" },
    { value: 50, label: "$50" },
    { value: 100, label: "$100" },
  ];

  // Load client flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Paystack temporarily disabled in favor of direct donation API
  // const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ;
  // const config = { ... };
  // const initializePayment = PaystackComponent ? PaystackComponent(config) : null;

  const handleAmountClick = (value: number) => {
    setAmount(value);
    setCustomAmount("");
    setValue("amount", value, { shouldDirty: true });
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    if (e.target.value) {
      const valueNum = parseFloat(e.target.value);
      setAmount(valueNum);
      setValue("amount", isNaN(valueNum) ? 0 : valueNum, { shouldDirty: true });
    } else {
      setAmount(0);
      setValue("amount", 0, { shouldDirty: true });
    }
  };

  const resetForm = () => {
    setAmount(25);
    setCustomAmount("");
    reset({ full_name: "", email: "", amount: 25 });
  };

  const DonationSchema = z.object({
    full_name: z.string().min(2, "Name is too short"),
    email: z.string().email("Enter a valid email"),
    amount: z.coerce.number().positive("Enter an amount greater than 0")
  });

  const form = useForm({
    resolver: zodResolver(DonationSchema),
    defaultValues: { full_name: "", email: "", amount: 25 },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    criteriaMode: "firstError"
  });

  const { register, handleSubmit, formState: { errors }, setValue, reset } = form;

  const { initializeDonation } = useDonation();

  const onSubmit = async (values: { full_name: string; email: string; amount: number }) => {
    if (!isClient) {
      alert("Please try again in a moment");
      return;
    }

    try {
      setSubmitting(true);
      const callbackUrl = "https://presidentialrtc.site/payment-callback.html";
      const responseData = await initializeDonation({
        full_name: values.full_name,
        email: values.email,
        amount: Number(values.amount),
        callback_url: callbackUrl
      });

      const authorizationUrl = responseData?.authorization_url || responseData?.data?.authorization_url;
      const reference = responseData?.reference || responseData?.data?.reference;

      if (authorizationUrl) {
        window.location.href = authorizationUrl;
      } else {
        alert(`Thank you! Your donation was initialized${reference ? ` (ref: ${reference})` : ""}.`);
        resetForm();
        setIsOpen(false);
      }
    } catch (err) {
      console.error("Donation error", err);
      alert("Sorry, we couldn't record your donation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      {/* Ensure horizontal margins on all screen sizes */}
      <DialogContent className="max-w-sm sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center mb-2">Make a Donation</DialogTitle>
          <DialogDescription className="text-center text-sm sm:text-base">
            Your donation directly supports our mission to empower vulnerable women, youth, and children in Sierra Leone.
          </DialogDescription>
        </DialogHeader>

        {/* Your Impact */}
        {/* <div className="space-y-2 mb-3">
          <h3 className="text-sm font-medium text-blue-600">Your Impact</h3>
          <div className="grid grid-cols-1 gap-1.5">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
              <span>$25 can provide meals for 5 families</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Gift className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
              <span>$50 can support education for 10 children</span>
            </div>
          </div>
        </div> */}

        {/* Select Amount */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Select Amount</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {donationAmounts.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant={amount === option.value && !customAmount ? "default" : "outline"}
                className={`text-sm py-2 w-full ${amount === option.value && !customAmount ? "bg-primary hover:bg-primary/90" : ""}`}
                onClick={() => handleAmountClick(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Custom Amount</h3>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
            <input
              type="number"
              placeholder="Enter custom amount"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="w-full px-8 py-2 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        </div>

        {/* Donor Information */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Your Information</h3>
          <form id="donation-form" onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <input
              type="text"
              placeholder="Full Name"
              {...register("full_name")}
              className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              required
            />
            {errors.full_name && (
              <p className="text-xs text-red-600">{errors.full_name.message}</p>
            )}
            <input
              type="email"
              placeholder="Email Address"
              {...register("email")}
              className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              required
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email.message}</p>
            )}
            {/* keep amount synced in the form */}
            <input type="hidden" {...register("amount", { valueAsNumber: true })} value={amount} readOnly />
          </form>
        </div>

        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium text-sm sm:text-base">Total Donation:</span>
            <span className="text-lg sm:text-xl font-bold text-blue-600">${amount.toFixed(2)}</span>
          </div>
        </div>

        <DialogFooter className="px-0">
          <Button 
            type="submit"
            form="donation-form"
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm sm:text-base py-2.5"
            disabled={!isClient || submitting}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            {submitting ? "Submitting..." : "Donate"}
          </Button>
        </DialogFooter>

        <div className="text-center text-xs text-muted-foreground mt-3 space-y-1">
          <div className="flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Thank you for your support.</span>
          </div>
          <div>Your donation helps us continue our mission to make a positive impact.</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
