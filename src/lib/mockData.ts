import {
  Auction,
  Bid,
  Notification,
  TokenPackage,
  User,
  UserType,
} from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    userType: "shipper",
    tokenBalance: 100,
    rating: 4.5,
    reviewCount: 12,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    userType: "transporter",
    tokenBalance: 80,
    rating: 4.8,
    reviewCount: 24,
  },
];

export const mockAuctions: Auction[] = [
  {
    id: "1",
    title: "Jakarta to Surabaya",
    description:
      "Electronics shipment requiring careful handling. Delivery needed within 3 days.",
    origin: "Jakarta",
    destination: "Surabaya",
    weight: 50,
    dimensions: "100x80x60 cm",
    budget: 2500000,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    endTime: new Date(Date.now() + 3600000 * 2).toISOString(),
    status: "active",
    shipperId: "1",
    shipperName: "John Doe",
    shipperRating: 4.5,
    bids: [
      {
        id: "b1",
        auctionId: "1",
        transporterId: "2",
        transporterName: "Jane Smith",
        transporterRating: 4.8,
        amount: 2300000,
        notes: "Can deliver in 2 days with tracking",
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        status: "pending",
      },
    ],
  },
  {
    id: "2",
    title: "Bandung to Jakarta",
    description:
      "Furniture shipment including a sofa set and dining table. Requires proper packaging.",
    origin: "Bandung",
    destination: "Jakarta",
    weight: 200,
    dimensions: "200x150x100 cm",
    budget: 3000000,
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    endTime: new Date(Date.now() + 3600000 * 4).toISOString(),
    status: "active",
    shipperId: "1",
    shipperName: "John Doe",
    shipperRating: 4.5,
    bids: [],
  },
  {
    id: "3",
    title: "Surabaya to Malang",
    description:
      "Food products requiring temperature-controlled environment. Urgent delivery.",
    origin: "Surabaya",
    destination: "Malang",
    weight: 100,
    dimensions: "120x80x70 cm",
    budget: 1800000,
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    endTime: new Date(Date.now() + 3600000 * 5).toISOString(),
    status: "active",
    shipperId: "3",
    shipperName: "CV. Sejahtera",
    shipperRating: 4.2,
    bids: [],
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "1",
    userId: "1",
    title: "New bid received",
    message:
      'Your shipment auction "Jakarta to Surabaya" has received a new bid',
    read: false,
    createdAt: new Date().toISOString(),
    type: "bid",
    linkTo: "/auction/1",
  },
  {
    id: "2",
    userId: "1",
    title: "Auction ending soon",
    message: 'Your auction "Jakarta to Surabaya" will end in 30 minutes',
    read: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    type: "auction",
    linkTo: "/auction/1",
  },
  {
    id: "3",
    userId: "2",
    title: "Bid accepted",
    message: 'Your bid for "Jakarta to Surabaya" has been accepted',
    read: false,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    type: "bid",
    linkTo: "/auction/1",
  },
];

export const mockTokenPackages: TokenPackage[] = [
  {
    id: "1",
    name: "Basic",
    description: "50 tokens for occasional use",
    tokenAmount: 50,
    price: 50000,
  },
  {
    id: "2",
    name: "Premium",
    description: "150 tokens with 10% bonus",
    tokenAmount: 150,
    price: 135000,
    popular: true,
  },
  {
    id: "3",
    name: "Enterprise",
    description: "500 tokens with 20% bonus",
    tokenAmount: 500,
    price: 400000,
  },
];
