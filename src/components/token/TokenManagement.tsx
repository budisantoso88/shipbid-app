import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Coins, CreditCard, CheckCircle2 } from "lucide-react";
import { TokenPackage } from "@/types";
import { mockTokenPackages } from "@/lib/mockData";

interface TokenManagementProps {
  tokenBalance: number;
  onPurchaseTokens?: (packageId: string) => void;
}

export default function TokenManagement({
  tokenBalance,
  onPurchaseTokens,
}: TokenManagementProps) {
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<TokenPackage | null>(
    null,
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const handlePurchase = async (tokenPackage: TokenPackage) => {
    setSelectedPackage(tokenPackage);
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setPurchaseComplete(true);
    setIsProcessing(false);

    // Call the onPurchaseTokens callback
    onPurchaseTokens?.(tokenPackage.id);
  };

  const resetPurchaseState = () => {
    setSelectedPackage(null);
    setPurchaseComplete(false);
  };

  const closePurchaseDialog = () => {
    setPurchaseDialogOpen(false);
    setTimeout(resetPurchaseState, 300); // Reset after dialog close animation
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Token Balance
          </CardTitle>
          <CardDescription>
            Tokens are used to create auctions and place bids
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{tokenBalance}</div>
          <p className="text-muted-foreground mt-1">Available tokens</p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => setPurchaseDialogOpen(true)}
          >
            Purchase Tokens
          </Button>
        </CardFooter>
      </Card>

      {/* Token Purchase Dialog */}
      <Dialog open={purchaseDialogOpen} onOpenChange={closePurchaseDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Purchase Tokens</DialogTitle>
            <DialogDescription>
              Select a token package to purchase. Tokens are used to create
              auctions and place bids.
            </DialogDescription>
          </DialogHeader>

          {!purchaseComplete ? (
            <div className="mt-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockTokenPackages.map((pkg) => (
                  <Card
                    key={pkg.id}
                    className={`relative cursor-pointer hover:border-primary transition-colors ${pkg.popular ? "border-primary" : ""}`}
                    onClick={() => !isProcessing && handlePurchase(pkg)}
                  >
                    {pkg.popular && (
                      <Badge className="absolute top-2 right-2">Popular</Badge>
                    )}
                    <CardHeader>
                      <CardTitle>{pkg.name}</CardTitle>
                      <CardDescription>{pkg.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {pkg.tokenAmount}
                      </div>
                      <p className="text-muted-foreground">tokens</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="font-semibold">
                        Rp {pkg.price.toLocaleString()}
                      </div>
                      <Button
                        size="sm"
                        disabled={isProcessing}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePurchase(pkg);
                        }}
                      >
                        {isProcessing && selectedPackage?.id === pkg.id
                          ? "Processing..."
                          : "Buy"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Token Usage:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Creating an auction costs 20 tokens</li>
                  <li>• Placing a bid costs 10 tokens</li>
                  <li>• Tokens are non-refundable once used</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Purchase Complete!</h3>
              <p className="text-muted-foreground">
                {selectedPackage?.tokenAmount} tokens have been added to your
                account.
              </p>
              <Button className="mt-4" onClick={closePurchaseDialog}>
                Done
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
