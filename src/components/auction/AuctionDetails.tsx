import { useState } from "react";
import { Auction, Bid, UserType } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDistanceToNow, format } from "date-fns";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Package,
  Truck,
  User,
  DollarSign,
  MessageSquare,
} from "lucide-react";

interface AuctionDetailsProps {
  auction: Auction;
  userType: UserType;
  onBack: () => void;
  onAcceptBid?: (bidId: string) => void;
  onPlaceBid?: (auctionId: string) => void;
  onChat?: (userId: string) => void;
}

export default function AuctionDetails({
  auction,
  userType,
  onBack,
  onAcceptBid,
  onPlaceBid,
  onChat,
}: AuctionDetailsProps) {
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const isShipper = userType === "shipper";
  const timeLeft = formatDistanceToNow(new Date(auction.endTime), {
    addSuffix: false,
  });
  const isActive = auction.status === "active";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-semibold">Auction Details</h2>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{auction.title}</CardTitle>
              <CardDescription className="mt-1">
                {auction.description}
              </CardDescription>
            </div>
            <Badge
              variant={
                auction.status === "active"
                  ? "default"
                  : auction.status === "completed"
                    ? "success"
                    : "destructive"
              }
            >
              {auction.status === "active"
                ? "Active"
                : auction.status === "completed"
                  ? "Completed"
                  : "Cancelled"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Route</h4>
                  <p className="text-muted-foreground">
                    {auction.origin} to {auction.destination}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Cargo Details</h4>
                  <p className="text-muted-foreground">
                    {auction.weight}kg, {auction.dimensions}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Budget</h4>
                  <p className="text-muted-foreground">
                    Rp {auction.budget.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Shipper</h4>
                  <p className="text-muted-foreground">
                    {auction.shipperName} (⭐ {auction.shipperRating.toFixed(1)}
                    )
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Timeline</h4>
                  <p className="text-muted-foreground">
                    Created: {format(new Date(auction.createdAt), "PPP")}
                  </p>
                  <p className="text-muted-foreground">
                    {isActive
                      ? `Ends in: ${timeLeft}`
                      : `Ended: ${format(new Date(auction.endTime), "PPP")}`}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Bids</h4>
                  <p className="text-muted-foreground">
                    {auction.bids.length} bids received
                  </p>
                </div>
              </div>
            </div>
          </div>

          {!isShipper && isActive && (
            <div className="flex justify-center mt-4">
              <Button
                onClick={() => onPlaceBid && onPlaceBid(auction.id)}
                className="w-full max-w-md"
              >
                Place Bid
              </Button>
            </div>
          )}

          {auction.bids.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Bids</h3>
              <div className="space-y-4">
                {auction.bids.map((bid) => (
                  <Card
                    key={bid.id}
                    className={`${bid.status === "accepted" ? "border-primary" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {bid.transporterName}
                            <span className="text-sm text-muted-foreground">
                              (⭐ {bid.transporterRating.toFixed(1)})
                            </span>
                            {bid.status === "accepted" && (
                              <Badge>Accepted</Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm mt-1">
                            {bid.notes}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            Rp {bid.amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(new Date(bid.createdAt), "PPp")}
                          </div>
                        </div>
                      </div>

                      {isShipper && isActive && bid.status === "pending" && (
                        <div className="flex justify-end gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onChat && onChat(bid.transporterId)}
                          >
                            <MessageSquare className="h-4 w-4 mr-1" /> Chat
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => onAcceptBid && onAcceptBid(bid.id)}
                          >
                            Accept Bid
                          </Button>
                        </div>
                      )}

                      {!isShipper && bid.status === "accepted" && (
                        <div className="flex justify-end gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onChat && onChat(auction.shipperId)}
                          >
                            <MessageSquare className="h-4 w-4 mr-1" /> Chat with
                            Shipper
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bid Details Dialog */}
      <Dialog open={!!selectedBid} onOpenChange={() => setSelectedBid(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bid Details</DialogTitle>
            <DialogDescription>
              Review the details of this bid.
            </DialogDescription>
          </DialogHeader>

          {selectedBid && (
            <div className="space-y-4 mt-4">
              <div className="flex justify-between">
                <span className="font-medium">Transporter:</span>
                <span>{selectedBid.transporterName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Amount:</span>
                <span>Rp {selectedBid.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{format(new Date(selectedBid.createdAt), "PPp")}</span>
              </div>
              <Separator />
              <div>
                <span className="font-medium">Notes:</span>
                <p className="mt-1 text-muted-foreground">
                  {selectedBid.notes}
                </p>
              </div>

              {isShipper && isActive && selectedBid.status === "pending" && (
                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedBid(null)}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      onAcceptBid && onAcceptBid(selectedBid.id);
                      setSelectedBid(null);
                    }}
                  >
                    Accept Bid
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
