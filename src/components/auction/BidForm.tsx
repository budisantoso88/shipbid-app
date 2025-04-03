import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Auction } from "@/types";

const formSchema = z.object({
  amount: z.coerce.number().min(1, {
    message: "Bid amount is required.",
  }),
  notes: z.string().min(10, {
    message: "Please provide at least 10 characters of notes about your bid.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface BidFormProps {
  auction: Auction;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (values: FormValues) => void;
  tokenBalance: number;
  tokenCost: number;
}

export default function BidForm({
  auction,
  open,
  onOpenChange,
  onSubmit,
  tokenBalance,
  tokenCost = 10,
}: BidFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: auction.budget, // Default to the auction budget
      notes: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    if (tokenBalance < tokenCost) {
      // Show insufficient tokens error
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would typically call a function to submit the bid to Firebase
      // For now, we'll just simulate a delay and call the onSubmit callback
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit?.(values);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting bid:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasEnoughTokens = tokenBalance >= tokenCost;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Place a Bid</DialogTitle>
          <DialogDescription>
            Submit your bid for "{auction.title}". This will cost {tokenCost}{" "}
            tokens.
            {!hasEnoughTokens && (
              <div className="mt-2 text-destructive font-semibold">
                You don't have enough tokens. Please purchase more tokens to
                place a bid.
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Auction:</span>
                <span className="font-medium">{auction.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipper:</span>
                <span className="font-medium">{auction.shipperName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Budget:</span>
                <span className="font-medium">
                  Rp {auction.budget.toLocaleString()}
                </span>
              </div>
            </div>

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Bid Amount (Rp)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" step="10000" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the amount you're willing to transport this shipment
                    for.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide details about your service, estimated delivery time, etc."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include any special services or guarantees you're offering.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || !hasEnoughTokens}>
                {isSubmitting ? "Submitting..." : "Submit Bid"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
