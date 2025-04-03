import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Package,
  Truck,
  Coins,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import TokenManagement from "@/components/token/TokenManagement";
import NotificationList from "@/components/notification/NotificationList";
import { Notification } from "@/types";

interface AuctionItem {
  id: string;
  title: string;
  origin: string;
  destination: string;
  timeRemaining: string;
  bidCount: number;
  status: "active" | "completed" | "pending";
  price?: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<"shipper" | "transporter">(() => {
    // Try to get the user role from localStorage if available
    const savedRole = localStorage.getItem("userRole");
    return savedRole === "transporter" ? "transporter" : "shipper";
  });
  const [tokenBalance, setTokenBalance] = useState(120);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Mock data for active auctions
  const activeAuctions: AuctionItem[] = [
    {
      id: "1",
      title: "Pengiriman Elektronik",
      origin: "Jakarta",
      destination: "Surabaya",
      timeRemaining: "2j 30m",
      bidCount: 5,
      status: "active",
    },
    {
      id: "2",
      title: "Pengiriman Furniture",
      origin: "Bandung",
      destination: "Semarang",
      timeRemaining: "4j 15m",
      bidCount: 3,
      status: "active",
    },
    {
      id: "3",
      title: "Pengiriman Dokumen",
      origin: "Surabaya",
      destination: "Malang",
      timeRemaining: "1j 45m",
      bidCount: 8,
      status: "active",
    },
  ];

  // Mock data for past auctions
  const pastAuctions: AuctionItem[] = [
    {
      id: "4",
      title: "Pengiriman Makanan",
      origin: "Jakarta",
      destination: "Bogor",
      timeRemaining: "0j 0m",
      bidCount: 12,
      status: "completed",
      price: 850000,
    },
    {
      id: "5",
      title: "Pengiriman Pakaian",
      origin: "Yogyakarta",
      destination: "Solo",
      timeRemaining: "0j 0m",
      bidCount: 6,
      status: "completed",
      price: 450000,
    },
  ];

  // Mock notifications
  useEffect(() => {
    // Simulate fetching notifications from an API
    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: "New Bid",
        message: 'Penawaran baru untuk lelang "Pengiriman Elektronik"',
        read: false,
        createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
        linkTo: "/auctions/1",
      },
      {
        id: "2",
        title: "Auction Completed",
        message: 'Lelang "Pengiriman Makanan" telah selesai',
        read: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        linkTo: "/auctions/4",
      },
      {
        id: "3",
        title: "Token Alert",
        message: "Token Anda akan segera habis",
        read: true,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        linkTo: "/tokens",
      },
    ];

    setNotifications(mockNotifications);
  }, []);

  const handleCreateAuction = () => {
    // Navigate to auction creation page
    navigate("/create-auction");
  };

  const handleBrowseAuctions = () => {
    // Navigate to browse auctions page
    navigate("/browse-auctions");
  };

  const handleBuyTokens = () => {
    // Navigate to token purchase page
    navigate("/token-purchase");
  };

  const handlePurchaseTokens = (packageId: string) => {
    // Simulate token purchase
    const packageAmount =
      {
        basic: 50,
        premium: 150,
        enterprise: 500,
      }[packageId] || 50;

    setTokenBalance((prev) => {
      const newBalance = prev + packageAmount;
      // In a real app, you would update this on the backend
      console.log(
        `Purchased ${packageAmount} tokens. New balance: ${newBalance}`,
      );
      return newBalance;
    });
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    );

    // In a real app, you would also update this on the backend
    console.log(`Marked notification ${notificationId} as read`);
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
  };

  const handleNavigateToNotification = (linkTo: string) => {
    navigate(linkTo);
  };

  const handleSwitchRole = () => {
    const newRole = userRole === "shipper" ? "transporter" : "shipper";
    setUserRole(newRole);
    // Save the user role preference to localStorage
    localStorage.setItem("userRole", newRole);
  };

  return (
    <div className="bg-background min-h-screen p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Selamat datang, {userRole === "shipper" ? "Shipper" : "Transporter"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSwitchRole}>
            {userRole === "shipper" ? (
              <Truck className="h-4 w-4 mr-1" />
            ) : (
              <Package className="h-4 w-4 mr-1" />
            )}
            Ganti ke {userRole === "shipper" ? "Transporter" : "Shipper"}
          </Button>
          <NotificationList
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onNavigate={handleNavigateToNotification}
          />
          <Avatar>
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
              alt="User"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Token Balance Card */}
      <div className="mb-6">
        <TokenManagement
          tokenBalance={tokenBalance}
          onPurchaseTokens={handlePurchaseTokens}
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Aksi Cepat</h2>
        <div className="grid grid-cols-2 gap-3">
          {userRole === "shipper" ? (
            <Button
              onClick={handleCreateAuction}
              className="flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Buat Lelang
            </Button>
          ) : (
            <Button
              onClick={handleBrowseAuctions}
              className="flex items-center justify-center gap-2"
            >
              <Package className="h-4 w-4" />
              Cari Lelang
            </Button>
          )}
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <Clock className="h-4 w-4" />
            Riwayat
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="auctions">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="auctions">Lelang</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
          <TabsTrigger value="stats">Statistik</TabsTrigger>
        </TabsList>

        {/* Auctions Tab */}
        <TabsContent value="auctions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Lelang Aktif</h2>
            <Badge variant="outline">{activeAuctions.length}</Badge>
          </div>

          <div className="space-y-3">
            {activeAuctions.map((auction) => (
              <Card key={auction.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{auction.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {auction.origin} → {auction.destination}
                      </p>
                    </div>
                    <Badge className="bg-green-500">
                      {auction.timeRemaining}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-1">
                      <Package className="h-4 w-4" /> {auction.bidCount}{" "}
                      penawaran
                    </span>
                    <Button size="sm" variant="outline">
                      Detail
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <h2 className="text-lg font-semibold">Riwayat Lelang</h2>
            <Badge variant="outline">{pastAuctions.length}</Badge>
          </div>

          <div className="space-y-3">
            {pastAuctions.map((auction) => (
              <Card key={auction.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{auction.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {auction.origin} → {auction.destination}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-muted-foreground">
                      Selesai
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-1">
                      {auction.price && (
                        <span>Rp {auction.price.toLocaleString()}</span>
                      )}
                    </span>
                    <Button size="sm" variant="outline">
                      Detail
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card key={notification.id}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        {notification.title}
                      </p>
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Lelang
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userRole === "shipper" ? "8" : "15"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  +2 bulan ini
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sukses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userRole === "shipper" ? "6" : "12"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  75% tingkat keberhasilan
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Aktivitas Terakhir</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Lelang Selesai</p>
                  <p className="text-xs text-muted-foreground">
                    Pengiriman Makanan - 2 hari yang lalu
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Coins className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">Pembelian Token</p>
                  <p className="text-xs text-muted-foreground">
                    Paket Basic - 5 hari yang lalu
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Penawaran Baru</p>
                  <p className="text-xs text-muted-foreground">
                    Pengiriman Elektronik - 1 minggu yang lalu
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
