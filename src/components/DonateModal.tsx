"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Shield } from "lucide-react";
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
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [PaystackComponent, setPaystackComponent] = useState<((config: unknown) => unknown) | null>(null);

  const donationAmounts = [
    { value: 10, label: "$10" },
    { value: 25, label: "$25" },
    { value: 50, label: "$50" },
    { value: 100, label: "$100" },
  ];

  // Load Paystack only on client side
  useEffect(() => {
    setIsClient(true);
    const loadPaystack = async () => {
      try {
        const { usePaystackPayment } = await import("react-paystack");
        setPaystackComponent(() => usePaystackPayment);
      } catch (error) {
        console.error("Failed to load Paystack:", error);
      }
    };
    loadPaystack();
  }, []);

  // Paystack configuration
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  
  const config = {
    reference: (new Date()).getTime().toString(),
    email: donorEmail,
    amount: amount * 100, // Paystack expects amount in cents (smallest currency unit)
    currency: "GHS", // Specify GHS currency
    publicKey: publicKey,
    metadata: {
      donor_name: donorName,
      foundation: "SHO-SHO Foundation"
    }
  };

  const initializePayment = PaystackComponent ? PaystackComponent(config) : null;

  const handleAmountClick = (value: number) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    if (e.target.value) {
      setAmount(parseFloat(e.target.value));
    } else {
      setAmount(0);
    }
  };

  const onSuccess = (reference: { reference: string }) => {
    // Payment successful
    console.log("Payment successful:", reference);
    alert(`Thank you for your donation of $${amount}! Your payment was successful. Reference: ${reference.reference}`);
    // Reset form and close modal
    setAmount(25);
    setCustomAmount("");
    setDonorName("");
    setDonorEmail("");
    setIsOpen(false);
  };

  const onClose = () => {
    // Payment cancelled
    console.log("Payment cancelled");
  };

  const handleDonate = () => {
    if (!isClient || !initializePayment) {
      alert("Payment system is loading, please try again in a moment");
      return;
    }
    
    if (!donorName.trim()) {
      alert("Please enter your name");
      return;
    }
    if (!donorEmail.trim()) {
      alert("Please enter your email");
      return;
    }
    if (amount <= 0) {
      alert("Please select a valid donation amount");
      return;
    }
    
    // Close the donation modal before opening Paystack
    setIsOpen(false);
    if (initializePayment && typeof initializePayment === 'function') {
      initializePayment(onSuccess, onClose);
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
                className={`text-sm py-2 w-full ${amount === option.value && !customAmount ? "bg-pink-600 hover:bg-pink-700" : ""}`}
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
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Full Name"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium text-sm sm:text-base">Total Donation:</span>
            <span className="text-lg sm:text-xl font-bold text-pink-600">${amount.toFixed(2)}</span>
          </div>
        </div>

        <DialogFooter className="px-0">
          <Button 
            type="button" 
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm sm:text-base py-2.5"
            onClick={handleDonate}
            disabled={!isClient || !initializePayment}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            {!isClient || !initializePayment ? "Loading..." : "Pay with Paystack"}
          </Button>
        </DialogFooter>

        <div className="text-center text-xs text-muted-foreground mt-3 space-y-1">
          <div className="flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Secure payment powered by Paystack</span>
          </div>
          <div>Your donation helps us continue our mission to make a positive impact.</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
