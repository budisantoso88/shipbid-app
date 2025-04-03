import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Users,
  ArrowUpDown,
} from "lucide-react";

interface Auction {
  id: string;
  title: string;
  shipmentType: string;
  origin: string;
  destination: string;
  timeRemaining: number; // in minutes
  bidCount: number;
  currentBid: number;
  imageUrl?: string;
}

interface AuctionListProps {
  auctions?: Auction[];
  onAuctionSelect?: (auctionId: string) => void;
}

const AuctionList = ({
  auctions = mockAuctions,
  onAuctionSelect = () => {},
}: AuctionListProps) => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    shipmentType: "",
    location: "",
    priceRange: [0, 10000000],
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredAuctions = auctions.filter((auction) => {
    const matchesSearch =
      auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auction.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auction.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filters.shipmentType === "" ||
      auction.shipmentType === filters.shipmentType;
    const matchesLocation =
      filters.location === "" ||
      auction.origin.includes(filters.location) ||
      auction.destination.includes(filters.location);
    const matchesPrice =
      auction.currentBid >= filters.priceRange[0] &&
      auction.currentBid <= filters.priceRange[1];

    return matchesSearch && matchesType && matchesLocation && matchesPrice;
  });

  const formatTimeRemaining = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}j ${mins}m`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full bg-background p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Lelang Aktif</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setView("grid")}
              className={
                view === "grid" ? "bg-primary text-primary-foreground" : ""
              }
            >
              <div className="grid grid-cols-2 gap-1">
                <div className="h-2 w-2 rounded-sm bg-current"></div>
                <div className="h-2 w-2 rounded-sm bg-current"></div>
                <div className="h-2 w-2 rounded-sm bg-current"></div>
                <div className="h-2 w-2 rounded-sm bg-current"></div>
              </div>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setView("list")}
              className={
                view === "list" ? "bg-primary text-primary-foreground" : ""
              }
            >
              <div className="flex flex-col space-y-1 items-center justify-center">
                <div className="h-1 w-4 rounded-sm bg-current"></div>
                <div className="h-1 w-4 rounded-sm bg-current"></div>
                <div className="h-1 w-4 rounded-sm bg-current"></div>
              </div>
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari berdasarkan judul, asal, atau tujuan"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-primary text-primary-foreground" : ""}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/20">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipe Pengiriman</label>
              <Select
                value={filters.shipmentType}
                onValueChange={(value) =>
                  setFilters({ ...filters, shipmentType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Semua tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua tipe</SelectItem>
                  <SelectItem value="Reguler">Reguler</SelectItem>
                  <SelectItem value="Express">Express</SelectItem>
                  <SelectItem value="Kargo">Kargo</SelectItem>
                  <SelectItem value="Berat">Berat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Lokasi</label>
              <Select
                value={filters.location}
                onValueChange={(value) =>
                  setFilters({ ...filters, location: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Semua lokasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua lokasi</SelectItem>
                  <SelectItem value="Jakarta">Jakarta</SelectItem>
                  <SelectItem value="Surabaya">Surabaya</SelectItem>
                  <SelectItem value="Bandung">Bandung</SelectItem>
                  <SelectItem value="Medan">Medan</SelectItem>
                  <SelectItem value="Makassar">Makassar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Rentang Harga</label>
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(filters.priceRange[0])} -{" "}
                  {formatCurrency(filters.priceRange[1])}
                </span>
              </div>
              <Slider
                defaultValue={[0, 10000000]}
                min={0}
                max={10000000}
                step={100000}
                value={filters.priceRange}
                onValueChange={(value) =>
                  setFilters({
                    ...filters,
                    priceRange: value as [number, number],
                  })
                }
              />
            </div>
          </div>
        )}

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="ending-soon">Segera Berakhir</TabsTrigger>
            <TabsTrigger value="new">Baru</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            {view === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredAuctions.map((auction) => (
                  <AuctionCard
                    key={auction.id}
                    auction={auction}
                    onSelect={onAuctionSelect}
                    view="grid"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {filteredAuctions.map((auction) => (
                  <AuctionCard
                    key={auction.id}
                    auction={auction}
                    onSelect={onAuctionSelect}
                    view="list"
                  />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="ending-soon" className="mt-4">
            {view === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredAuctions
                  .filter((auction) => auction.timeRemaining < 60) // Less than 1 hour
                  .map((auction) => (
                    <AuctionCard
                      key={auction.id}
                      auction={auction}
                      onSelect={onAuctionSelect}
                      view="grid"
                    />
                  ))}
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {filteredAuctions
                  .filter((auction) => auction.timeRemaining < 60)
                  .map((auction) => (
                    <AuctionCard
                      key={auction.id}
                      auction={auction}
                      onSelect={onAuctionSelect}
                      view="list"
                    />
                  ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="new" className="mt-4">
            {view === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredAuctions
                  .filter((auction) => auction.timeRemaining > 300) // More than 5 hours
                  .map((auction) => (
                    <AuctionCard
                      key={auction.id}
                      auction={auction}
                      onSelect={onAuctionSelect}
                      view="grid"
                    />
                  ))}
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {filteredAuctions
                  .filter((auction) => auction.timeRemaining > 300)
                  .map((auction) => (
                    <AuctionCard
                      key={auction.id}
                      auction={auction}
                      onSelect={onAuctionSelect}
                      view="list"
                    />
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface AuctionCardProps {
  auction: Auction;
  onSelect: (auctionId: string) => void;
  view: "grid" | "list";
}

const AuctionCard = ({ auction, onSelect, view }: AuctionCardProps) => {
  const formatTimeRemaining = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}j ${mins}m`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (view === "grid") {
    return (
      <Card
        className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => onSelect(auction.id)}
      >
        <div className="relative">
          <div className="h-40 bg-muted">
            {auction.imageUrl ? (
              <img
                src={auction.imageUrl}
                alt={auction.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
                <span className="text-lg font-semibold text-blue-800">
                  {auction.shipmentType}
                </span>
              </div>
            )}
          </div>
          <Badge
            className="absolute top-2 right-2"
            variant={auction.timeRemaining < 60 ? "destructive" : "secondary"}
          >
            <Clock className="h-3 w-3 mr-1" />
            {formatTimeRemaining(auction.timeRemaining)}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">
            {auction.title}
          </h3>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span className="line-clamp-1">
                {auction.origin} → {auction.destination}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                <Users className="h-3.5 w-3.5 mr-1" />
                <span>{auction.bidCount} penawaran</span>
              </div>
              <div className="font-medium">
                {formatCurrency(auction.currentBid)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onSelect(auction.id)}
    >
      <div className="flex">
        <div className="w-24 h-24 bg-muted">
          {auction.imageUrl ? (
            <img
              src={auction.imageUrl}
              alt={auction.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
              <span className="text-sm font-semibold text-blue-800">
                {auction.shipmentType}
              </span>
            </div>
          )}
        </div>
        <CardContent className="flex-1 p-3">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-base line-clamp-1">
              {auction.title}
            </h3>
            <Badge
              variant={auction.timeRemaining < 60 ? "destructive" : "secondary"}
              className="ml-2 whitespace-nowrap"
            >
              <Clock className="h-3 w-3 mr-1" />
              {formatTimeRemaining(auction.timeRemaining)}
            </Badge>
          </div>
          <div className="flex flex-col mt-1 space-y-1">
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="line-clamp-1">
                {auction.origin} → {auction.destination}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs">
                <Users className="h-3 w-3 mr-1" />
                <span>{auction.bidCount} penawaran</span>
              </div>
              <div className="font-medium text-sm">
                {formatCurrency(auction.currentBid)}
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

// Mock data for development
const mockAuctions: Auction[] = [
  {
    id: "1",
    title: "Pengiriman Furniture Rumah Tangga",
    shipmentType: "Kargo",
    origin: "Jakarta Selatan",
    destination: "Bandung",
    timeRemaining: 45, // 45 minutes
    bidCount: 8,
    currentBid: 2500000,
    imageUrl:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500&q=80",
  },
  {
    id: "2",
    title: "Pengiriman Dokumen Penting",
    shipmentType: "Express",
    origin: "Jakarta Pusat",
    destination: "Surabaya",
    timeRemaining: 180, // 3 hours
    bidCount: 5,
    currentBid: 800000,
  },
  {
    id: "3",
    title: "Pengiriman Mesin Produksi",
    shipmentType: "Berat",
    origin: "Surabaya",
    destination: "Makassar",
    timeRemaining: 320, // 5 hours 20 minutes
    bidCount: 3,
    currentBid: 7500000,
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80",
  },
  {
    id: "4",
    title: "Pengiriman Paket Elektronik",
    shipmentType: "Reguler",
    origin: "Bandung",
    destination: "Medan",
    timeRemaining: 90, // 1 hour 30 minutes
    bidCount: 12,
    currentBid: 1200000,
    imageUrl:
      "https://images.unsplash.com/photo-1512418490979-92798cec1380?w=500&q=80",
  },
  {
    id: "5",
    title: "Pengiriman Bahan Makanan Segar",
    shipmentType: "Express",
    origin: "Jakarta Timur",
    destination: "Yogyakarta",
    timeRemaining: 30, // 30 minutes
    bidCount: 7,
    currentBid: 950000,
  },
  {
    id: "6",
    title: "Pengiriman Alat Kesehatan",
    shipmentType: "Reguler",
    origin: "Medan",
    destination: "Palembang",
    timeRemaining: 350, // 5 hours 50 minutes
    bidCount: 2,
    currentBid: 3200000,
    imageUrl:
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&q=80",
  },
];

export default AuctionList;
