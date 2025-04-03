import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Check, CreditCard, Wallet } from "lucide-react";

interface TokenPackage {
  id: string;
  name: string;
  tokens: number;
  price: number;
  discount?: string;
}

interface TokenPurchaseProps {
  currentBalance?: number;
  onPurchase?: (packageId: string) => void;
}

const TokenPurchase = ({
  currentBalance = 0,
  onPurchase = () => {},
}: TokenPurchaseProps) => {
  const [selectedPackage, setSelectedPackage] = useState<string>("basic");
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const tokenPackages: TokenPackage[] = [
    {
      id: "basic",
      name: "BASIC",
      tokens: 100,
      price: 100000,
    },
    {
      id: "premium",
      name: "PREMIUM",
      tokens: 500,
      price: 450000,
      discount: "Hemat 10%",
    },
    {
      id: "enterprise",
      name: "ENTERPRISE",
      tokens: 1000,
      price: 800000,
      discount: "Hemat 20%",
    },
  ];

  const selectedTokenPackage =
    tokenPackages.find((pkg) => pkg.id === selectedPackage) || tokenPackages[0];

  const handlePurchase = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmation(true);
      onPurchase(selectedPackage);
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-background p-4">
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            Beli Token
          </CardTitle>
          <CardDescription className="text-center">
            Saldo Token Saat Ini:{" "}
            <span className="font-semibold">{currentBalance}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Pilih Paket Token</h3>
            <RadioGroup
              value={selectedPackage}
              onValueChange={setSelectedPackage}
              className="grid grid-cols-1 gap-4"
            >
              {tokenPackages.map((pkg) => (
                <div key={pkg.id} className="relative">
                  <RadioGroupItem
                    value={pkg.id}
                    id={pkg.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={pkg.id}
                    className="flex flex-col p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-accent transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{pkg.name}</span>
                      {pkg.discount && (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          {pkg.discount}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {pkg.tokens} Token
                    </div>
                    <div className="mt-2 font-semibold">
                      {formatCurrency(pkg.price)}
                    </div>
                    {selectedPackage === pkg.id && (
                      <div className="absolute right-3 top-3 text-primary">
                        <Check size={18} />
                      </div>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Metode Pembayaran</h3>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="grid grid-cols-1 gap-3"
            >
              <div className="relative">
                <RadioGroupItem
                  value="credit-card"
                  id="credit-card"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="credit-card"
                  className="flex items-center p-3 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-accent transition-colors"
                >
                  <CreditCard className="mr-3 h-5 w-5" />
                  <span>Kartu Kredit / Debit</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem
                  value="e-wallet"
                  id="e-wallet"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="e-wallet"
                  className="flex items-center p-3 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-accent transition-colors"
                >
                  <Wallet className="mr-3 h-5 w-5" />
                  <span>E-Wallet</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === "credit-card" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <Input placeholder="Nomor Kartu" />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="MM/YY" />
                <Input placeholder="CVV" />
              </div>
              <Input placeholder="Nama Pemegang Kartu" />
            </motion.div>
          )}

          {paymentMethod === "e-wallet" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <RadioGroup
                defaultValue="gopay"
                className="grid grid-cols-2 gap-3"
              >
                <div className="relative">
                  <RadioGroupItem
                    value="gopay"
                    id="gopay"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="gopay"
                    className="flex items-center justify-center p-3 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-accent transition-colors"
                  >
                    GoPay
                  </Label>
                </div>
                <div className="relative">
                  <RadioGroupItem
                    value="ovo"
                    id="ovo"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="ovo"
                    className="flex items-center justify-center p-3 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-accent transition-colors"
                  >
                    OVO
                  </Label>
                </div>
                <div className="relative">
                  <RadioGroupItem
                    value="dana"
                    id="dana"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="dana"
                    className="flex items-center justify-center p-3 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-accent transition-colors"
                  >
                    DANA
                  </Label>
                </div>
                <div className="relative">
                  <RadioGroupItem
                    value="linkaja"
                    id="linkaja"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="linkaja"
                    className="flex items-center justify-center p-3 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-accent transition-colors"
                  >
                    LinkAja
                  </Label>
                </div>
              </RadioGroup>
              <Input placeholder="Nomor Telepon" />
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="w-full flex justify-between items-center p-3 bg-muted rounded-lg">
            <span className="font-medium">Total Pembayaran:</span>
            <span className="font-bold text-lg">
              {formatCurrency(selectedTokenPackage.price)}
            </span>
          </div>
          <Button
            className="w-full"
            size="lg"
            onClick={handlePurchase}
            disabled={isProcessing}
          >
            {isProcessing ? "Memproses..." : "Bayar Sekarang"}
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Pembayaran Berhasil!</AlertDialogTitle>
            <AlertDialogDescription>
              Anda telah berhasil membeli {selectedTokenPackage.tokens} token.
              Token akan segera ditambahkan ke akun Anda.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Kembali ke Dashboard</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TokenPurchase;
