
export interface MenuItem {
  id: string;
  category: string;
  subCategory?: string;
  name: string;
  price: string | number;
  description: string;
  imageUrl: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedPrice: number; // Normalized price for calculation
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed';
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
