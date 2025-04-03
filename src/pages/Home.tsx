import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Truck,
  Package,
  Clock,
  Users,
  ChevronRight,
  Bell,
  Coins,
} from "lucide-react";
import AuctionList from "@/components/auction/AuctionList";

const Home = () => {
  const [userType, setUserType] = useState<"shipper" | "transporter" | null>(
    null,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <Truck className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-blue-800">ShipBid</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </Button>
          <Button variant="ghost" size="icon">
            <Coins className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Platform Lelang Pengiriman Barang
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Temukan transporter terbaik atau dapatkan pengiriman barang dengan
            harga terbaik melalui sistem lelang
          </p>
        </motion.div>

        {/* User Type Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pilih Jenis Pengguna</CardTitle>
            <CardDescription>
              Masuk sebagai shipper atau transporter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setUserType("shipper")}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${userType === "shipper" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Shipper</h3>
                    <p className="text-sm text-gray-500">
                      Saya ingin mengirim barang
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setUserType("transporter")}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${userType === "transporter" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Truck className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Transporter</h3>
                    <p className="text-sm text-gray-500">
                      Saya ingin menawarkan jasa pengiriman
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            {userType && (
              <div className="w-full space-y-3">
                <Button className="w-full" asChild>
                  <Link to="/dashboard">
                    Masuk
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <p className="text-center text-sm text-gray-500">
                  Belum memiliki akun?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 hover:underline"
                  >
                    Daftar
                  </Link>
                </p>
              </div>
            )}
          </CardFooter>
        </Card>

        {/* Active Auctions */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Lelang Aktif</h2>
            <Button variant="ghost" size="sm" className="text-blue-600">
              Lihat Semua
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <AuctionList />
        </div>

        {/* How It Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cara Kerja</CardTitle>
            <CardDescription>
              Proses lelang pengiriman barang di ShipBid
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <span className="font-bold text-blue-600">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Buat Lelang</h3>
                  <p className="text-sm text-gray-500">
                    Shipper membuat lelang dengan detail pengiriman dan batas
                    waktu 6 jam
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <span className="font-bold text-blue-600">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Ajukan Penawaran</h3>
                  <p className="text-sm text-gray-500">
                    Transporter mengajukan penawaran harga untuk pengiriman
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <span className="font-bold text-blue-600">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Pilih Pemenang</h3>
                  <p className="text-sm text-gray-500">
                    Shipper memilih transporter dengan penawaran terbaik
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <span className="font-bold text-blue-600">4</span>
                </div>
                <div>
                  <h3 className="font-medium">Proses Pengiriman</h3>
                  <p className="text-sm text-gray-500">
                    Transporter melakukan pengiriman dan mendapatkan rating
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Token Packages */}
        <Card>
          <CardHeader>
            <CardTitle>Paket Token</CardTitle>
            <CardDescription>
              Beli token untuk berpartisipasi dalam lelang
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="premium">Premium</TabsTrigger>
                <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="p-4 border rounded-lg mt-4">
                <div className="text-center">
                  <Badge className="mb-2">Basic</Badge>
                  <h3 className="text-2xl font-bold mb-1">100 Token</h3>
                  <p className="text-xl font-medium mb-4">Rp 100.000</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Ideal untuk pengguna baru yang ingin mencoba platform
                  </p>
                  <Button className="w-full">Beli Sekarang</Button>
                </div>
              </TabsContent>
              <TabsContent
                value="premium"
                className="p-4 border rounded-lg mt-4"
              >
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">
                    Premium
                  </Badge>
                  <h3 className="text-2xl font-bold mb-1">500 Token</h3>
                  <p className="text-xl font-medium mb-4">Rp 450.000</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Hemat 10% untuk pengguna aktif
                  </p>
                  <Button className="w-full">Beli Sekarang</Button>
                </div>
              </TabsContent>
              <TabsContent
                value="enterprise"
                className="p-4 border rounded-lg mt-4"
              >
                <div className="text-center">
                  <Badge variant="destructive" className="mb-2">
                    Enterprise
                  </Badge>
                  <h3 className="text-2xl font-bold mb-1">1000 Token</h3>
                  <p className="text-xl font-medium mb-4">Rp 800.000</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Hemat 20% untuk pengguna bisnis
                  </p>
                  <Button className="w-full">Beli Sekarang</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 p-6 mt-8">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <Truck className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-blue-800">ShipBid</h2>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Platform lelang pengiriman barang yang mempertemukan shipper dan
            transporter
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <Link to="/about" className="text-gray-600 hover:text-blue-600">
              Tentang Kami
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-blue-600">
              Syarat & Ketentuan
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-blue-600">
              Kebijakan Privasi
            </Link>
          </div>
          <p className="text-gray-400 text-xs mt-4">
            &copy; 2023 ShipBid. Hak Cipta Dilindungi.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
