import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Heart, Users, Globe, ArrowUp, ArrowDown } from "lucide-react";

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonateModal({ isOpen, onClose }: DonateModalProps) {
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState("");

  const predefinedAmounts = [10, 25, 50, 100];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(parseFloat(value) || 0);
    }
  };

  const incrementAmount = () => {
    const currentAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
    const newAmount = currentAmount + 5;
    setCustomAmount(newAmount.toString());
    setSelectedAmount(newAmount);
  };

  const decrementAmount = () => {
    const currentAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
    const newAmount = Math.max(0, currentAmount - 5);
    setCustomAmount(newAmount.toString());
    setSelectedAmount(newAmount);
  };

  const totalAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Make a Donation</DialogTitle>
          <DialogDescription className="text-gray-600">
            Support our mission to empower young women and create lasting change.
          </DialogDescription>
        </DialogHeader>

        {/* Your Impact Section */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Heart className="h-5 w-5 text-pink-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Your Impact</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 text-pink-500 mr-2" />
              <span>${totalAmount} can provide meals for {Math.floor(totalAmount / 5)} families</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Globe className="h-4 w-4 text-pink-500 mr-2" />
              <span>${totalAmount} can support education for {Math.floor(totalAmount / 2.5)} children</span>
            </div>
          </div>
        </div>

        {/* Select Amount Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Amount</h3>
          <div className="grid grid-cols-2 gap-3">
            {predefinedAmounts.map((amount) => (
              <Button
                key={amount}
                variant={selectedAmount === amount && !customAmount ? "default" : "outline"}
                className={`${
                  selectedAmount === amount && !customAmount
                    ? "bg-pink-600 hover:bg-pink-700 text-white border-pink-600"
                    : "border-pink-200 text-pink-600 hover:bg-pink-50"
                }`}
                onClick={() => handleAmountSelect(amount)}
              >
                ${amount}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Amount Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Amount</h3>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </div>
            <Input
              type="number"
              placeholder="Enter custom amount"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              className="pl-8 pr-16 h-12 text-lg"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col">
              <button
                onClick={incrementAmount}
                className="text-gray-400 hover:text-pink-600 transition-colors"
              >
                <ArrowUp className="h-3 w-3" />
              </button>
              <button
                onClick={decrementAmount}
                className="text-gray-400 hover:text-pink-600 transition-colors"
              >
                <ArrowDown className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Total Donation */}
        <div className="flex justify-between items-center py-4 border-t border-b border-gray-200 mb-6">
          <span className="text-lg font-semibold text-gray-900">Total Donation:</span>
          <span className="text-2xl font-bold text-pink-600">${totalAmount.toFixed(2)}</span>
        </div>

        {/* Donate Now Button */}
        <Button
          className="w-full bg-pink-600 hover:bg-pink-700 text-white text-lg py-3 mb-4"
          onClick={() => {
            // Handle donation logic here
            alert(`Thank you for your donation of $${totalAmount.toFixed(2)}!`);
            onClose();
          }}
        >
          Donate Now
        </Button>

        {/* Footer Message */}
        <p className="text-center text-sm text-gray-500">
          Your donation is secure and helps us continue our mission to make a positive impact.
        </p>
      </DialogContent>
    </Dialog>
  );
}
