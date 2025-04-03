import React, { useState, useEffect } from "react";
import {
  Clock,
  User,
  TruckIcon,
  DollarSign,
  Award,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import BidForm from "./BidForm";

interface Bid {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  amount: number;
  timestamp: Date;
  notes?: string;
}

interface AuctionMonitorProps {
  auctionId?: string;
  userType?: "shipper" | "transporter";
  isOwner?: boolean;
}

const AuctionMonitor: React.FC<AuctionMonitorProps> = ({
  auctionId = "123456",
  userType = "transporter",
  isOwner = false,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 5, minutes: 30, seconds: 0 });
  const [progress, setProgress] = useState(75);
  const [bids, setBids] = useState<Bid[]>([
    {
      id: "1",
      userId: "user1",
      userName: "PT Logistik Cepat",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=logistics",
      amount: 2500000,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      notes: "Termasuk asuransi pengiriman",
    },
    {
      id: "2",
      userId: "user2",
      userName: "Ekspedisi Andalan",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=expedition",
      amount: 2750000,
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      notes: "Pengiriman cepat 2 hari",
    },
    {
      id: "3",
      userId: "user3",
      userName: "Cargo Express",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cargo",
      amount: 3000000,
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      notes: "Termasuk layanan bongkar muat",
    },
  ]);
  const [showBidForm, setShowBidForm] = useState(false);
  const [showWinnerDialog, setShowWinnerDialog] = useState(false);
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);

  // Auction details (mock data)
  const auction = {
    id: auctionId,
    title: "Pengiriman Furniture Kantor",
    description: "Pengiriman 5 set meja kantor, 20 kursi, dan 3 lemari arsip",
    origin: "Jakarta Selatan",
    destination: "Bandung",
    weight: "750 kg",
    dimensions: "2m x 1.5m x 1m (per set)",
    startTime: new Date(Date.now() - 1000 * 60 * 60),
    endTime: new Date(
      Date.now() +
        1000 * 60 * (timeRemaining.hours * 60 + timeRemaining.minutes) +
        1000 * timeRemaining.seconds,
    ),
    startingPrice: 2000000,
    currentBestBid: 2500000,
    bidCount: 3,
    status: "active",
    shipperName: "PT Maju Bersama",
    shipperAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=company",
    shipperRating: 4.8,
    specialRequirements:
      "Membutuhkan truk dengan atap tertutup. Pengiriman harus sampai dalam 3 hari kerja.",
  };

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev;
        }

        let newHours = prev.hours;
        let newMinutes = prev.minutes;
        let newSeconds = prev.seconds - 1;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        // Update progress
        const totalSeconds = 6 * 60 * 60; // 6 hours in seconds
        const remainingSeconds = newHours * 3600 + newMinutes * 60 + newSeconds;
        const progressPercentage = (1 - remainingSeconds / totalSeconds) * 100;
        setProgress(progressPercentage);

        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number): string => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  const handleBidSubmit = (bidAmount: number, notes: string) => {
    const newBid: Bid = {
      id: `bid-${Date.now()}`,
      userId: "current-user",
      userName: "Anda",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=current",
      amount: bidAmount,
      timestamp: new Date(),
      notes: notes,
    };

    setBids([newBid, ...bids]);
    setShowBidForm(false);
  };

  const handleSelectWinner = (bid: Bid) => {
    setSelectedBid(bid);
    setShowWinnerDialog(true);
  };

  const confirmWinner = () => {
    // Logic to confirm winner would go here
    setShowWinnerDialog(false);
  };

  return (
    <div className="bg-background w-full max-w-md mx-auto p-4 space-y-4">
      {/* Auction Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{auction.title}</CardTitle>
              <CardDescription className="mt-1">
                {auction.origin} → {auction.destination}
              </CardDescription>
            </div>
            <Badge
              variant={timeRemaining.hours < 1 ? "destructive" : "secondary"}
            >
              {auction.status === "active" ? "Aktif" : "Selesai"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Countdown Timer */}
          <div className="bg-muted p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium flex items-center">
                <Clock className="h-4 w-4 mr-1" /> Sisa Waktu
              </span>
              <span className="text-lg font-bold">
                {formatTime(timeRemaining.hours)}:
                {formatTime(timeRemaining.minutes)}:
                {formatTime(timeRemaining.seconds)}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Auction Details */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Berat</p>
              <p className="font-medium">{auction.weight}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Dimensi</p>
              <p className="font-medium">{auction.dimensions}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Harga Awal</p>
              <p className="font-medium">
                {formatCurrency(auction.startingPrice)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Penawaran Terbaik</p>
              <p className="font-medium text-primary">
                {formatCurrency(auction.currentBestBid)}
              </p>
            </div>
          </div>

          {/* Shipper Info (visible to transporters) */}
          {userType === "transporter" && (
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Avatar>
                <AvatarImage
                  src={auction.shipperAvatar}
                  alt={auction.shipperName}
                />
                <AvatarFallback>
                  {auction.shipperName.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{auction.shipperName}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <svg
                      className="h-4 w-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {auction.shipperRating}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Special Requirements */}
          <div>
            <h4 className="text-sm font-medium mb-1 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" /> Persyaratan Khusus
            </h4>
            <p className="text-sm bg-muted/50 p-2 rounded">
              {auction.specialRequirements}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Bids and Details */}
      <Tabs defaultValue="bids" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="bids">Penawaran ({bids.length})</TabsTrigger>
          <TabsTrigger value="details">Detail Lengkap</TabsTrigger>
        </TabsList>

        {/* Bids Tab */}
        <TabsContent value="bids" className="space-y-4 mt-4">
          <ScrollArea className="h-[300px] rounded-md border p-4">
            <div className="space-y-4">
              {bids.map((bid) => (
                <div key={bid.id} className="bg-card rounded-lg p-3 border">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={bid.userAvatar} />
                        <AvatarFallback>
                          {bid.userName.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{bid.userName}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(bid.timestamp)}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-primary">
                      {formatCurrency(bid.amount)}
                    </p>
                  </div>
                  {bid.notes && (
                    <p className="text-sm bg-muted/50 p-2 rounded">
                      {bid.notes}
                    </p>
                  )}
                  {isOwner && auction.status === "active" && (
                    <div className="mt-2 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => handleSelectWinner(bid)}
                      >
                        <Award className="h-3 w-3 mr-1" /> Pilih Pemenang
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            {userType === "transporter" && auction.status === "active" && (
              <Button className="flex-1" onClick={() => setShowBidForm(true)}>
                <DollarSign className="h-4 w-4 mr-2" /> Buat Penawaran
              </Button>
            )}
            <Button variant="outline" className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" /> Chat
            </Button>
          </div>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">
                  Deskripsi Pengiriman
                </h3>
                <p className="text-sm">{auction.description}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Asal</p>
                  <p className="font-medium">{auction.origin}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tujuan</p>
                  <p className="font-medium">{auction.destination}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Mulai Lelang</p>
                  <p className="font-medium">{formatDate(auction.startTime)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Selesai Lelang</p>
                  <p className="font-medium">{formatDate(auction.endTime)}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">Informasi Token</h3>
                <div className="bg-muted/50 p-3 rounded-lg text-sm">
                  <p>Lelang ini mengkonsumsi:</p>
                  <ul className="list-disc list-inside mt-1">
                    <li>20 token untuk Shipper</li>
                    <li>
                      10 token untuk setiap Transporter yang berpartisipasi
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bid Form Dialog */}
      <Dialog open={showBidForm} onOpenChange={setShowBidForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buat Penawaran</DialogTitle>
            <DialogDescription>
              Masukkan jumlah penawaran Anda untuk pengiriman ini. Penawaran
              akan menggunakan 10 token dari akun Anda.
            </DialogDescription>
          </DialogHeader>
          <BidForm
            minimumBid={auction.currentBestBid}
            onSubmit={handleBidSubmit}
            onCancel={() => setShowBidForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Winner Selection Dialog */}
      <Dialog open={showWinnerDialog} onOpenChange={setShowWinnerDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Pemenang</DialogTitle>
            <DialogDescription>
              Anda akan memilih {selectedBid?.userName} sebagai pemenang lelang
              dengan penawaran{" "}
              {selectedBid ? formatCurrency(selectedBid.amount) : ""}. Tindakan
              ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowWinnerDialog(false)}
            >
              Batal
            </Button>
            <Button onClick={confirmWinner}>Konfirmasi Pemenang</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuctionMonitor;
