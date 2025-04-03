export type UserType = "shipper" | "transporter";

export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  tokenBalance: number;
  rating: number;
  reviewCount: number;
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  origin: string;
  destination: string;
  weight: number;
  dimensions: string;
  budget: number;
  createdAt: string;
  endTime: string;
  status: "active" | "completed" | "cancelled";
  shipperId: string;
  shipperName: string;
  shipperRating: number;
  winningBidId?: string;
  winningTransporterId?: string;
  bids: Bid[];
}

export interface Bid {
  id: string;
  auctionId: string;
  transporterId: string;
  transporterName: string;
  transporterRating: number;
  amount: number;
  notes: string;
  createdAt: string;
  status: "pending" | "accepted" | "rejected";
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: "auction" | "bid" | "token" | "system";
  linkTo?: string;
}

export interface TokenPackage {
  id: string;
  name: string;
  description: string;
  tokenAmount: number;
  price: number;
  popular?: boolean;
}

export interface Rating {
  id: string;
  fromUserId: string;
  toUserId: string;
  auctionId: string;
  rating: number;
  review: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  auctionId: string;
  content: string;
  createdAt: string;
  read: boolean;
}
