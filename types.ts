
export interface MenuItem {
  id: string;
  category: string;
  subCategory?: string;
  name: string;
  price: string | number;
  description: string;
  imageUrl: string;
}

export type Size = 'Small' | 'Regular' | 'Large';
export type Crust = 'Pan' | 'Thin' | 'Stuffed';

export interface CartItem extends MenuItem {
  quantity: number;
  selectedPrice: number; // Normalized price for calculation
  selectedSize?: Size;
  selectedCrust?: Crust;
  selectedExtras?: string[];
}

export type OrderStatus = 'pending' | 'kitchen' | 'delivery' | 'doorstep' | 'completed';

export interface DeliveryDetails {
  name: string;
  phone: string;
  address: string;
  paymentMethod: 'cod' | 'card';
  coordinates?: { lat: number; lng: number };
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  deliveryDetails?: DeliveryDetails;
}

export interface VideoItem {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export enum SectionType {
  STARTERS = 'STARTERS',
  PIZZAS = 'PIZZAS',
  CHEESY_CRISPY = 'CHEESY & CRISPY',
  SIDE_ORDERS = 'SIDE ORDERS',
  DEALS = 'DEALS',
}

export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}

export interface GeminiSearchResponse {
  text: string;
  groundingChunks: GroundingChunk[];
}

// Global declaration for the AI Studio helper
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
}
