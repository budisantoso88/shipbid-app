import { Auction } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface AuctionCardProps {
  auction: Auction;
  userType: "shipper" | "transporter";
  onViewDetails?: (auctionId: string) => void;
  onPlaceBid?: (auctionId: string) => void;
}

export default function AuctionCard({
  auction,
  userType,
  onViewDetails,
  onPlaceBid,
}: AuctionCardProps) {
  const timeLeft = formatDistanceToNow(new Date(auction.endTime), {
    addSuffix: false,
  });
  const isShipper = userType === "shipper";

  return (
    <Card className="bg-card h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{auction.title}</CardTitle>
            <CardDescription>
              {auction.description.substring(0, 60)}
              {auction.description.length > 60 ? "..." : ""}
            </CardDescription>
          </div>
          <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
            {auction.status === "active"
              ? "Active"
              : auction.status === "completed"
                ? "Completed"
                : "Cancelled"}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Route:</span>
            <span className="font-medium">
              {auction.origin} to {auction.destination}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Cargo:</span>
            <span className="font-medium">
              {auction.weight}kg, {auction.dimensions}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {isShipper ? "Budget:" : "Budget:"}
            </span>
            <span className="font-medium">
              Rp {auction.budget.toLocaleString()}
            </span>
          </div>
          {!isShipper && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipper:</span>
              <span className="font-medium">
                {auction.shipperName} (⭐ {auction.shipperRating.toFixed(1)})
              </span>
            </div>
          )}
          {isShipper && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Bids:</span>
              <span className="font-medium">{auction.bids.length} bids</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Time left:</span>
            <span className="font-medium text-destructive">{timeLeft}</span>
          </div>

          {isShipper ? (
            <Button
              className="w-full mt-2"
              variant="outline"
              onClick={() => onViewDetails && onViewDetails(auction.id)}
            >
              View Details
            </Button>
          ) : (
            <Button
              className="w-full mt-2"
              onClick={() => onPlaceBid && onPlaceBid(auction.id)}
              disabled={auction.status !== "active"}
            >
              Place Bid
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
